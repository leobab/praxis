import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import Profile from './profile';
import config from '../metodos/config_session';
import { If, Then, Else } from 'react-if';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Postulantes extends Component {

    state = {
        alumnos: [],
        alumnos_ap: [],
        conectado: false,
        ruta_server: 'http://localhost:5000/public/usuarios/',
        job_nombre:'',
        job_estado:'',
        job_codigo:'',
        usu_codigo: '',
        usu_tipo: '',
    }



    async componentDidMount() {

        const responseSe = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (responseSe.data.mensaje) {

            const dataSe = responseSe.data.datos;

            this.setState({ usu_codigo: dataSe.usu_codigo, usu_tipo: dataSe.usu_tipo});

        }

        const job_codigo_url = window.location.pathname.split("/")[2];

        const response = await axios.get('http://localhost:5000/empalum/list_postulantes/'+job_codigo_url, config);

        if (response.data.mensaje) {

            this.setState({ conectado: true, alumnos: this.state.alumnos.concat(response.data.datos), job_codigo:job_codigo_url });

        } else {

            this.setState({ conectado: false });

        }

        console.log(this.state.job_codigo);


        const responseEmpleo = await axios.post('http://localhost:5000/empleo/listar_empleos_xcodigo',{
            job_codigo:job_codigo_url,
        }, config);

        if (responseEmpleo.data.mensaje) {
            
            const data = responseEmpleo.data.datos;


            this.setState({ job_nombre: data.job_titulo, job_estado: data.job_estado });

        }

        const responseAP = await axios.get('http://localhost:5000/empalum/list_postulantes_ap/'+job_codigo_url, config);

        if (responseAP.data.mensaje) {

            this.setState({ conectado: true, alumnos_ap: this.state.alumnos_ap.concat(responseAP.data.datos) });

        } else {

            this.setState({ conectado: false });

        }

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


    }


    openmodal(usu_nombre, usu_codigo){
        $('#modaljobs').modal('show');
        $("#modal_nombre").html(usu_nombre);
        $("#modal_codigo").html(usu_codigo);

    }

    async seleccionar_alumno(alum_codigo_p){

        const job_codigo_url = window.location.pathname.split("/")[2]; 

        const response = await axios.post('http://localhost:5000/empalum/empresa_seleccionar_alumno', {

            job_codigo: job_codigo_url,
            alum_codigo: alum_codigo_p,
            empresa_codigo: this.state.usu_codigo,

        }, config);

        if (response.data.mensaje) {

            toast.success('Alumno escogido!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            setTimeout(function(){
                window.location.href = "/postulantes/"+job_codigo_url;
            }, 2000);
            

        }else{
            toast.danger('Error en escoger alumno!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    }

    async aprobar_alumno(alum_codigo_p){

        const job_codigo_url = window.location.pathname.split("/")[2]; 

        const response = await axios.post('http://localhost:5000/empalum/seleccionar_alumno', {

            job_codigo: job_codigo_url,
            alum_codigo: alum_codigo_p,

        }, config);

        if (response.data.mensaje) {

            toast.success('Alumno aprobado!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            setTimeout(function(){
                window.location.href = "/postulantes/"+job_codigo_url;
            }, 2000);
            

        }else{
            toast.danger('Error al aprobar alumno!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    }

    async finalizar(){
        const job_codigo_url = window.location.pathname.split("/")[2]; 

        const response = await axios.post('http://localhost:5000/empleo/finalizar_seleccion_alumnos', {

            job_codigo: job_codigo_url,

        }, config);

        if (response.data.mensaje) {

            toast.success('Proceso de selección finalizado!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            setTimeout(function(){
                window.location.href = "/postulantes/"+job_codigo_url;
            }, 2000);
            

        }
    }



    render() {


        return (


            <div class="container mt-3 p-5" style={{ height: '100%' }}>
                <If condition={this.state.job_estado=="DISPONIBLE"}>
                <div className='container mt-5' style={{ height: '100%' }}>
                        <h6 style={{ textAlign: 'center' }}>Postulantes para el empleo: {this.state.job_nombre} </h6>
                        <hr></hr>
                        <div id="mensajeconfirmacion" class="mt-3"></div>
                        
                        <table id="example" class="display">
                            <thead>
                                <tr>
                                    <th className='text-center'>Foto</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th className='text-center'>Dirección</th>
                                    <th className='text-center'>Curso y paralelo</th>
                                    <th className='text-center'>Pasantía preferida</th>
                                    <th className='text-center' style={{ width: '100px' }}>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.alumnos.map(alumnos => (
                                        <tr>
                                            <td ><img src={this.state.ruta_server + alumnos.usu_codigo + "/foto/" + alumnos.usu_foto} alt className="img-fluid d-block rounded" style={{ height: "70px", width: "70px" }} /></td>
                                            <td>{alumnos.usu_nombre}</td>
                                            
                                            <td>{alumnos.usu_telefono}</td>
                                            <td className='text-center'>{alumnos.usu_direccion}</td>
                                            <td className='text-center'>{alumnos.semestre} {alumnos.paralelo}</td>
                                            <td className='text-center'>{alumnos.alum_d_pasantia}</td>
                                            <If condition={alumnos.estado_empresa==="P" && alumnos.estado==="P" && this.state.usu_tipo=="empresa"}>
                                                <td className='text-center'><button type="button" title='Aceptar postulación' class="btn btn-success btn-sm" onClick={()=> this.seleccionar_alumno(alumnos.alum_codigo)}><i class="fa fa-check" aria-hidden="true"></i></button>
                                                    <a href={"/profile/" + alumnos.usu_codigo} target="_blank"><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                                    <a href={this.state.ruta_server + alumnos.usu_codigo + "/cv/" + alumnos.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
                                            </If>
                                            <If condition={alumnos.estado_empresa==="P" && alumnos.estado==="P" && this.state.usu_tipo=="admin"}>
                                                <td className='text-center'>
                                                    <a href={"/profile/" + alumnos.usu_codigo} target="_blank"><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                                    <a href={this.state.ruta_server + alumnos.usu_codigo + "/cv/" + alumnos.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
                                            </If>
                                            <If condition={alumnos.estado_empresa==="AP" && alumnos.estado==="P" && this.state.usu_tipo=="admin"}>
                                                <td className='text-center'><button type="button" title='Aprobar postulación' class="btn btn-success btn-sm" onClick={()=> this.aprobar_alumno(alumnos.alum_codigo)}><i class="fa fa-check" aria-hidden="true"></i></button>
                                                    <a href={"/profile/" + alumnos.usu_codigo} target="_blank"><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                                    <a href={this.state.ruta_server + alumnos.usu_codigo + "/cv/" + alumnos.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
                                            </If>
                                            <If condition={alumnos.estado_empresa==="AP" && alumnos.estado==="P" && this.state.usu_tipo=="empresa"}>
                                                <td className='text-center'><button type="button"  title='Alumno ya escogido' class="btn btn-success btn-sm" disabled><i class="fa fa-check" aria-hidden="true"></i></button>
                                                    <a href={"/profile/" + alumnos.usu_codigo} target="_blank"><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                                    <a href={this.state.ruta_server + alumnos.usu_codigo + "/cv/" + alumnos.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
                                            </If>
                                            <If condition={alumnos.estado_empresa==="AP" && alumnos.estado==="AP" && this.state.usu_tipo=="admin"}>
                                                <td className='text-center'><button type="button"  title='Alumno ya aprobado' class="btn btn-success btn-sm" disabled><i class="fa fa-check" aria-hidden="true"></i></button>
                                                    <a href={"/profile/" + alumnos.usu_codigo} target="_blank"><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                                    <a href={this.state.ruta_server + alumnos.usu_codigo + "/cv/" + alumnos.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
                                            </If>
                                            <If condition={alumnos.estado_empresa==="AP" && alumnos.estado==="AP" && this.state.usu_tipo=="empresa"}>
                                                <td className='text-center'><button type="button"  title='Alumno ya escogido' class="btn btn-success btn-sm" disabled><i class="fa fa-check" aria-hidden="true"></i></button>
                                                    <a href={"/profile/" + alumnos.usu_codigo} target="_blank"><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                                    <a href={this.state.ruta_server + alumnos.usu_codigo + "/cv/" + alumnos.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
                                            </If>
                                            
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <ToastContainer position="top-right"
                                autoClose={1000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable={false}
                                pauseOnHover={false}
                                />
                        </table>
                        <If condition={this.state.usu_tipo=="admin"}>
                            <button type="button"  title='Finalizar proceso de aprobación de alumnos' class="btn btn-success btn-sm mt-5" onClick={()=> this.finalizar()}>Finalizar proceso de aprobación</button>
                        </If>
                    </div>

                </If>
            <If condition={this.state.job_estado=="NO DISPONIBLE"}>
                
                <div className='container mt-5' style={{ height: '100%' }}>
                        <h6 style={{ textAlign: 'center' }}>Proceso de selección a estudiantes finalizado.</h6>
                        <h6 style={{ textAlign: 'center' }}>Los alumnos seleccionados para el empleo {this.state.job_nombre} fueron:</h6>
                        <hr></hr>
                        <div id="mensajeconfirmacion" class="mt-3"></div>
                        
                        <table id="example" class="display">
                            <thead>
                                <tr>
                                    <th className='text-center'>Foto</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th className='text-center'>Dirección</th>
                                    <th className='text-center'>Curso y paralelo</th>
                                    <th className='text-center'>Pasantía preferida</th>
                                    <th className='text-center' style={{ width: '100px' }}>Opciones</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.alumnos_ap.map(alumnos_ap => (
                                        <tr>
                                            <td ><img src={this.state.ruta_server + alumnos_ap.usu_codigo + "/foto/" + alumnos_ap.usu_foto} alt className="img-fluid d-block rounded" style={{ height: "70px", width: "70px" }} /></td>
                                            <td>{alumnos_ap.usu_nombre}</td>
                                            <td>{alumnos_ap.usu_telefono}</td>
                                            <td className='text-center'>{alumnos_ap.usu_direccion}</td>
                                            <td className='text-center'>{alumnos_ap.semestre} {alumnos_ap.paralelo}</td>
                                            <td className='text-center'>{alumnos_ap.alum_d_pasantia}</td>
                                            <td> <a href={"/profile/" + alumnos_ap.usu_codigo} ><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                                    <a href={this.state.ruta_server + alumnos_ap.usu_codigo + "/cv/" + alumnos_ap.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
                                            
                                        </tr>
                                    ))
                                }
                            </tbody>
                            
                        </table>
                        
                    </div>

              
            </If>
                


                
            </div>





        )
    }

}
