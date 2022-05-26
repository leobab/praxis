import React, { Component } from 'react'
import $ from 'jquery';

import axios from 'axios';


export default class main extends Component {


    state = {

        emp_descripcion: '',
        emp_convenio: '',
        emp_fecha_creacion: '',
        telefono: '',
        correo: '',
        contrasena: '',
        nombre: '',
        direccion: '',
        ruc: '',
        tipo: "empresa",
        foto: null,
        categoria:'',
        categorias:["Categorías", "Tecnologias de la información", "Textil"]
    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }

    loadimageprofile = (e) => {

        const output = document.getElementById('output');
        output.src = URL.createObjectURL(e.target.files[0]);

        this.setState({ foto: e.target.files[0] })

    };

    onInputChangeSexo = (e) => {

        this.setState({ emp_convenio: e.target.value });

    }


    onSubmitRegistro = async (e) => {

        e.preventDefault();

        let formData = new FormData();

        formData.append('images', this.state.foto);
        formData.append('usu_nombre', this.state.nombre);
        formData.append('usu_cedula_ruc', this.state.ruc);
        formData.append('usu_telefono', this.state.telefono);
        formData.append('usu_tipo', this.state.tipo);
        formData.append('usu_correo', this.state.correo);
        formData.append('usu_contrasena', this.state.contrasena);
        formData.append('usu_direccion', this.state.direccion);
        formData.append('emp_descripcion', this.state.emp_descripcion);
        formData.append('emp_categoria', this.state.emp_categoria);
        formData.append('emp_fecha_creacion', this.state.emp_fecha_creacion);
        formData.append('emp_convenio', this.state.emp_convenio);

        const responseUsuario = await axios.post('http://localhost:5000/usuario/registrarse', formData,
            {
                withCredentials: true, headers:
                {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': true
                }
            });

        if (responseUsuario.data.mensaje) {
            window.location.href = "/validateaccount";
        }

    }


    howItWorks = () => {
        $('.datepicker').datepicker({
            weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            showMonthsShort: true
        })
    }


    render() {

        const picturstyle = {
            'objectFit': 'cover',
            'objectPosition': 'center center',

        }

        return (
            <div class="container ">

                <div class="col-lg-12 p-5 text center  ">
                    <div className="card mt-3">
                        <div className="card-body">
                            <div class="row">
                                <div class="col-sm-8">
                                    <img src="https://t2.uc.ltmcdn.com/images/8/1/4/img_consejos_para_manejar_una_empresa_familiar_26418_orig.jpg" style={{ display: "block", width: "100%", height: "100%" }} alt="" />
                                </div>
                                <div class="col-sm-4">
                                    <h4 className="card-title mt-5 mb-5" style={{ textAlign: "center" }}>Registra tu empresa</h4>
                                    <form onSubmit={this.onSubmitRegistro}>
                                        <div className="form-row mt-4">
                                            <div className="col text-center">
                                                <div className="image-upload" >
                                                    <label htmlFor="file-input" style={{ cursor: "pointer" }} title="Clic para subir foto de perfil">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/993/993928.png" alt="" id="output" width="200" height="200" style={{ picturstyle, marginBottom: "15px" }} className="rounded-circle" />
                                                    </label>
                                                    <input id="file-input" type="file" name="images" style={{ display: 'none' }} onChange={this.loadimageprofile} accept="image/*, image/heic, image/heif" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-building"></i></span>
                                                </div>
                                                <input type="text" style={{ padding: "0 0 0 15px", height: "50px" }} className="form-control" name="nombre" id="nombre" onChange={this.onInputChange} value={this.state.nombre} placeholder="Nombre empresa" required />
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-id-card-o"></i></span>
                                                </div>
                                                <input type="text" style={{ padding: "0 0 0 15px", height: "50px" }} className="form-control" name="ruc" onChange={this.onInputChange} value={this.state.ruc} placeholder="RUC" required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-envelope"></i></span>
                                                </div>
                                                <input type="text" style={{ padding: "0 0 0 15px", height: "50px" }} className="form-control" onChange={this.onInputChange} value={this.state.correo} name="correo" placeholder="Correo electrónico" required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-key"></i></span>
                                                </div>
                                                <input type="password" style={{ padding: "0 0 0 15px", height: "50px" }} className="form-control" onChange={this.onInputChange} value={this.state.contrasena} name="contrasena" placeholder="Contraseña nueva" required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-phone"></i></span>
                                                </div>
                                                <input type="txt" style={{ padding: "0 0 0 15px", height: "50px" }} name="telefono" placeholder="Teléfono" onChange={this.onInputChange} value={this.state.telefono} className="form-control" required ></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-map-marker"></i></span>
                                                </div>
                                                <input type="txt" style={{ padding: "0 0 0 15px", height: "50px" }} name="direccion" placeholder="Dirección" onChange={this.onInputChange} value={this.state.direccion} className="form-control" required ></input>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Descripción de la empresa</label>
                                            <textarea class="form-control" name="emp_descripcion" onChange={this.onInputChange} value={this.state.emp_descripcion} rows="3"></textarea>
                                        </div>
                                        <h6>Fecha de creación de su empresa</h6>
                                        <div class="md-form md-outline input-with-post-icon datepicker mb-3 mt-3">
                                            <input type="date" name="emp_fecha_creacion" onChange={this.onInputChange} value={this.state.emp_fecha_creacion} class="form-control" required />
                                        </div>
                                        <h6>Sector</h6>
                                        <div className="form-group">
                                        <select className="form-control" onChange={this.onInputChange} name="emp_categoria" value={this.state.emp_categoria} required>
                                            {
                                                this.state.categorias.map(categorias => (
                                                    <option key={categorias} value={categorias}>
                                                        {categorias}
                                                    </option>
                                                ))
                                            }
                                        </select>

                                    </div>
                                        <h6>¿Posee convenio con la UTMACH?</h6>
                                        <div className="row text-center mt-3">
                                            <div className="col">
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" onChange={this.onInputChangeSexo} name="emp_convenio" value="si" required />
                                                        <label className="form-check-label" >Sí</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" onChange={this.onInputChangeSexo} name="emp_convenio" value="no" required />
                                                        <label className="form-check-label" >No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group text-center mt-1 mb-1">
                                            <button className="btn btn-success btn-block" type="submit">Registrarse</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )

    }
}