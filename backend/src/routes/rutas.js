const alumnos= require("../controllers/alumnos");
const usuarios= require("../controllers/usuarios");
const requerimientos= require("../controllers/requerimientos");
const empresas= require("../controllers/empresas");
const empleos= require("../controllers/empleos");
const empleo_alumno= require("../controllers/empleo_alumno");
const logs = require("../controllers/logs");

const multer = require("../libs/multer");



module.exports = (app) =>{

    //usuarios
    app.post("/usuario/registrarse", multer.single('images'), usuarios.registrarse);
    app.get("/usuario/ver_sesion", usuarios.ver_sesion);
    app.post("/usuario/ver_usuario", usuarios.ver_usuario);
    app.post("/usuario/ingresar", usuarios.ingresar);
    app.post("/usuario/enviar_codverificacion", usuarios.enviar_codverificacion);
    app.post("/usuario/validar_cuenta", usuarios.validar_cuenta);
    app.get("/usuario/salir", usuarios.salir);

    //alumnos
    app.post("/alum/experiencia", alumnos.experiencia);
    app.post("/alum/estudios", alumnos.estudios);
    app.post("/alum/skills", alumnos.skills);
    app.post("/alum/idiomas", alumnos.idiomas);
    app.post("/alum/completar_registro", multer.single('files'), alumnos.completar_registro);
    app.get("/alum/listar_alumnos", alumnos.listar_alumnos);
    app.get("/alum/listar_alumnos_disponibles", alumnos.listar_alumnos_disponibles);
    app.post("/alum/eliminar_alumno", alumnos.eliminar_alumno);
    app.post("/alum/guardar_experiencia", alumnos.guardar_experiencia);
    app.post("/alum/eliminar_experiencia", alumnos.eliminar_experiencia);
    app.post("/alum/guardar_estudios", alumnos.guardar_estudios);
    app.post("/alum/eliminar_estudios", alumnos.eliminar_estudios);
    app.post("/alum/guardar_idiomas", alumnos.guardar_idiomas);
    app.post("/alum/eliminar_idiomas", alumnos.eliminar_idiomas);
    app.post("/alum/guardar_skills", alumnos.guardar_skills);
    app.post("/alum/eliminar_skills", alumnos.eliminar_skills);
    app.post("/alum/consultar_noti_alumno", alumnos.consultar_noti_alumno);

    //empresas
    app.post("/emp/listar_empresa", empresas.listar_empresa);
    app.get("/emp/listar_empresas", empresas.listar_empresas);
    app.post("/emp/validar_empresa", empresas.validar_empresa);
    app.post("/emp/eliminar_empresa", empresas.eliminar_empresa);

    //empleos
    app.get("/empleo/listar_empleos", empleos.listar_empleos);
    app.get("/empleo/listar_todos_empleos", empleos.listar_todos_empleos);
    app.post("/empleo/eliminar_empleo", empleos.eliminar_empleo);
    app.post("/empleo/listar_empleos_empresa", empleos.listar_empleos_empresa);
    app.post("/empleo/listar_empleos_xcodigo", empleos.listar_empleos_xcodigo);
    app.post("/empleo/create_job", empleos.create_job);
    app.post("/empleo/update_job", empleos.update_job);
    app.post("/empleo/finalizar_seleccion_alumnos", empleos.finalizar_seleccion_alumnos);

    //empleo_alumno
    app.post("/empalum/guardar", empleo_alumno.guardar);
    app.get("/empalum/list_postulantes/:job_codigo", empleo_alumno.list_postulantes)
    app.get("/empalum/list_postulantes_ap/:job_codigo", empleo_alumno.list_postulantes_ap)
    app.post("/empalum/seleccionar_alumno", empleo_alumno.seleccionar_alumno);
    app.post("/empalum/empresa_seleccionar_alumno", empleo_alumno.empresa_seleccionar_alumno);
    app.post("/empalum/ver_estado_empleo_alumno", empleo_alumno.ver_estado_empleo_alumno);
    app.post("/empalum/listar_empleos_alumno", empleo_alumno.listar_empleos_alumno);

    //requerimientos
    app.get("/req/listar_niveles_estudios", requerimientos.listar_niveles_estudios);
    app.get("/req/listar_niveles_idiomas", requerimientos.listar_niveles_idiomas);
    app.get("/req/listar_niveles_skills", requerimientos.listar_niveles_skills);
    app.get("/req/listar_idiomas", requerimientos.listar_idiomas);
    app.get("/req/listar_skills", requerimientos.listar_skills);
    app.get("/req/listar_genero", requerimientos.listar_genero);
    app.get("/req/listar_semestres", requerimientos.listar_semestres);
    app.get("/req/listar_paralelos", requerimientos.listar_paralelos);
    app.post("/req/visualizar_idioma", requerimientos.visualizar_idioma);
    app.post("/req/visualizar_skill", requerimientos.visualizar_skill);
    app.get("/req/ver_datos_alumno/:id", requerimientos.ver_datos_alumno);
    app.get("/req/ver_datos_empresa/:id", requerimientos.ver_datos_empresa);
    app.get("/req/listar_horarios", requerimientos.listar_horarios);

    //logs
    app.get("/logs/lista", logs.logs );
    
}