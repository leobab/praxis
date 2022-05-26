import React, { Component } from 'react'
import axios from 'axios'
import { Else, If, Then } from 'react-if'
import config from '../metodos/config_session';
import Modalchoosejob from './modalchoosejob';
import $ from 'jquery';



export default class perfil extends Component {


    state = {

        conectado: false,
        tipo_usuario: '',
        usu_codigo: '',
        usu_nombre: '',
        usu_foto: '',
        usu_tipo: '',
        usu_telefono: '',
        usu_direccion: '',
        usu_cedula_ruc: '',
        usu_descripcion: '',
        ruta_server_alumnos: 'http://localhost:5000/public/usuarios/',
        usu_correo: '',
        usu_contrasena: '',
        experiencias: [],
        estudios: [],
        skills: [],
        idiomas: [],
        id_usuario: '',
        id_sesion: '',
        emp_categoria: '',
        emp_fecha_creacion: '',
        emp_convenio: '',
        alum_estado: '',
        alum_d_pasantia: '',
        alum_d_desde: '',
        alum_d_hasta: '',
        alum_cv: '',
        emp_convenio_sesion: '',
        emp_estado_sesion: '',
        usu_tipo_sesion: '',
        semestre:'',
        paralelo:''

    }

    async componentDidMount() {

        const responseSe = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (responseSe.data.mensaje) {

            const dataSe = responseSe.data.datos;

            this.setState({ usu_codigo: dataSe.usu_codigo, usu_tipo_sesion: dataSe.usu_tipo });

        }

        //ver si la empresa que ve el perfil tiene convenio y está activa su cuenta
        if (this.state.usu_tipo_sesion == 'empresa') {
            const responseEmpS = await axios.get('http://localhost:5000/req/ver_datos_empresa/' + this.state.usu_codigo, config);

            if (responseEmpS.data.mensaje) {
                const dataS = responseEmpS.data.datos;

                this.setState({
                    emp_convenio_sesion: dataS.emp_convenio, emp_estado_sesion: dataS.emp_estado
                });

            }

            //console.log("estado de la empresa: " + this.state.emp_estado_sesion);
        }

        const usuario = window.location.pathname.split("/")[2];

        const responseAlum = await axios.get('http://localhost:5000/req/ver_datos_alumno/' + usuario, config);

        if (responseAlum.data.mensaje) {

            const data = responseAlum.data.datos;

            this.setState({
                id_usuario: usuario, usu_tipo: data.usu_tipo, usu_nombre: data.usu_nombre, usu_foto: data.usu_foto, usu_correo: data.usu_correo, usu_telefono: data.usu_telefono, usu_direccion: data.usu_direccion,
                usu_cedula_ruc: data.usu_cedula_ruc, usu_descripcion: data.alum_descripcion, alum_estado: data.alum_estado, alum_d_pasantia: data.alum_d_pasantia, alum_d_desde: data.alum_d_desde, alum_d_hasta: data.alum_d_hasta, alum_cv: data.alum_cv,
                semestre: data.semestre, paralelo: data.paralelo
            });

            this.verExperiencia();
            this.verEstudios();
            this.verSkills();
            this.verIdiomas();

        }

    }

    verExperiencia = async () => {

        const usuario = window.location.pathname.split("/")[2];
        const responseE = await axios.post('http://localhost:5000/alum/experiencia', {
            alum_codigo: usuario
        }, config);

        if (responseE.data.mensaje) {

            this.setState({ experiencias: this.state.experiencias.concat(responseE.data.datos) });

        }

    }

    verEstudios = async () => {

        const usuario = window.location.pathname.split("/")[2];
        //console.log("usuario para ver estudios: " + usuario);
        const responseEst = await axios.post('http://localhost:5000/alum/estudios', {
            alum_codigo: usuario
        }, config);


        if (responseEst.data.mensaje) {

            this.setState({ estudios: this.state.estudios.concat(responseEst.data.datos) });

        }

        //console.log(this.state.estudios);
    }

    verSkills = async () => {
        const usuario = window.location.pathname.split("/")[2];
        const responseSkl = await axios.post('http://localhost:5000/alum/skills', {
            alum_codigo: usuario
        }, config);


        if (responseSkl.data.mensaje) {

            this.setState({ skills: this.state.skills.concat(responseSkl.data.datos) });

        }

    }

    verIdiomas = async () => {
        const usuario = window.location.pathname.split("/")[2];
        const responseSkl = await axios.post('http://localhost:5000/alum/idiomas', {
            alum_codigo: usuario
        }, config);


        if (responseSkl.data.mensaje) {

            this.setState({ idiomas: this.state.idiomas.concat(responseSkl.data.datos) });

        }

        console.log("idiomas: "+JSON.stringify(this.state.idiomas));

    }

    openmodal(usu_nombre, usu_codigo){
        $('#modaljobs').modal('show');
        $("#modal_nombre").html(usu_nombre);
        $("#modal_codigo").html(usu_codigo);

    }


    render() {

        return (
            <div className="container">
                
                    <div className="row">
                        <div className="col-lg-4 col-xl-4">
                            <div className="card-box text-center">
                                
                                <img src={this.state.ruta_server_alumnos + this.state.id_usuario + "/foto/" + this.state.usu_foto} className="rounded-circle avatar-xl img-thumbnail" alt="profile-image" style={{ width: "150px", height: "150px" }} />
                                <h4 className="mb-0">{this.state.usu_nombre}</h4>
                                <p className="text-muted">{this.state.usu_correo}</p>
                                <div className="text-left mt-3">
                                    <h6 className="font-13 text-uppercase">Sobre mi: </h6>
                                    <p className="text-muted font-13 mb-3" style={{ textAlign: 'justify' }}>
                                        {this.state.usu_descripcion}
                                    </p>
                                    <p className="text-muted mb-2 font-13"><strong>Cédula:</strong><span className="ml-2">{this.state.usu_cedula_ruc}</span></p>
                                    <p className="text-muted mb-2 font-13"><strong>Celular:</strong><span className="ml-2">{this.state.usu_telefono}</span></p>
                                    <p className="text-muted mb-1 font-13"><strong>Dirección:</strong><span className="ml-2">{this.state.usu_direccion}</span></p>
                                    <p className="text-muted mb-1 font-13"><strong>Curso y Paralelo:</strong><span className="ml-2">{this.state.semestre} {this.state.paralelo}</span></p>
                                    <p className="text-muted mb-1 font-13"><strong>Disponibilidad:</strong><If condition={this.state.alum_estado == 1}><b><span className="ml-2" style={{ color: 'green' }}>DISPONIBLE</span></b></If><If condition={this.state.alum_estado == 2}><b><span className="ml-2" style={{ color: 'red' }}>NO DISPONIBLE</span></b></If></p>
                                    <p className="text-muted mb-1 font-13"><strong>Modalidad preferida:</strong><span className="ml-2">{this.state.alum_d_pasantia}</span></p>
                                    <p className="text-muted mb-1 font-13"><strong>Horarios disponibles:</strong><span className="ml-2">{this.state.alum_d_desde + " - " + this.state.alum_d_hasta}</span></p>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-8 col-xl-8">
                            <div className="card-box">
                                <If condition={this.state.alum_estado === 1 && this.state.emp_convenio_sesion === 'si' && this.state.emp_estado_sesion === 'VALIDADO' && this.state.usu_tipo_sesion === "empresa"}>
                                    <Then>
                                        {/* <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modaljobs" id="submit" style={{ float: 'right' }} onClick={()=> this.openmodal(this.state.usu_nombre, this.state.id_usuario)}>Aceptar postulación</button> */}
                                        <Modalchoosejob />
                                        <a href={this.state.ruta_server_alumnos + this.state.id_usuario + "/cv/" + this.state.alum_cv} target="_blank"><button type="button" class="btn btn-info mr-3" style={{ float: 'right' }}>Ver CV</button></a>
                                    </Then>
                                    <Else>
                                        
                                        <a href={this.state.ruta_server_alumnos + this.state.id_usuario + "/cv/" + this.state.alum_cv} target="_blank"><button type="button" class="btn btn-info mr-3" style={{ float: 'right' }}>Ver CV</button></a>
                                        
                                    </Else>
                                </If>
                                <If condition={this.state.usu_tipo_sesion === "alumno"}>
                                    <button type="button" class="btn btn-warning" style={{ float: 'right' }}>Editar perfil</button>
                                    <a href={this.state.ruta_server_alumnos + this.state.id_usuario + "/cv/" + this.state.alum_cv} target="_blank"><button type="button" class="btn btn-info mr-3" style={{ float: 'right' }}>Ver CV</button></a>
                                </If>
                                
                                
                                <div className="tab-content">

                                    <div className="tab-pane show active" id="about-me">
                                        <h5 className="mb-6 text-uppercase">EXPERIENCIA LABORAL
                                        </h5>

                                        <ul className="list-unstyled timeline-sm">

                                            {
                                                this.state.experiencias.map(experiencias => (
                                                    <li className="timeline-sm-item ">
                                                        <span className="timeline-sm-date"><br />{experiencias.exp_fecha_ini} - <br ></br>{experiencias.exp_fecha_fin}</span>
                                                        <h5 className="mt-0 mb-1">{experiencias.exp_cargo}    </h5>
                                                        <p>{experiencias.exp_empresa_nombre}</p>
                                                        <p className="text-muted mt-2">{experiencias.exp_actividades}</p>
                                                    </li>
                                                ))
                                            }


                                        </ul>
                                        <h5 className="mb-3 mt-4 text-uppercase"><i className="mdi mdi-cards-variant mr-1" />
                                            Estudios</h5>
                                        <div className="table-responsive">
                                            <table className="table table-borderless mb-0">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Título</th>
                                                        <th>Centro educativo</th>
                                                        <th>Fecha Inicio</th>
                                                        <th>Fecha Fin</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.estudios.map(estudios => (
                                                            <tr>
                                                                <td>{estudios.est_codigo}</td>
                                                                <td>{estudios.est_titulo}</td>
                                                                <td>{estudios.est_centro_edu}</td>
                                                                <td>{estudios.est_fecha_ini}</td>
                                                                <td>{estudios.est_fecha_fin}</td>

                                                            </tr>
                                                        ))
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* end timeline content*/}

                                    {/* end settings content*/}
                                </div> {/* end tab-content */}
                            </div> {/* end card-box*/}
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="card-box">
                                        <h6 className="header-title">HABILIDADES</h6>
                                        {
                                            this.state.skills.map(skills => (
                                                <div className="pt-1">
                                                    <h6>{skills.skl_nombre} <If condition={skills.niv_nombre == 'Avanzado'}><span class="badge badge-success">{skills.niv_nombre}</span></If>
                                                        <If condition={skills.niv_nombre == 'Intermedio'}><span class="badge badge-warning">{skills.niv_nombre}</span></If>
                                                        <If condition={skills.niv_nombre == 'Básico'}><span class="badge badge-secondary">{skills.niv_nombre}</span></If></h6>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="card-box">
                                        <h6 className="header-title">IDIOMAS</h6>
                                        {
                                            this.state.idiomas.map(idiomas => (
                                                <div className="pt-1">
                                                    <h6>{idiomas.idi_nombre} <If condition={idiomas.niv_nombre == 'Avanzado'}><span class="badge badge-success">{idiomas.niv_nombre}</span></If>
                                                        <If condition={idiomas.niv_nombre == 'Nativo'}><span class="badge badge-primary">{idiomas.niv_nombre}</span></If>
                                                        <If condition={idiomas.niv_nombre == 'Básico'}><span class="badge badge-secondary">{idiomas.niv_nombre}</span></If>
                                                        <If condition={idiomas.niv_nombre == 'Intermedio'}><span class="badge badge-warning">{idiomas.niv_nombre}</span></If>
                                                        </h6>
                                                </div>
                                            ))
                                        }


                                    </div>
                                </div>
                            </div>
                        </div> {/* end col */}
                    </div>
            </div>
        )
    }
}