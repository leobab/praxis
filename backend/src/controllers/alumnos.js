const client = require("../connection");
const pool = require("../connection");
const path = require("path");
const fs = require('fs-extra');

const alumctrl = {};


var datetime = new Date();
var descripcion="";

//método completar registro de un alumno
alumctrl.completar_registro = async (req, res) => {
    try {
        if (req.session.usu_codigo != null) {
            const alum_codigo = req.session.usu_codigo;
            const alum_cv = (req.file.filename);

            const { alum_descripcion, alum_d_pasantia, alum_sem, alum_paral, alum_d_desde, alum_d_hasta, alum_disponibilidad } = req.body;

            descripcion="Se completó el registro del alumno/a: "+alum_codigo;
            
            await pool.query("UPDATE alumnos SET alum_descripcion=$1, alum_d_pasantia=$2, alum_cv=$3, alum_sem=$4, alum_paral=$5, alum_d_desde=$6, alum_d_hasta=$7, alum_disponibilidad=$8 WHERE alum_codigo=$9", [alum_descripcion, alum_d_pasantia, alum_cv, alum_sem, alum_paral, alum_d_desde, alum_d_hasta, alum_disponibilidad, alum_codigo]);
            await fs.rename(req.file.path, ('src/public/usuarios/' + alum_codigo + '/cv/' + alum_cv));
            await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]); 

            res.status(200).json({ mensaje: true })
        } else {
            res.status(500).json({ mensaje: false, error: "Usuario no logueado" });
        }
    } catch (e) {
        await fs.unlink(req.file.path);
        res.status(500).json({ mensaje: false, error: e });
    }
}

//método listar alumnos
alumctrl.listar_alumnos=async(req, res)=>{
    pool.query('select u.usu_codigo, u.usu_nombre, u.usu_correo, u.usu_direccion, u.usu_telefono, al.alum_fecha_nac, u.usu_foto, al.alum_descripcion from usuarios as u inner join alumnos as al on u.usu_codigo=al.alum_codigo;', (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

//método listar alumnos disponibles
alumctrl.listar_alumnos_disponibles=async(req, res)=>{
    pool.query('select u.usu_codigo, u.usu_nombre, u.usu_correo, u.usu_direccion, u.usu_telefono, al.alum_fecha_nac, u.usu_foto, al.alum_descripcion, al.alum_d_pasantia, al.alum_cv from usuarios as u inner join alumnos as al on u.usu_codigo=al.alum_codigo and al.alum_estado=1;', (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}


alumctrl.guardar_experiencia=async(req, res)=>{
      
    const {alum_codigo, exp_cargo, exp_empresa_nombre, exp_actividades, exp_fecha_ini, exp_fecha_fin  } = req.body
    await pool.query(`insert into alum_experiencia (alum_codigo, exp_cargo, exp_empresa_nombre, exp_actividades, exp_fecha_ini, exp_fecha_fin) values ('` + alum_codigo + `','` + exp_cargo + `','` + exp_empresa_nombre + `','` + exp_actividades + `','` + exp_fecha_ini + `','` + exp_fecha_fin + `')`);
    const perfil = (`SELECT exp_codigo FROM alum_experiencia WHERE exp_cargo='`+exp_cargo+`' AND exp_empresa_nombre='`+exp_empresa_nombre+`' AND exp_actividades='`+exp_actividades+`'`);
    pool.query(perfil, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows[0] });
                
        } else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.eliminar_experiencia=async(req, res)=>{
      
    const {exp_codigo} = req.body
    let insertQuery = (`DELETE FROM alum_experiencia WHERE exp_codigo=`+exp_codigo);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true });
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.guardar_estudios=async(req, res)=>{
      
    const {alum_codigo, est_centro_edu, est_nivel, est_fecha_ini, est_fecha_fin, est_titulo } = req.body

    console.log("alumcodigo: "+alum_codigo);
    await pool.query(`insert into alum_estudios (alum_codigo, est_centro_edu, est_nivel, est_fecha_ini, est_fecha_fin, est_titulo ) values ('` + alum_codigo + `','` + est_centro_edu + `',` + est_nivel + `,'` + est_fecha_ini + `','` + est_fecha_fin + `','` + est_titulo + `')`);
    const perfil = (`SELECT est_codigo FROM alum_estudios WHERE est_centro_edu='`+est_centro_edu+`' AND est_titulo='`+est_titulo+`' AND est_fecha_ini='`+est_fecha_ini+`' AND est_fecha_fin='`+est_fecha_fin+`'`);
    pool.query(perfil, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows[0] });
                
        } else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.eliminar_estudios=async(req, res)=>{
      
    const {est_codigo} = req.body
    let insertQuery = (`DELETE FROM alum_estudios WHERE est_codigo=`+est_codigo);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true });
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}

alumctrl.guardar_idiomas=async(req, res)=>{
      
    const {alum_codigo, idio_nombre, idio_nivel } = req.body

    console.log("alumcodigo: "+alum_codigo);
    await pool.query(`insert into alum_idiomas (alum_codigo, idio_nombre, idio_nivel ) values ('` + alum_codigo + `',` + idio_nombre + `,` + idio_nivel + `)`);
    const perfil = (`SELECT idio_codigo FROM alum_idiomas WHERE alum_codigo='`+alum_codigo+`' AND idio_nombre=`+idio_nombre+` AND idio_nivel=`+idio_nivel);
    pool.query(perfil, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows[0] });
                
        } else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.eliminar_idiomas=async(req, res)=>{
      
    const {idio_codigo} = req.body
    let insertQuery = (`DELETE FROM alum_idiomas WHERE idio_codigo=`+idio_codigo);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true });
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.guardar_skills=async(req, res)=>{
      
    const {alum_codigo, ski_nombre, ski_nivel } = req.body

    await pool.query(`insert into alum_skills (alum_codigo, ski_nombre, ski_nivel ) values ('` + alum_codigo + `',` + ski_nombre + `,` + ski_nivel + `)`);
    const perfil = (`SELECT ski_codigo FROM alum_skills WHERE alum_codigo='`+alum_codigo+`' AND ski_nombre=`+ski_nombre+` AND ski_nivel=`+ski_nivel);
    pool.query(perfil, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows[0] });
                
        } else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.eliminar_skills=async(req, res)=>{
      
    const {ski_codigo} = req.body
    let insertQuery = (`DELETE FROM alum_skills WHERE ski_codigo=`+ski_codigo);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true });
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.profile=async(req, res)=>{
      
    const {alum_codigo} = req.body
    let insertQuery = (`SELECT * FROM alumnos WHERE alum_codigo='`+alum_codigo+`'`);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows});
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}

alumctrl.experiencia=async(req, res)=>{
      
    const {alum_codigo} = req.body
    let insertQuery = (`SELECT * FROM alum_experiencia WHERE alum_codigo='`+alum_codigo+`'`);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows});
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.estudios=async(req, res)=>{
      
    const {alum_codigo} = req.body
    let insertQuery = (`SELECT * FROM alum_estudios WHERE alum_codigo='`+alum_codigo+`'`);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows});
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}

alumctrl.skills=async(req, res)=>{
      
    const {alum_codigo} = req.body
    let insertQuery = (`SELECT s.skl_nombre, n.niv_nombre FROM skills as s, niveles as n, alum_skills as a 
    WHERE alum_codigo='`+alum_codigo+`' AND a.ski_nombre=s.skl_codigo AND a.ski_nivel=n.niv_codigo`);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows});
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


alumctrl.idiomas=async(req, res)=>{
      
    const {alum_codigo} = req.body
    let insertQuery = (`SELECT i.idi_nombre, n.niv_nombre FROM idiomas as i, niveles as n, alum_idiomas as a 
    WHERE alum_codigo='`+alum_codigo+`' AND a.idio_nombre=i.idi_codigo AND a.idio_nivel=n.niv_codigo`);
    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows});
        }else{
            res.status(500).json({ mensaje: err.message });
            console.log(err.message);
        }
        
    });
}


//método eliminar alumno
alumctrl.eliminar_alumno=async(req, res)=>{

    try {

        const { alum_codigo } = req.body;

        descripcion="Se eliminó al alumno/a: "+alum_codigo+" del sistema";

        
        const alum_estudios = await pool.query("DELETE FROM alum_estudios WHERE alum_codigo=$1;", [alum_codigo]);
        const alum_experiencia = await pool.query("DELETE FROM alum_experiencia WHERE alum_codigo=$1;", [alum_codigo]);
        const alum_idiomas = await pool.query("DELETE FROM alum_idiomas WHERE alum_codigo=$1;", [alum_codigo]);
        const alum_skills = await pool.query("DELETE FROM alum_skills WHERE alum_codigo=$1;", [alum_codigo]);
        const empleo_alumno = await pool.query("DELETE FROM empleo_alumno WHERE alum_codigo=$1;", [alum_codigo]);
        const alumnos = await pool.query("DELETE FROM alumnos WHERE alum_codigo=$1;", [alum_codigo]);
        const usuarios = await pool.query("DELETE FROM usuarios WHERE usu_codigo=$1;", [alum_codigo]);

        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);    

        if ( usuarios.rowCount > 0) {

            if (alum_estudios.rowCount >= 0 && alum_experiencia.rowCount >= 0 && alum_idiomas.rowCount >= 0 && alum_skills.rowCount >= 0 && empleo_alumno.rowCount >= 0 && alumnos.rowCount >= 0 ){
                
                res.status(200).json({ mensaje: true});
            }
            

        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}

alumctrl.consultar_noti_alumno=async(req, res)=>{
    try {

        const { noti_para} = req.body;

        console.log("ID PARA NOTI: "+noti_para);

        const noti = await pool.query("select * from notificaciones where noti_para=$1", [noti_para]);

        if (noti.rowCount > 0 ) {

            res.status(200).json({ mensaje: true, datos: noti.rows });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}

module.exports = alumctrl;