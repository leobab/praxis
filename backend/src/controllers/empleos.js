const client = require("../connection");
const pool = require("../connection");
const path = require("path");
const fs = require('fs-extra');

const empleoctrl = {};

//método listar todos los empleos disponibles
empleoctrl.listar_empleos = async (req, res) => {
    pool.query("SELECT * FROM empleos WHERE job_estado='DISPONIBLE';", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

//metodo listar todos los empleos
empleoctrl.listar_todos_empleos = async (req, res) => {
    pool.query("SELECT emp.*, u.usu_nombre as nombre_empresa FROM empleos emp, usuarios u WHERE emp.emp_codigo=u.usu_codigo;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

//método eliminar empleo
empleoctrl.eliminar_empleo=async(req, res)=>{

    try {

        const { job_codigo } = req.body;

        const empleo_alumno = await pool.query("DELETE FROM empleo_alumno WHERE job_codigo=$1;", [job_codigo]);
        const empleo = await pool.query("DELETE FROM empleos WHERE job_codigo=$1;", [job_codigo]);
        
        if (empleo_alumno.rowCount >= 0) {

            if (empleo.rowCount > 0) {

                res.status(200).json({ mensaje: true});
            }
            

        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}


//método listar empleos de una empresa
empleoctrl.listar_empleos_empresa=async(req, res)=>{

    try {

        const { emp_codigo } = req.body;

        const empleo = await pool.query("select * from empleos where emp_codigo=$1;", [emp_codigo]);

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true, datos: empleo.rows});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}

empleoctrl.create_job=async(req, res)=>{
    try {

        var datetime = new Date();

        const { emp_codigo, job_titulo, job_descripcion, job_area, job_ubicacion, job_fecha_ini, job_fecha_fin, job_hora_entrada, job_hora_salida, job_disponibilidad } = req.body;

        var descripcion="Se creó el empleo: "+job_titulo+" de la empresa: "+emp_codigo;
        
        const empleo = await pool.query("INSERT INTO empleos (emp_codigo, job_titulo, job_descripcion, job_area, job_ubicacion, job_fecha_creacion, job_fecha_ini, job_fecha_fin, job_estado, job_hora_entrada, job_hora_salida, job_fecha_actu, job_disponibilidad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);", [emp_codigo, job_titulo, job_descripcion, job_area, job_ubicacion, datetime.toISOString().slice(0,10) ,job_fecha_ini, job_fecha_fin,'DISPONIBLE', job_hora_entrada, job_hora_salida, null, job_disponibilidad]);
        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);    
        
        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}


empleoctrl.update_job=async(req, res)=>{
    try {

        var datetime = new Date();

        const { job_titulo, job_descripcion, job_area, job_ubicacion, job_fecha_ini, job_fecha_fin, job_hora_entrada, job_hora_salida, job_codigo, job_disponibilidad } = req.body;

        var descripcion="Se actualizó el empleo: "+job_titulo+" con código: "+job_codigo;
        
        const empleo = await pool.query("UPDATE empleos SET job_titulo=$1, job_descripcion=$2, job_area=$3, job_ubicacion=$4, job_fecha_ini=$5, job_fecha_fin=$6, job_hora_entrada=$7, job_hora_salida=$8, job_fecha_actu=$9, job_disponibilidad=$10 WHERE job_codigo=$11;", [job_titulo, job_descripcion, job_area, job_ubicacion,job_fecha_ini, job_fecha_fin, job_hora_entrada, job_hora_salida, datetime.toISOString().slice(0,10), job_disponibilidad, job_codigo]);
        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);    
        
        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}

empleoctrl.listar_empleos_xcodigo=async(req, res)=>{

    try {

        const { job_codigo } = req.body;

        const empleo = await pool.query("select empl.*, (SELECT n.niv_nombre FROM niveles n WHERE n.niv_codigo=empl.job_disponibilidad) as job_disponibilidad, emp.usu_nombre as emp_nombre, emp.usu_codigo as emp_codigo from empleos empl, usuarios emp where job_codigo=$1 and empl.emp_codigo=emp.usu_codigo;", [job_codigo]);

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true, datos: empleo.rows[0]});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}


empleoctrl.finalizar_seleccion_alumnos=async(req, res)=>{
    try {

        const { job_codigo } = req.body;

        var datetime = new Date();

        var descripcion="Se terminó la selección de alumnos para el empleo: "+job_codigo;
        
        const empleo = await pool.query("UPDATE empleos SET job_estado='NO DISPONIBLE' WHERE job_codigo=$1;", [job_codigo]);
        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);    

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}



module.exports = empleoctrl;