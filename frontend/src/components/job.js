import React, { Component } from 'react'
import axios from 'axios';
import config from '../metodos/config_session';
import $ from 'jquery';
import { If } from 'react-if'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Job extends Component {

    state = {

        job_nombre:'',
        job_descripcion:'',
        emp_nombre:'',
        emp_codigo:'',
        alum_estado:'',
        job_ubicacion:'', 
        job_area:'', 
        job_fecha_ini:'', 
        job_fecha_fin:'',
        job_hora_entrada:'', 
        job_hora_salida:'',
        job_disponibilidad:'',
        alum_codigo:'',
        estado:''
    }

    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (response.data.mensaje) {

            const data = response.data.datos;

            this.setState({ alum_codigo: data.usu_codigo});

        }

        const job_codigo_url = window.location.pathname.split("/")[2];

        const responseEmpleo = await axios.post('http://localhost:5000/empleo/listar_empleos_xcodigo',{
            job_codigo:job_codigo_url,
        }, config);

        if (responseEmpleo.data.mensaje) {
            
            const data = responseEmpleo.data.datos;

            this.setState({ job_nombre: data.job_titulo, job_descripcion: data.job_descripcion, emp_nombre: data.emp_nombre,
            job_ubicacion:data.job_ubicacion, job_area:data.job_area, job_fecha_ini:data.job_fecha_ini, job_fecha_fin:data.job_fecha_fin,
            job_hora_entrada:data.job_hora_entrada, job_hora_salida:data.job_hora_salida, emp_codigo:data.emp_codigo, job_disponibilidad:data.job_disponibilidad
        });

        }

        const responseAlum = await axios.get('http://localhost:5000/req/ver_datos_alumno/' + this.state.alum_codigo, config);

        if (responseAlum.data.mensaje) {

            const data = responseAlum.data.datos;

            this.setState({ alum_estado: data.alum_estado });

        }

        const responseEstado = await axios.post('http://localhost:5000/empalum/ver_estado_empleo_alumno/',{
            job_codigo:job_codigo_url,
            alum_codigo: this.state.alum_codigo
        } ,config);

        if (responseEstado.data.mensaje) {

            const data = responseEstado.data.datos;

            this.setState({ estado: data.estado });

        }

        

    }

    async postularme(){

        const job_codigo_url = window.location.pathname.split("/")[2];

        const response = await axios.post('http://localhost:5000/empalum/guardar', {
            emp_codigo:this.state.emp_codigo,
            job_codigo:job_codigo_url,
            alum_codigo: this.state.alum_codigo
        }, config);

        if (response.data.mensaje) {

            toast.success('Postulado exitosamente!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

            setTimeout(function(){
                window.location.href = "/principal";
            }, 350);

        } 
    }





    render() {

        return (
            <div class="container ">
                <div class="col-lg-12 p-5 text center  ">
                    <div className="card mt-3">
                        <div className="card-body">
                            <If condition={this.state.alum_estado==1 && this.state.estado==""}>
                                <h5 className="card-title">{this.state.job_nombre} <button type="button" class="btn btn-success" style={{ float: 'right' }} onClick={()=> this.postularme(this.state.emp_codigo, this.state.alum_codigo)}>Postularme</button>
                                <a href={"/profile/"+this.state.emp_codigo} target="_blank"><button type="button" class="btn btn-info mr-3" style={{ float: 'right' }}>Ver perfil de la empresa</button></a></h5>
                            </If>
                            <If condition={this.state.alum_estado==2 }>
                                <h5 className="card-title">{this.state.job_nombre} 
                                <a href={"/profile/"+this.state.emp_codigo} target="_blank"><button type="button" class="btn btn-info mr-3" style={{ float: 'right' }}>Ver perfil de la empresa</button></a></h5>
                            </If>
                            <If condition={this.state.alum_estado==1 && this.state.estado=="P"}>
                                <h5 className="card-title">{this.state.job_nombre} 
                                <a href={"/profile/"+this.state.emp_codigo} target="_blank"><button type="button" class="btn btn-info mr-3" style={{ float: 'right' }}>Ver perfil de la empresa</button></a></h5>
                            </If>
                            
                            
                                <div className='row mt-5'>
                                    <div className='col-12'>
                                        <h6 class="mt-3 mb-3">Descripción del empleo: </h6>
                                        <label for="exampleInputEmail1">{this.state.job_descripcion}</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Empresa: </h6>
                                        <label for="exampleInputEmail1">{this.state.emp_nombre}</label>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Área</h6>
                                        <label for="exampleInputEmail1">{this.state.job_area}</label>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Ubicación</h6>
                                        <label for="exampleInputEmail1">{this.state.job_ubicacion}</label>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Horario empleo</h6>
                                        <label for="exampleInputEmail1">{this.state.job_disponibilidad}</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Fecha inicio</h6>
                                        <label for="exampleInputEmail1">{this.state.job_fecha_ini}</label>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Fecha finalización</h6>
                                        <label for="exampleInputEmail1">{this.state.job_fecha_fin}</label>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Hora de entrada </h6>
                                        <label for="exampleInputEmail1">{this.state.job_hora_entrada}</label>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Hora de salida </h6>
                                        <label for="exampleInputEmail1">{this.state.job_hora_salida}</label>
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
                                
                                
                                
                                
                                {/* 
                                <textarea class="form-control" name="descripcion" onChange={this.onInputChange} value={this.state.descripcion} placeholder="Una descripción bien detallada de las actividades del empleo a ofertar" rows="6"></textarea>
                                <div className='row'>
                                    <div className='col-6'>
                                        <h6 class="mt-3 mb-3">Área</h6>
                                        <textarea class="form-control" name="area" onChange={this.onInputChange} value={this.state.area} placeholder="Área del puesto o cargo solicitado" rows="1"></textarea>
                                    </div>
                                    <div className='col-6'>
                                        <h6 class="mt-3 mb-3">Ubicación</h6>
                                        <textarea class="form-control" name="ubicacion" onChange={this.onInputChange} value={this.state.ubicacion} placeholder="Ciudad o país de ubicación" rows="1"></textarea>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Fecha inicio</h6>
                                        <div class="md-form md-outline input-with-post-icon datepicker mb-3 mt-3">
                                            <input type="date" name="fecha_ini" onChange={this.onInputChange} value={this.state.fecha_ini} class="form-control" required />
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Fecha finalización</h6>
                                        <div class="md-form md-outline input-with-post-icon datepicker mb-3 mt-3">
                                            <input type="date" name="fecha_fin" onChange={this.onInputChange} value={this.state.fecha_fin} class="form-control" required />
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Hora de entrada </h6>
                                        <div className="form-group">
                                            <div class="md-form ">
                                                <input type="time" id="inputMDEx1" class="form-control" name='hora_entrada' value={this.state.hora_entrada} onChange={this.onInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <h6 class="mt-3 mb-3">Hora de salida </h6>
                                        <div className="form-group">
                                            <div class="md-form ">
                                                <input type="time" id="inputMDEx1" class="form-control" name='hora_salida' value={this.state.hora_salida} onChange={this.onInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group mt-3'>
                                    <button className="btn btn-success" style={{ float: "right" }} type="submit">Crear Empleo</button>
                                    <a href="/principal"><button type="button" class="btn btn-danger mr-3" style={{ float: 'right' }}>Cancelar</button></a>
                                </div> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



