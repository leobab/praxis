const client = require("../connection");
const pool = require("../connection");
const path = require("path");
const fs = require('fs-extra');

const reqctrl = {};

reqctrl.listar_niveles_estudios = async (req, res) => {
    pool.query("SELECT niv_codigo, niv_nombre FROM niveles WHERE niv_tabla LIKE '%EST%' ORDER BY niv_codigo ASC;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

reqctrl.listar_niveles_idiomas = async (req, res) => {
    pool.query("SELECT niv_codigo, niv_nombre FROM niveles WHERE niv_tabla LIKE '%IDI%' ORDER BY niv_codigo ASC;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

reqctrl.listar_idiomas = async (req, res) => {
    pool.query("SELECT idi_codigo, idi_nombre FROM idiomas ORDER BY idi_codigo ASC;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

reqctrl.visualizar_idioma = async (req, res) => {
    try {

        const { idi_codigo, niv_codigo } = req.body;

        const usu_codigo = await pool.query("SELECT idi_nombre, niv_nombre FROM idiomas, niveles WHERE idi_codigo=$1 AND niv_codigo=$2;", [idi_codigo, niv_codigo]);

        if (usu_codigo.rowCount > 0) {

            res.status(200).json({ mensaje: true, datos: usu_codigo.rows[0] });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}

reqctrl.listar_niveles_skills = async (req, res) => {
    pool.query("SELECT niv_codigo, niv_nombre FROM niveles WHERE niv_tabla LIKE '%SKILL%' ORDER BY niv_codigo ASC;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

reqctrl.listar_skills = async (req, res) => {
    pool.query("SELECT skl_codigo, skl_nombre FROM skills;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}


reqctrl.visualizar_skill = async (req, res) => {
    try {

        const { skl_codigo, niv_codigo } = req.body;

        const usu_codigo = await pool.query("SELECT skl_nombre, niv_nombre FROM skills, niveles WHERE skl_codigo=$1 AND niv_codigo=$2;", [skl_codigo, niv_codigo]);

        if (usu_codigo.rowCount > 0) {

            res.status(200).json({ mensaje: true, datos: usu_codigo.rows[0] });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}

reqctrl.listar_genero = async (req, res) => {
    pool.query("SELECT * FROM genero;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}


reqctrl.ver_datos_alumno = async (req, res) => {


    const user_id = req.params["id"];

    const perfil = await pool.query(`SELECT 
                                        u.*, 
                                        a.*, 
                                        (SELECT p.paral_nombre FROM paralelos p 
                                            WHERE a.alum_paral=p.paral_codigo) as paralelo,  
                                        (SELECT s.sem_nombre as semestre FROM semestres s
                                            WHERE a.alum_sem=s.sem_codigo) as semestre
                                    FROM usuarios as u, alumnos as a WHERE u.usu_codigo=a.alum_codigo AND a.alum_codigo=$1`, [user_id]);

    if (perfil.rowCount > 0) {
        res.status(200).json({ mensaje: true, datos: perfil.rows[0], id_sesion: req.session.usu_codigo });

    } else {
        res.status(500).json({ mensaje: false});
    }




}


reqctrl.ver_datos_empresa = async (req, res) => {
    try {

        
            const user_id = req.params["id"];

            //console.log("codigo del usuario que recibe: " + user_id);

            const perfil = await pool.query("select u.*, e.* from usuarios as u, empresa as e where u.usu_codigo=e.emp_codigo and e.emp_codigo=$1", [user_id]);

            res.status(200).json({ mensaje: true, datos: perfil.rows[0] });


    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}


reqctrl.listar_semestres = async (req, res) => {
    pool.query("SELECT * FROM semestres ORDER BY sem_codigo ASC;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}

reqctrl.listar_paralelos = async (req, res) => {
    pool.query("SELECT * FROM paralelos ORDER BY paral_codigo ASC;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}


reqctrl.listar_horarios = async (req, res) => {
    pool.query("SELECT niv_codigo, niv_nombre FROM niveles WHERE niv_tabla LIKE '%JOB%' ORDER BY niv_codigo ASC;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
}


module.exports = reqctrl;