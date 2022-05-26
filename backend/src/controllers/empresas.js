const client = require("../connection");
const pool = require("../connection");
const path = require("path");
const fs = require('fs-extra');

const empctrl = {};

var datetime = new Date();
var descripcion= "";

//método listar empresas
empctrl.listar_empresas=async(req, res)=>{
    pool.query('select u.usu_codigo, u.usu_nombre, u.usu_correo, u.usu_direccion, u.usu_telefono, e.emp_descripcion, e.emp_categoria, e.emp_fecha_creacion, e.emp_convenio, e.emp_estado from usuarios as u inner join empresa as e on u.usu_codigo=e.emp_codigo;', (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

//listar una empresa en específico
empctrl.listar_empresa=async(req, res)=>{

    try {

        const { usu_codigo } = req.body;

        console.log(usu_codigo);

        const empresa = await pool.query("SELECT * FROM empresa WHERE emp_codigo=$1;", [usu_codigo]);

        if (empresa.rowCount > 0) {

            res.status(200).json({ mensaje: true, datos: empresa.rows[0] });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}

//método validar empresa
empctrl.validar_empresa=async(req, res)=>{

    try {

        const { emp_codigo } = req.body;

        descripcion="Se valido la empresa con el código: "+emp_codigo;

        const empresa = await pool.query("UPDATE empresa set emp_estado='VALIDADO' WHERE emp_codigo=$1;", [emp_codigo]);
        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);    

        if (empresa.rowCount > 0) {

            res.status(200).json({ mensaje: true});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}


//método eliminar empresa
empctrl.eliminar_empresa=async(req, res)=>{

    try {

        const { emp_codigo } = req.body;

        descripcion="Se eliminó la empresa con el código: "+emp_codigo;
        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);   
        
        const empleo_alumno = await pool.query("DELETE FROM empleo_alumno WHERE emp_codigo=$1;", [emp_codigo]);
        const empleos = await pool.query("DELETE FROM empleos WHERE emp_codigo=$1;", [emp_codigo]);
        const empresa = await pool.query("DELETE FROM empresa WHERE emp_codigo=$1;", [emp_codigo]);
        const usuarios = await pool.query("DELETE FROM usuarios WHERE usu_codigo=$1;", [emp_codigo]);


        console.log("RESULTADO: "+empleo_alumno.rowCount);
         

        if (usuarios.rowCount > 0) {

            if (empleo_alumno.rowCount >= 0 || empleos.rowCount >= 0 || empresa.rowCount >= 0) {

                res.status(200).json({ mensaje: true});
            }


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        console.log(e);

        res.status(500).json({ mensaje: false, error: e });

    }

}



module.exports = empctrl;