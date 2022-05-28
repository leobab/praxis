import React, { Component } from 'react'
import $ from 'jquery';

import axios from 'axios'

import config from '../metodos/config_session';

export default class Modalchangepass extends Component {
    state = {

        pass_new: "",
        pass_old: "",
    }

    async componentDidMount() {

        const responseC = await axios.get('http://localhost:5000/usuario/ver_sesion', config);
        if (responseC.data.mensaje) {
            const data = responseC.data.datos;
            this.setState({ usu_codigo: data.usu_codigo });

        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {
        return (
            <div class="modal fade" id="modalcambiarpass" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> Cambiar contraseña</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <b><label for="message-text" class="col-form-label">Idioma:</label></b>

                                    <div className="form-group">
                                        <select className="form-control" onChange={this.onInputChange} id="idio_nombre" name="idio_nombre" value={this.state.idio_nombre} required>
                                            {
                                                this.state.idiomas.map(idiomas => (
                                                    <option key={idiomas.idi_codigo} value={idiomas.idi_codigo}>
                                                        {idiomas.idi_nombre}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <b><label for="message-text" class="col-form-label">Nivel:</label></b>

                                    <div className="form-group">
                                        <select className="form-control" onChange={this.onInputChange} id="idio_nivel" name="idio_nivel" value={this.state.idio_nivel} required>
                                            {
                                                this.state.niveles.map(niveles => (
                                                    <option key={niveles.niv_codigo} value={niveles.niv_codigo}>
                                                        {niveles.niv_nombre}
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
                            <button id="saveIdiom" type="button" class="btn btn-primary" onClick={this.howItWorks} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}