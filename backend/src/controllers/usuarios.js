const client = require("../connection");
const pool = require("../connection");
const shortuuid = require("short-uuid");
const path = require("path");
const fs = require('fs-extra');
const mail = require("../libs/mail");

const usuarioctrl = {};

var datetime = new Date();
var descripcion = "";

//método registrar usuario tipo alumno o empresa
usuarioctrl.registrarse = async (req, res) => {

    const usu_codigo = "usu-" + shortuuid().generate();
    const usu_foto = (req.file.filename);

    const { usu_cedula_ruc, usu_nombre, usu_direccion, usu_telefono, usu_tipo, usu_correo, usu_contrasena, alum_fecha_nac, alum_genero, emp_descripcion, emp_categoria, emp_fecha_creacion, emp_convenio } = req.body
    let insertQuery = (`insert into usuarios (usu_codigo, usu_cedula_ruc, usu_nombre, usu_direccion, usu_telefono, usu_foto, usu_tipo, usu_correo, usu_contrasena) values ('` + usu_codigo + `','` + usu_cedula_ruc + `','` + usu_nombre + `','` + usu_direccion + `','` + usu_telefono + `','` + usu_foto + `','` + usu_tipo + `','` + usu_correo + `','` + usu_contrasena + `')`);

    pool.query(insertQuery, async (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true });

            const directorio = path.resolve('src/public/usuarios/' + usu_codigo);
            const foto = path.resolve('src/public/usuarios/' + usu_codigo + '/foto');
            const cv = path.resolve('src/public/usuarios/' + usu_codigo + '/cv');

            if (!fs.existsSync(directorio)) {
                await fs.mkdir(directorio);
                await fs.mkdir(foto);
                await fs.mkdir(cv);
            }

            //guarda la foto
            await fs.rename(req.file.path, ('src/public/usuarios/' + usu_codigo + '/foto/' + usu_foto));


            //si el usuario es tipo alumno o empresa
            if (usu_tipo == "alumno") {
                descripcion = "Se registró exitosamente el alumno/a: " + usu_nombre;
                await pool.query(`insert into alumnos (alum_codigo, alum_fecha_nac, alum_genero, alum_estado) values ('` + usu_codigo + `','` + alum_fecha_nac + `','` + alum_genero + `',1)`);
                await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);", [descripcion, datetime.toISOString().slice(0, 10)]);

            } else if (usu_tipo == "empresa") {
                descripcion = "Se registró exitosamente la empresa: " + usu_nombre;
                await pool.query(`insert into empresa (emp_codigo, emp_descripcion, emp_categoria, emp_fecha_creacion, emp_convenio, emp_estado) values ('` + usu_codigo + `','` + emp_descripcion + `','` + emp_categoria + `','` + emp_fecha_creacion + `','` + emp_convenio + `','NO VALIDADO')`);
                await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);", [descripcion, datetime.toISOString().slice(0, 10)]);
            }

            client.end;



        } else {
            res.status(500).json({ mensaje: err.message });
        }
    });
    req.session.usu_codigo = usu_codigo;
}

//método ver datos del usuario mediante su sesión
usuarioctrl.ver_sesion = async (req, res) => {

    try {

        console.log("CODIGO DE LA SESION: " + req.session.usu_codigo);

        if (req.session.usu_codigo != null) {

            const usu_codigo = req.session.usu_codigo;

            const perfil = await pool.query("SELECT usu_codigo, usu_cedula_ruc, usu_nombre, usu_correo, usu_direccion, usu_telefono, usu_foto, usu_tipo FROM usuarios WHERE usu_codigo = $1", [usu_codigo]);

            res.status(200).json({ mensaje: true, datos: perfil.rows[0] });

        } else {

            res.status(200).json({ mensaje: false, error: "Usuario no logueado" });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}




//método generar código de verificación
function codigo_verificacion() {

    const codigo = Math.abs(Math.round(Math.random() * (1000 - 9999) + 1000));

    if (codigo.toString().length < 4) {

        return codigo_verificacion();
    }

    return codigo;

}

//método enviar código de verificación al correo del usuario
usuarioctrl.enviar_codverificacion = async (req, res) => {

    try {

        if (req.session.usu_codigo != null) {

            const codigo = codigo_verificacion();

            console.log("este es el codv: " + codigo);

            const usu_codigo = req.session.usu_codigo;

            const { usu_correo } = req.body;


            await mail.sendMail({

                from: 'leobab96@gmail.com',
                to: usu_correo,
                subject: 'Validación de cuenta en Bolsa de Empleo UTMACH',
                text: 'Este es tu código de verificación: ' + codigo,

            }, async (err, info) => {

                if (err) {

                    res.status(500).json({ mensaje: false, error: err });

                } else {

                    await pool.query("UPDATE usuarios SET codigo_verificacion = $1 WHERE usu_codigo = $2", [codigo, usu_codigo]);

                    res.status(200).json({ mensaje: true, datos: info.messageId });

                }

            });

        } else {

            res.status(200).json({ mensaje: false, error: "Usuario no logueado" });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}

//método validar cuenta del usuario
usuarioctrl.validar_cuenta = async (req, res) => {

    try {

        if (req.session.usu_codigo != null) {

            const { codigo_verificacion } = req.body;

            const usu_codigo = req.session.usu_codigo;

            const perfil = await pool.query("SELECT codigo_verificacion FROM usuarios WHERE usu_codigo = $1", [usu_codigo]);

            if (perfil.rows[0].codigo_verificacion == codigo_verificacion) {

                await pool.query("UPDATE usuarios SET codigo_verificacion = $1 WHERE usu_codigo = $2", ['', usu_codigo]);

                res.status(200).json({ mensaje: true });

            } else {

                res.status(500).json({ mensaje: false, error: "Código incorrecto" });

            }

        } else {

            res.status(200).json({ mensaje: false, error: "Usuario no logueado" });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }


}

//método iniciar sesión del usuario
usuarioctrl.ingresar = async (req, res) => {

    try {

        const { usu_correo, usu_contrasena } = req.body;
        descripcion = "Se inició sesión con el correo: " + usu_correo;

        const usu_codigo = await pool.query('SELECT usu_codigo FROM usuarios where usu_correo =$1 and usu_contrasena = $2', [usu_correo, usu_contrasena]);
        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);", [descripcion, datetime.toISOString().slice(0, 10)]);

        if (usu_codigo.rowCount > 0) {

            req.session.usu_codigo = usu_codigo.rows[0].usu_codigo;

            res.status(200).json({ mensaje: true });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }


}

//método cerrar sesión del usuario
usuarioctrl.salir = (req, res) => {

    try {

        if (req.session.usu_codigo != null) {

            req.session.destroy();

            res.status(200).json({ mensaje: true });

        } else {

            res.status(200).json({ mensaje: false, error: "Usuario no logueado" });

        }

    } catch (e) {

        res.status(200).json({ mensaje: false, error: e });

    }

}

usuarioctrl.ver_usuario = async (req, res) => {

    try {

        const { usu_codigo } = req.body;

        const usuario = await pool.query("SELECT * FROM usuarios WHERE usu_codigo=$1;", [usu_codigo]);

        if (usuario.rowCount > 0) {

            res.status(200).json({ mensaje: true, datos: usuario.rows[0] });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }

}

usuarioctrl.listar_admin = async (req, res) => {
    pool.query(`select usu_codigo, usu_correo, usu_nombre, usu_cedula_ruc ,usu_telefono from usuarios where usu_tipo= 'admin'`, (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }

        pool.end;
    });
}

usuarioctrl.cambiarcontrasena = async (req, res) => {
    pool.query(`select usu_codigo, usu_correo, usu_nombre, usu_cedula_ruc ,usu_telefono from usuarios where usu_tipo= 'admin'`, (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }

        pool.end;
    });
}

usuarioctrl.eliminar_admin = async (req, res) => {
    try {
        const { usu_codigo, usu_nombre } = req.body;
        descripcion = "Se eliminó el administrador: " + usu_nombre;
        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);", [descripcion, datetime.toISOString().slice(0, 10)]);
        const usuarios = await pool.query("DELETE FROM usuarios WHERE usu_codigo=$1;", [usu_codigo]);
        if (usuarios.rowCount > 0) {
            res.status(200).json({ mensaje: true });
        } else {
            res.status(200).json({ mensaje: false });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ mensaje: false, error: e });
    }
}


module.exports = usuarioctrl;