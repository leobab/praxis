import React, { Component } from 'react'
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export default class main extends Component {


    state = {

        alum_fecha_nac: '',
        telefono: '',
        correo: '',
        contrasena: '',
        nombre: '',
        direccion: '',
        cedula: '',
        alum_genero: '',
        tipo: "alumno",
        foto: null,

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

        this.setState({ alum_genero: e.target.value });

    }

    onSubmitRegistro = async (e) => {

        

        e.preventDefault();

        if (/@utmachala.edu.ec\s*$/.test(this.state.correo)) {
            let formData = new FormData();
            formData.append('images', this.state.foto);
            formData.append('usu_nombre', this.state.nombre);
            formData.append('usu_cedula_ruc', this.state.cedula);
            formData.append('usu_telefono', this.state.telefono);
            formData.append('usu_tipo', this.state.tipo);
            formData.append('usu_correo', this.state.correo);
            formData.append('usu_contrasena', this.state.contrasena);
            formData.append('usu_direccion', this.state.direccion);
            formData.append('alum_fecha_nac', this.state.alum_fecha_nac);
            formData.append('alum_genero', this.state.alum_genero);

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
        } else {
            console.log("etra abajo");
            toast("Utilice su correo institucional para crear su cuenta!");   
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
                                    <img src="https://www.utmachala.edu.ec/portalwp/wp-content/uploads/Elecciones-6-1024x768.jpg" style={{ display: "block", width: "100%", height: "100%" }} alt="" />
                                </div>
                                <div class="col-sm-4">
                                    <h4 className="card-title mt-5 mb-5" style={{ textAlign: "center" }}>Registrarse</h4>
                                    <form onSubmit={this.onSubmitRegistro}>
                                        <div className="form-row mt-4">
                                            <div className="col text-center">
                                                <div className="image-upload" >
                                                    <label htmlFor="file-input" style={{ cursor: "pointer" }} title="Clic para subir foto de perfil" >
                                                        <img src="https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png" alt="" id="output" width="200" height="200" style={{ picturstyle, marginBottom: "15px" }} className="rounded-circle" />
                                                    </label>
                                                    <input id="file-input" type="file" name="images" style={{ display: 'none' }} onChange={this.loadimageprofile} accept="image/*, image/heic, image/heif" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-user"></i></span>
                                                </div>
                                                <input type="text" style={{ padding: "0 0 0 15px", height: "50px" }} className="form-control" name="nombre" id="nombre" onChange={this.onInputChange} value={this.state.nombre} placeholder="Nombre completo" required />
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-id-card-o"></i></span>
                                                </div>
                                                <input type="text" style={{ padding: "0 0 0 15px", height: "50px" }} className="form-control" name="cedula" onChange={this.onInputChange} value={this.state.cedula} placeholder="Cédula" required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div class="input-group ">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text d-flex justify-content-center" style={{ width: "45px" }}><i class="fa fa-envelope"></i></span>
                                                </div>
                                                <input type="text" style={{ padding: "0 0 0 15px", height: "50px" }} className="form-control" onChange={this.onInputChange} value={this.state.correo} name="correo" placeholder="Correo institucional" required />
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
                                        <h6>Fecha de Nacimiento</h6>
                                        <div class="md-form md-outline input-with-post-icon datepicker mb-3 mt-3">
                                            <input type="date" name="alum_fecha_nac" onChange={this.onInputChange} value={this.state.alum_fecha_nac} class="form-control" required />
                                        </div>
                                        <h6>Género</h6>
                                        <div className="row text-center mt-3">
                                            <div className="col">
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" onChange={this.onInputChangeSexo} name="alum_genero" value="1" required />
                                                        <label className="form-check-label" >Mujer</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" onChange={this.onInputChangeSexo} name="alum_genero" value="1" required />
                                                        <label className="form-check-label" >Hombre</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" onChange={this.onInputChangeSexo} name="alum_genero" value="3" required />
                                                        <label className="form-check-label" >Otro</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group text-center mt-1 mb-1">
                                            <button className="btn btn-success btn-block" type="submit">Registrarse</button>
                                        </div>

                                    </form>
                                    <ToastContainer position="top-right"
                            autoClose={2000}
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

                        </div>
                    </div>
                </div>
            </div>

        )

    }
}
