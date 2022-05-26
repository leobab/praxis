import React, { Component } from 'react'
import $ from 'jquery';

import axios from 'axios'

import config from '../metodos/config_session';

export default class Modaladdidioms extends Component {
    state = {

        idiomas: [],
        niveles: [],
        idio_nombre: "",
        idio_nivel: "",
        usu_codigo: "",
    }

    async componentDidMount() {

        const responseC = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (responseC.data.mensaje) {

            const data = responseC.data.datos;

            this.setState({ usu_codigo: data.usu_codigo });

        }

        const response = await axios.get('http://localhost:5000/req/listar_niveles_idiomas', config);


        if (response.data.mensaje) {

            this.setState({ niveles: this.state.niveles.concat(response.data.datos) });


        }

        const responseI = await axios.get('http://localhost:5000/req/listar_idiomas', config);


        if (responseI.data.mensaje) {

            this.setState({ idiomas: this.state.idiomas.concat(responseI.data.datos) });


        }


    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }


    howItWorks = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:5000/alum/guardar_idiomas', {
            alum_codigo: this.state.usu_codigo,
            idio_nombre: this.state.idio_nombre,
            idio_nivel: this.state.idio_nivel,
        }, config);

        if (response.data.mensaje) {
            const data = response.data.datos;

            var container = document.getElementById("containerIdiomas");
            var el = document.createElement("li");
            el.className = "col-md-4";
            el.id = "cardEst-" + data.idio_codigo;
            
            const responseIdioma = await axios.post('http://localhost:5000/req/visualizar_idioma', {
                idi_codigo: this.state.idio_nombre,
                niv_codigo: this.state.idio_nivel,
            }, config);

            if(responseIdioma.data.mensaje){
                const dataIdioma = responseIdioma.data.datos;
                el.innerHTML = "<div class='thumbnail'> <a id='closeIdioma' class='close' href='#'>×</a>" + dataIdioma.idi_nombre + "<br />" + dataIdioma.niv_nombre;
            }         

        }

        container.append(el);

        //limpia el modal
        $(".modalidioms").on("hidden.bs.modal", function () {
            $('#idio_nombre').val(1);
            $('#idio_nivel').val(1);
        });

        //cierra el modal
        $('#modalidioms').modal('hide')

    }

    render() {

        return (
            <div class="modal fade" id="modalidioms" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Nuevo idioma</h5>
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