import React, { Component } from 'react'
import { If, Then } from 'react-if';
import $ from 'jquery';
import axios from 'axios'

import config from '../metodos/config_session';

export default class Modaladdschools extends Component {

    generateArrayOfYears() {
        var max = new Date().getFullYear()
        var min = max - 30
        var years = []
      
        for (var i = max; i >= min; i--) {
          years.push(i)
        }
        return years
    }

    state = {
        meses: ["Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        años: this.generateArrayOfYears(),
        nivel_estudios: [],
        cursando: "",
        mes_seleccionadoD: "",
        año_seleccionadoD: "",
        mes_seleccionadoH: "",
        año_seleccionadoH: "",
        nivel_estudios_seleccionado: "",
        fecha_fin: "Actualmente",
        usu_codigo: "",
        est_centro_edu: "",
        est_titulo: ""


    }


    async componentDidMount() {

        const responseC = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (responseC.data.mensaje) {

            const data = responseC.data.datos;

            this.setState({ usu_codigo: data.usu_codigo });

        } 

        const response = await axios.get('http://localhost:5000/req/listar_niveles_estudios', config);


        if (response.data.mensaje) {

            this.setState({ nivel_estudios: this.state.nivel_estudios.concat(response.data.datos) });


        }


    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }

    onInputChangeCursando = (e) => {

        this.setState({ cursando: e.target.value });

    }

    howItWorks = async (e) => {
        e.preventDefault();

        if (this.state.mes_seleccionadoH == "") {
            const response = await axios.post('http://localhost:5000/alum/guardar_estudios', {
                alum_codigo: this.state.usu_codigo,
                est_centro_edu: this.state.est_centro_edu,
                est_nivel: this.state.nivel_estudios_seleccionado,
                est_fecha_ini: this.state.año_seleccionadoD,
                est_fecha_fin: this.state.fecha_fin,
                est_titulo: this.state.est_titulo,
            }, config);

            if (response.data.mensaje) {
                const data = response.data.datos;

                var container = document.getElementById("containerEstudios");
                var el = document.createElement("li");
                el.className = "col-md-4";
                el.id = "cardEst-" + data.est_codigo;
                el.innerHTML = "<div class='thumbnail'> <a id='closeSchool' class='close' href='#'>×</a>" + this.state.est_centro_edu + "<br />" + this.state.est_titulo + "<br />" + this.state.año_seleccionadoD + "- " + this.state.fecha_fin;

            }


        } else if (this.state.mes_seleccionadoH != "") {
            console.log("entra aca y el año es: "+this.state.año_seleccionadoH);
            const response = await axios.post('http://localhost:5000/alum/guardar_estudios', {
                alum_codigo: this.state.usu_codigo,
                est_centro_edu: this.state.est_centro_edu,
                est_nivel: this.state.nivel_estudios_seleccionado,
                est_fecha_ini: this.state.año_seleccionadoD,
                est_fecha_fin: this.state.año_seleccionadoH,
                est_titulo: this.state.est_titulo,
            }, config);

            if (response.data.mensaje) {
                const data = response.data.datos;
                container = document.getElementById("containerEstudios");
                el = document.createElement("li");
                el.className = "col-md-4";
                el.id = "cardExp-" + data.est_codigo;
                el.innerHTML = "<div class='thumbnail'> <a id='closeSchool' class='close' href='#'>×</a>" + this.state.est_centro_edu + "<br />" + this.state.est_titulo + "<br />" + this.state.año_seleccionadoD + "- " + this.state.año_seleccionadoH;
            }
        }

        container.append(el);

        //limpia el modal
        $(".modal").on("hidden.bs.modal", function () {
            $(".modal-body input").val("");
            $(".modal-body textarea").val("");
            $('input[type="radio"]').prop('checked', false);
            $('#nivel_estudios_seleccionado').val(1);
            $('#mes_seleccionadoD').val(0);
            $('#año_seleccionadoD').val(0);
            $('#mes_seleccionadoH').val(0);
            $('#año_seleccionadoH').val(0);
        });

        //cierra el modal
        $('#exampleModal').modal('hide')

    }

    render() {

        return (
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Nuevo estudio</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <b><label for="recipient-name" class="col-form-label">Centro Educativo:</label></b>
                                    <input type="text" class="form-control" id="est_centro_edu" name="est_centro_edu" value={this.state.est_centro_edu} onChange={this.onInputChange} />
                                </div>
                                <div class="form-group">
                                    <b><label for="message-text" class="col-form-label">Nivel de Estudios:</label></b>

                                    <div className="form-group">
                                        <select className="form-control" onChange={this.onInputChange} id="nivel_estudios_seleccionado" name="nivel_estudios_seleccionado" value={this.state.nivel_estudios_seleccionado} required>
                                            {
                                                this.state.nivel_estudios.map(nivel_estudios => (
                                                    <option key={nivel_estudios.est_codigo} value={nivel_estudios.niv_codigo}>
                                                        {nivel_estudios.niv_nombre}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <b><label for="recipient-name" class="col-form-label">Título:</label></b>
                                    <input type="text" class="form-control" id="est_titulo" name="est_titulo" value={this.state.est_titulo} onChange={this.onInputChange}/>
                                </div>
                                <div class="form-group">
                                    <b><label for="message-text" class="col-form-label">Cursando Actualmente:</label></b>
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" onChange={this.onInputChangeCursando} name="actualmente_seleccionado" value="Sí" required />
                                                <label className="form-check-label" >Sí</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" onChange={this.onInputChangeCursando} name="actualmente_seleccionado" value="No" required />
                                                <label className="form-check-label" >No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <If condition={this.state.cursando === 'No'}>
                                    <Then>
                                        <div class="form-group">
                                            <b><label for="message-text" class="col-form-label">Desde:</label></b>

                                            <div className="form-group">
                                                <select className="form-control" onChange={this.onInputChange} name="mes_seleccionadoD" value={this.state.mes_seleccionadoD} required>
                                                    {
                                                        this.state.meses.map((meses, index) => (
                                                            <option key={meses} value={index}>
                                                                {meses}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>


                                            <div className="form-group">
                                                <select className="form-control" onChange={this.onInputChange} name="año_seleccionadoD" value={this.state.año_seleccionadoD} required>
                                                    {
                                                        this.state.años.map(años => (
                                                            <option key={años} value={años}>
                                                                {años}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                        <div class="form-group">
                                            <b><label for="message-text" class="col-form-label">Hasta:</label></b>

                                            <div className="form-group">
                                                <select className="form-control" onChange={this.onInputChange} name="mes_seleccionadoH" value={this.state.mes_seleccionadoH} required>
                                                    {
                                                        this.state.meses.map((meses, index) => (
                                                            <option key={meses} value={index}>
                                                                {meses}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>


                                            <div className="form-group">
                                                <select className="form-control" onChange={this.onInputChange} name="año_seleccionadoH" value={this.state.año_seleccionadoH} required>
                                                    {
                                                        this.state.años.map(años => (
                                                            <option key={años} value={años}>
                                                                {años}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                    </Then>
                                </If>
                                <If condition={this.state.cursando === 'Sí'}>
                                    <Then>
                                        <div class="form-group">
                                            <b><label for="message-text" class="col-form-label">Desde:</label></b>

                                            <div className="form-group">
                                                <select className="form-control" onChange={this.onInputChange} name="mes_seleccionadoD" value={this.state.mes_seleccionadoD} required>
                                                    {
                                                        this.state.meses.map((meses, index) => (
                                                            <option key={meses} value={index}>
                                                                {meses}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>


                                            <div className="form-group">
                                                <select className="form-control" onChange={this.onInputChange} name="año_seleccionadoD" value={this.state.año_seleccionadoD} required>
                                                    {
                                                        this.state.años.map(años => (
                                                            <option key={años} value={años}>
                                                                {años}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                    </Then>
                                </If>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button id="saveEstudio" type="button" class="btn btn-primary" onClick={this.howItWorks} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}