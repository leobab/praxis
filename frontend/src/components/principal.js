import React, { Component } from 'react'
import { If } from 'react-if';
import axios from 'axios'
import { Link } from 'react-router-dom'
import $ from 'jquery';

import config from '../metodos/config_session';

import DataTable from 'react-data-table-component';

export default class Principal extends Component {

    state = {
        usu_tipo: '',
        usu_codigo: '',
        usu_nombre: '',
        usu_foto: '',
        conectado: false,
        ruta_server: 'http://localhost:5000/public/usuarios/',
        alum_datos: [],
        emp_estado: '',
        emp_convenio: '',
        empleos: []

    }

    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/usuario/ver_sesion', config);

        if (response.data.mensaje) {

            const data = response.data.datos;

            this.setState({ conectado: true, usu_codigo: data.usu_codigo, usu_nombre: data.usu_nombre, usu_foto: data.usu_foto, usu_tipo: data.usu_tipo });

        } else {

            this.setState({ conectado: false });

        }

        console.log("usu_tipo: " + this.state.usu_tipo);

        const responseA = await axios.get('http://localhost:5000/alum/listar_alumnos', config);

        if (responseA.data.mensaje) {

            this.setState({ alum_datos: this.state.alum_datos.concat(responseA.data.datos) });

        }

        //estado de la empresa
        if (this.state.usu_tipo == "empresa") {

            const responseEmp = await axios.post('http://localhost:5000/emp/listar_empresa', {
                usu_codigo: this.state.usu_codigo,
            }, config);

            if (responseEmp.data.mensaje) {

                const dataEmp = responseEmp.data.datos;

                this.setState({ emp_estado: dataEmp.emp_estado, emp_convenio: dataEmp.emp_convenio });

            }
            console.log("estado:" + this.state.emp_estado);

        }

        const responseEmpleo = await axios.get('http://localhost:5000/empleo/listar_empleos', config);

        if (responseEmpleo.data.mensaje) {


            this.setState({ empleos: this.state.empleos.concat(responseEmpleo.data.datos) });

        }

        console.log(this.state.empleos);



    }

    render() {

        $(document).ready(function () {
            setTimeout(function () {
                $('#example').DataTable({
                    "bDestroy": "true",
                    "language": {
                        "decimal": ",",
                        "thousands": ".",
                        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "infoPostFix": "",
                        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "loadingRecords": "Cargando...",
                        "lengthMenu": "Mostrar _MENU_ registros",
                        "paginate": {
                            "first": "Primero",
                            "last": "Último",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        },
                        "processing": "Procesando...",
                        "search": "Buscar:",
                        "searchPlaceholder": "Término de búsqueda",
                        "zeroRecords": "No se encontraron resultados",
                        "emptyTable": "Ningún dato disponible en esta tabla",
                        "aria": {
                            "sortAscending":  ": Activar para ordenar la columna de manera ascendente",
                            "sortDescending": ": Activar para ordenar la columna de manera descendente"
                        },
                }});
            },500);
        });


        return (

            // <div class="m-0 vh-50 row justify-content-center align-items-center">
            //     <div class="col-auto p-5 text center">
            <div class="container mt-3 p-5" style={{ height: '100%' }}>
                <If condition={this.state.conectado && this.state.usu_tipo == "empresa" && this.state.emp_estado == "VALIDADO" && this.state.emp_convenio == 'si'}>
                    {/* <div className="col-lg-12">
                        <div className="candidates-listing-item">
                            {
                                this.state.alum_datos.map(alum_datos => (
                                    <div className="list-grid-item mt-4 p-2">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="candidates-img float-left mr-4">
                                                    <div className="fototamano">
                                                        <img src={this.state.ruta_server + alum_datos.usu_codigo + "/foto/" + alum_datos.usu_foto} alt className="img-fluid d-block rounded" />
                                                    </div>
                                                </div>
                                                <div className="candidates-list-desc job-single-meta  pt-2">
                                                    <h5 className="mb-2 f-19"><a href="#" className="text-dark">{alum_datos.usu_nombre}</a></h5>
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item mr-4">
                                                            <p className="text-muted f-15 mb-0"><i className="mdi mdi-account mr-1" />{alum_datos.usu_correo}</p>
                                                        </li>
                                                        <li className="list-inline-item mr-4">
                                                            <p className="f-15 mb-0"><a href className="text-muted"><i className="mdi mdi-map-marker mr-1" />{alum_datos.usu_telefono}</a></p>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <p className="text-muted f-15 mb-0"><i className="mdi mdi-currency-usd mr-1" />{alum_datos.usu_direccion}</p>
                                                        </li>
                                                        <div className="row">
                                                            <div className="col-lg-11 offset-lg-1">
                                                                <div className="candidates-item-desc">
                                                                    <hr />
                                                                    <p className="text-muted mb-2 f-14">{alum_datos.alum_descripcion}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ul>

                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="candidates-list-fav-btn text-right">
                                                    <div className="fav-icon">
                                                        <i className="mdi mdi-heart f-20" />
                                                    </div>
                                                    <div className="candidates-listing-btn mt-4">
                                                        <div class="btn-toolbar">
                                                            <ul><Link to={"/profile/" + alum_datos.usu_codigo}>
                                                                <button type="button" class="btn btn-primary">Ver perfil del alumno</button>
                                                            </Link></ul>

                                                            <ul><button type="button" class="btn btn-success">Seleccionar</button></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div> */}
                    <div className="container mt-5" style={{ height: '500px' }}>
                        <h6 style={{ textAlign: 'center' }}>Opciones de Empresa</h6>
                        <hr></hr>
                        <div class="row mt-5" >
                            {/* <div class="col-sm-4" >
                                <div class="card">
                                    <a href="/listaalumnos"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Listar alumnos</h5>
                                        <p class="card-text">Lista de alumnos disponibles para realizar pasantías.</p>
                                    </div>
                                </div>
                            </div> */}
                            <div class="col-sm-6" >
                                <div class="card">
                                    <a href="/createjob"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Crear empleo</h5>
                                        <p class="card-text">Cree un empleo para que los alumnos puedan postular.</p>
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6" >
                                <div class="card">
                                    <a href="/myjobs"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Mis empleos</h5>
                                        <p class="card-text">Gestione las postulaciones de sus empleos creados.</p>
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </If>
                <If condition={this.state.conectado && this.state.usu_tipo == "empresa" && this.state.emp_estado == "NO VALIDADO" && this.state.emp_convenio == 'si'}>
                    <div className="container mt-5" style={{ height: '500px' }}>
                        <h6 style={{ textAlign: 'center' }}>Su cuenta está en proceso de validación por el administrador. Por el momento, usted puede realizar únicamente las siguientes actividades.</h6>
                        <hr></hr>
                        <div class="row mt-5" >
                            <div class="col-sm-4" >
                                <div class="card">
                                    <a href="/registerstudent"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Listar alumnos</h5>
                                        <p class="card-text">Lista de alumnos disponibles para realizar pasantías.</p>
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </If>
                <If condition={this.state.conectado && this.state.usu_tipo == "empresa" && this.state.emp_estado == "NO VALIDADO" && this.state.emp_convenio == 'no'}>
                    <div className="col-lg-12 mt-3">
                        <h6>Al momento no cuenta con un convenio establecido con la UTMACH.</h6>
                        <h6>Por favor, rellene los siguientes documentos:</h6>
                        <h6>Y envielos al administrador de la página: admin@utmachala.edu.ec</h6>
                        <hr></hr>
                    </div>
                </If>
                <If condition={this.state.conectado && this.state.usu_tipo == "alumno"}>
                    <div className='container mt-5' style={{ height: '500px' }}>
                        <h6 style={{ textAlign: 'center' }}>Ofertas de prácticas disponibles</h6>
                        <hr></hr>
                        <table id="example" class="display">
                            <thead>
                                <tr>
                                    <th>Empleo</th>
                                    
                                    <th>Área</th>
                                    <th className='text-center'>Ubicación</th>
                                    <th className='text-center'>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.empleos.map(empleos => (
                                        <tr>
                                            <td>{empleos.job_titulo}</td>
                                            
                                            <td>{empleos.job_area}</td>
                                            <td className='text-center'>{empleos.job_ubicacion}</td>
                                            <td className='text-center'><a class="btn btn-primary btn-sm" href={"/job/" + empleos.job_codigo} role="button" title='Ver empleo' style={{ alignSelf: 'center' }}><i class="fa fa-eye" aria-hidden="true"></i></a></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </If>
                <If condition={this.state.conectado && this.state.usu_tipo == "admin"}>
                    <div className="container mt-5" style={{ height: '500px' }}>
                        <h6 style={{ textAlign: 'center' }}>Opciones de Administrador</h6>
                        <hr></hr>
                        <div class="row mt-5 text-center" >
                            <div class="col-sm-3" >
                                <div class="card">
                                    <a href="/validateemp"> <img class="card-img-top" src="https://www.aval.ec/wp-content/uploads/2018/12/aval.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Validar empresas</h5>
                                        {/* <p class="card-text">Validar el estado de las empresas registradas.</p> */}
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3" >
                                <div class="card">
                                    <a href="/validatestudent"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Validar alumnos</h5>
                                        {/* <p class="card-text">Validar el estado de los estudiantes registrados.</p> */}
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3" >
                                <div class="card">
                                    <a href="/validateempleos"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Validar empleos</h5>
                                        {/* <p class="card-text">Validar el estado de los empleos registrados.</p> */}
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3" >
                                <div class="card">
                                    <a href="/logs"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Historial de la página</h5>
                                        {/* <p class="card-text">Ver el historial de las actividades desarrolladas en la página.</p> */}
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3" >
                                <div class="card">
                                    <a href="/validate_post"> <img class="card-img-top" src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Validar postulaciones</h5>
                                        {/* <p class="card-text">Ver el historial de las actividades desarrolladas en la página.</p> */}
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3" >
                                <div class="card">
                                    <a href="/admin_validate"> <img class="card-img-top" src="https://www.aval.ec/wp-content/uploads/2018/12/aval.jpg" alt="" /></a>
                                    <div class="card-body">
                                        <h5 class="card-title">Crear administrador</h5>
                                        {/* <p class="card-text">Validar el estado de las empresas registradas.</p> */}
                                        {/* <a class="btn btn-primary" href="/registerstudent" role="button">Registrarse</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </If>

            </div>
            //     </div>

            // </div>


        )

    }
}

