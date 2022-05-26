import React, { Component } from 'react'
import $ from 'jquery';
import axios from 'axios'

import config from '../metodos/config_session';

export default class Modaladdskills extends Component {
    state = {

        habilidades: [],
        niveles: [],
        habilidad: "",
        nivel: "",
        usu_codigo:"",
    }

    async componentDidMount() {

        const responseC = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (responseC.data.mensaje) {

            const data = responseC.data.datos;

            this.setState({ usu_codigo: data.usu_codigo });

        }

        const response = await axios.get('http://localhost:5000/req/listar_niveles_skills', config);


        if (response.data.mensaje) {

            this.setState({ niveles: this.state.niveles.concat(response.data.datos) });


        }

        const responseI = await axios.get('http://localhost:5000/req/listar_skills', config);


        if (responseI.data.mensaje) {

            this.setState({ habilidades: this.state.habilidades.concat(responseI.data.datos) });


        }


    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }


    howItWorks = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:5000/alum/guardar_skills', {
            alum_codigo: this.state.usu_codigo,
            ski_nombre: this.state.habilidad,
            ski_nivel: this.state.nivel,
        }, config);

        if (response.data.mensaje) {
            const data = response.data.datos;

            var container = document.getElementById("containerConocimientos");
            var el = document.createElement("li");
            el.className = "col-md-4";
            el.id = "cardSkl-" + data.ski_codigo;
            
            const responseSkill = await axios.post('http://localhost:5000/req/visualizar_skill', {
                skl_codigo: this.state.habilidad,
                niv_codigo: this.state.nivel,
            }, config);

            if(responseSkill.data.mensaje){
                const dataIdioma = responseSkill.data.datos;
                el.innerHTML = "<div class='thumbnail'> <a id='closeSkill' class='close' href='#'>×</a>" + dataIdioma.skl_nombre + "<br />" + dataIdioma.niv_nombre;
            }         

        }

        container.append(el);

        //limpia el modal
        $(".modalskills").on("hidden.bs.modal", function () {
            $('#habilidad').val(0);
            $('#nivel').val(0);
        });

        //cierra el modal
        $('#modalskills').modal('hide')
    }

    render() {

        return (
            <div class="modal fade" id="modalskills" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Nueva habilidad</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <b><label for="message-text" class="col-form-label">Conocimiento o habilidad:</label></b>

                                    <div className="form-group">
                                        <select className="form-control" onChange={this.onInputChange} id="habilidad" name="habilidad" value={this.state.habilidad} required>
                                            {
                                                this.state.habilidades.map(habilidades => (
                                                    <option key={habilidades.skl_codigo} value={habilidades.skl_codigo}>
                                                        {habilidades.skl_nombre}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <b><label for="message-text" class="col-form-label">Nivel:</label></b>

                                    <div className="form-group">
                                        <select className="form-control" onChange={this.onInputChange} id="nivel" name="nivel" value={this.state.nivel} required>
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
                            <button id="saveSkill" type="button" class="btn btn-primary" onClick={this.howItWorks} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}