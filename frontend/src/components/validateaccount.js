import React, { Component } from 'react'
import axios from 'axios';
import config from '../metodos/config_session';

export default class validarcuenta extends Component {

    state = {

        usu_codigo: '',
        usu_correo: '',
        conectado: false,
        codigo_verificacion: '',
        usu_tipo: ''

    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }

    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/usuario/ver_sesion', config);

        if (response.data.mensaje) {

            const data = response.data.datos;

            this.setState({ conectado: true, usu_codigo: data.usu_codigo, usu_correo: data.usu_correo, usu_tipo: data.usu_tipo });

        } else {

            this.setState({ conectado: false });

        }

        this.enviar_cod();

    }


    onSubmit = async (e) => {

        e.preventDefault();

        const response = await axios.post('http://localhost:5000/usuario/validar_cuenta', {

            codigo_verificacion: this.state.codigo_verificacion

        }, config);

        if (response.data.mensaje) {

            if (this.state.usu_tipo === 'alumno') {
                window.location.href = "/completeregisterstudent";
            } else if (this.state.usu_tipo === 'empresa') {
                window.location.href = "/principal";
            }

        } 

    }

    enviar_cod = async () => {

        const response = await axios.post('http://localhost:5000/usuario/enviar_codverificacion', {

            usu_correo: this.state.usu_correo

        }, config);

        if (response.data.mensaje) {

            console.log(response);

        }

    }

    render() {

        return (


            <div class="container ">

                <div class="col-lg-12 p-5 text center  ">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Validación de Cuenta</h5>
                            <p className="card-text">Confírmanos que te pertenece este correo electrónico.<br></br> Introduce el código del mensaje que hemos enviado a <strong>{this.state.usu_correo}</strong>.</p>
                            <form className="text-center" onSubmit={this.onSubmit}>
                                <div className="form-row text-center">
                                    <div className="col-2">
                                    </div>
                                    <div className="col-5">
                                        <input type="text" name="codigo_verificacion" onChange={this.onInputChange} value={this.state.codigo_verificacion} class="form-control" placeholder="Código de verificación" />
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-primary" type="submit">Validar correo</button>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-2">
                                </div>
                                <div className="col-5">
                                    <button className="btn btn-link" onClick={() => this.enviar_cod()} >Volver a enviar código</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
