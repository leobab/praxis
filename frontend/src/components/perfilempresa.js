import React, { Component } from 'react'
import axios from 'axios'
import { Else, If, Then } from 'react-if'
import config from '../metodos/config_session';
import Modalchoosejob from './modalchoosejob';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import Modaljobedit from './modaljobedit';





export default class perfil extends Component {



    state = {

        conectado: false,
        emp_descripcion: '',
        tipo_usuario: '',
        usu_codigo: '',
        usu_nombre: '',
        usu_foto: '',
        usu_tipo: '',
        usu_telefono: '',
        usu_direccion: '',
        usu_cedula_ruc: '',
        usu_descripcion: '',
        ruta_server_empresas: 'http://localhost:5000/public/usuarios/',
        usu_correo: '',
        usu_contrasena: '',
        id_usuario: '',
        id_sesion: '',
        emp_fecha_creacion: '',
        emp_categoria: '',
        emp_convenio: '',
        emp_estado: '',
        emp_codigo: '',
        emp_web: '',

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

        const responseEmpleo = await axios.post('http://localhost:5000/empleo/listar_empleos_empresa', {
            emp_codigo: this.state.emp_codigo,
        }, config);

        if (responseEmpleo.data.mensaje) {


            this.setState({ empleos: this.state.empleos.concat(responseEmpleo.data.datos) });

        }

        const usuario = window.location.pathname.split("/")[2];

        const responseEmpS = await axios.get('http://localhost:5000/req/ver_datos_empresa/' + usuario, config);

        if (responseEmpS.data.mensaje) {

            const data = responseEmpS.data.datos;

            this.setState({
                id_usuario: usuario, usu_tipo: data.usu_tipo, usu_nombre: data.usu_nombre, usu_foto: data.usu_foto,
                usu_correo: data.usu_correo, usu_telefono: data.usu_telefono, usu_direccion: data.usu_direccion,
                usu_cedula_ruc: data.usu_cedula_ruc, usu_descripcion: data.emp_descripcion, emp_categoria: data.emp_categoria, emp_web: data.emp_web
            });

        }

    }


    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <title>NOMBRE DE LA EMPRESA</title>
                <section id="job-details-page">
                    <div className="inner-heading-deatils">
                        <div className="container">
                            <h1>{this.state.usu_nombre}</h1>
                        </div>
                    </div>
                </section>
                <section className="details-desc-19-03">
                    <div className="container">
                        <div className="white-shadow">
                        <div className="details-pic">
                                    
                                    <img src={this.state.ruta_server_empresas + this.state.id_usuario + "/foto/" + this.state.usu_foto} className=" rounded-circle" />
                                </div>
                            <div className="row">
                                
                            
                                <div className="col-md-8">
                                    <div className="details-desc-caption">
                                        <p className="designation-job">{this.state.emp_categoria}</p>
                                        <p>{this.state.usu_descripcion}</p>
                                        <ul>
                                            <li><i className="fa fa-briefcase" aria-hidden="true" /><span> Full time</span></li>
                                            <li><i className="fa fa-hourglass-start" aria-hidden="true" /><span> 3 Year Experience</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="get-in-touch">
                                        <h4>DATOS DE EMPRESA</h4>
                                        <ul>
                                            <li><i className="fa fa-map-marker" aria-hidden="true" /><span>{this.state.usu_direccion}</span></li>
                                            <li><i className="fa fa-envelope-o" aria-hidden="true" /><span>{this.state.usu_correo}</span></li>
                                            <li><i className="fa fa-globe" aria-hidden="true" href="www.granhogar.com.ec" /><span>{this.state.emp_web}</span></li>
                                            <li><i className="fa fa-phone" aria-hidden="true" /><span>{this.state.usu_telefono}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="detail-pannel-footer">
                                    <div className="detail-border" />
                                    <div className="col-md text-right">
                                        <a className="btn btn-success apply-button" href="#">Editar datos de empresa</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        )
    }
}

