import React, { Component } from 'react'
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

import config from '../metodos/config_session';

export default class Modalchoosejob extends Component {


    state = {

        empleos_d_alumno: [],
        usu_codigo: '',
        job_codigo:'',
        alum_codigo:''

        
    }

    async componentDidMount() {

        const alum_codigo = window.location.pathname.split("/")[2];

        const responseC = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (responseC.data.mensaje) {

            const data = responseC.data.datos;

            this.setState({ usu_codigo: data.usu_codigo, alum_codigo:alum_codigo});

        }
        
        console.log(document.getElementById('modal_codigo').innerText);

        const response = await axios.post('http://localhost:5000/empalum/listar_empleos_alumno', {
            alum_codigo: alum_codigo,

        }, config);


        if (response.data.mensaje) {

            this.setState({ empleos_d_alumno: this.state.empleos_d_alumno.concat(response.data.datos) });

        }

        console.log(JSON.stringify(this.state.empleos_d_alumno));

    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }


    async seleccionar_alumno(){

        const job_codigo_url = document.getElementById('job_codigo').value; 

        console.log("job codigo: "+job_codigo_url);

        const response = await axios.post('http://localhost:5000/empalum/seleccionar_alumno', {

            job_codigo: job_codigo_url,
            alum_codigo: this.state.alum_codigo

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
            }, 350);
            

        }

    }

    render() {

        

        return (
            <div class="modal fade" id="modaljobs" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Seleccionar empleo para el alumno <h6 id="modal_codigo" hidden></h6></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <h6 id="modal_body"></h6>
                            <form>

                                <div class="form-group">

                                    <div className="form-group">
                                        <h6 className='text-left'>Empleos a los que ha postulado el alumno/a: <p></p> <h6 id="modal_nombre" style={{textAlign:'center'}}></h6></h6>
                                        <select className="form-control" onChange={this.onInputChange} id="job_codigo" name="job_codigo" value={this.state.job_codigo} required>
                                            <option value={0}>Seleccione</option>
                                            {
                                                this.state.empleos_d_alumno.map(empleos_d_alumno => (
                                                    <option key={empleos_d_alumno.job_codigo} value={empleos_d_alumno.job_codigo}>
                                                        {empleos_d_alumno.job_titulo+" - "+empleos_d_alumno.job_ubicacion}
                                                    </option>
                                                ))
                                            }
                                        </select>

                                    </div>

                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button id="saveIdiom" type="button" class="btn btn-success" onClick={()=>this.seleccionar_alumno()} >Seleccionar</button>
                        </div>
                    </div>
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
                </div>
            </div>
        )
    }
}