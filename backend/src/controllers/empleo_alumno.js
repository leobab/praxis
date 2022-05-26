
const pool = require("../connection");

const empleoalumctrl = {};

var datetime = new Date();
var descripcion="";

empleoalumctrl.guardar=async(req, res)=>{

    try {

        const { emp_codigo, job_codigo, alum_codigo} = req.body;

        descripcion="El alumno/a: "+alum_codigo+" postuló para el empleo: "+job_codigo;

        const empleo = await pool.query("INSERT INTO empleo_alumno (emp_codigo, job_codigo, alum_codigo, estado, estado_empresa) VALUES($1, $2, $3, $4, $5)", [emp_codigo, job_codigo, alum_codigo, 'P', 'P']);
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

empleoalumctrl.list_postulantes=async(req, res)=>{
    try {

        const job_codigo = req.params["job_codigo"];

        const empleo = await pool.query(`SELECT al.*, 
                                            u.*, 
                                            empl.estado,
                                            empl.estado_empresa,
                                            (SELECT p.paral_nombre FROM paralelos p 
                                                WHERE al.alum_paral=p.paral_codigo) as paralelo,  
                                            (SELECT s.sem_nombre as semestre FROM semestres s
                                                WHERE al.alum_sem=s.sem_codigo) as semestre
                                        FROM alumnos al, usuarios u, empleo_alumno empl 
                                        WHERE u.usu_codigo=empl.alum_codigo 
                                        AND empl.job_codigo=$1
                                        and al.alum_codigo=u.usu_codigo`, [job_codigo]);

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true, datos: empleo.rows });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}

empleoalumctrl.list_postulantes_ap=async(req, res)=>{
    try {

        const job_codigo = req.params["job_codigo"];

        const empleo = await pool.query(`select 
                                            al.*, 
                                            u.*, 
                                            empl.estado,
                                            (SELECT p.paral_nombre FROM paralelos p 
                                                WHERE al.alum_paral=p.paral_codigo) as paralelo,  
                                            (SELECT s.sem_nombre as semestre FROM semestres s
                                                WHERE al.alum_sem=s.sem_codigo) as semestre
                                        from alumnos al, usuarios u, empleo_alumno empl 
                                        where u.usu_codigo=empl.alum_codigo 
                                        and empl.job_codigo=$1 
                                        and empl.estado='AP'
                                        and al.alum_codigo=u.usu_codigo`, [job_codigo]);

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true, datos: empleo.rows });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}


empleoalumctrl.seleccionar_alumno=async(req, res)=>{
    try {

        const { job_codigo, alum_codigo } = req.body;

        descripcion="Se aprobó la selección del alumno: "+alum_codigo+" para el empleo: "+job_codigo;
        
        const empleo = await pool.query("UPDATE empleo_alumno SET estado='AP' WHERE job_codigo=$1 and alum_codigo=$2;", [job_codigo, alum_codigo]);

        const alumno = await pool.query("UPDATE alumnos SET alum_estado=2 WHERE alum_codigo=$1;", [alum_codigo]);

        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);    

        if (empleo.rowCount > 0 && alumno.rowCount> 0 ) {

            res.status(200).json({ mensaje: true});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}

empleoalumctrl.empresa_seleccionar_alumno=async(req, res)=>{
    try {

        const { job_codigo, alum_codigo, empresa_codigo} = req.body;

        

        descripcion="La empresa: "+empresa_codigo+" seleccionó al alumno: "+alum_codigo+" para el empleo: "+job_codigo;
        
        const empleo = await pool.query("UPDATE empleo_alumno SET estado_empresa='AP' WHERE job_codigo=$1 and alum_codigo=$2;", [job_codigo, alum_codigo]);

        await pool.query("insert into logs (log_descripcion, log_fecha) values ($1, $2);" , [descripcion, datetime.toISOString().slice(0,10)]);    

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true});


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });
        console.log(e);
    }
}

empleoalumctrl.ver_estado_empleo_alumno=async(req, res)=>{
    try {

        const { job_codigo, alum_codigo } = req.body;

        const empleo = await pool.query("select estado from empleo_alumno where job_codigo=$1 and alum_codigo=$2", [job_codigo, alum_codigo]);

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true, datos: empleo.rows[0] });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}

empleoalumctrl.listar_empleos_alumno=async(req, res)=>{
    try {

        const { alum_codigo } = req.body;

        const empleo = await pool.query(`SELECT emp.*
                                        FROM alumnos al, empleo_alumno empl, empleos emp
                                        WHERE empl.job_codigo=emp.job_codigo 
                                        AND empl.alum_codigo=$1
                                        and al.alum_codigo=empl.alum_codigo
                                        and emp.job_estado='DISPONIBLE'`, [alum_codigo]);

        if (empleo.rowCount > 0 ) {

            res.status(200).json({ mensaje: true, datos: empleo.rows });


        } else {

            res.status(200).json({ mensaje: false });

        }

    } catch (e) {

        res.status(500).json({ mensaje: false, error: e });

    }
}


module.exports = empleoalumctrl;
