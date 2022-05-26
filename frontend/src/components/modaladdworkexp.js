import React, { Component } from 'react'
import { If, Then } from 'react-if';
import $ from 'jquery';
import axios from 'axios'

import config from '../metodos/config_session';

export default class Modaladdworkexp extends Component {
    
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
        cargo: "",
        empresa: "",
        actividades: "",
        cursando: "",
        mes_seleccionadoD: "",
        año_seleccionadoDEXP: "",
        mes_seleccionadoH: "",
        año_seleccionadoHEXP: "",
        usu_codigo: "",
        fecha_fin: "Actualmente"
    }

    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (response.data.mensaje) {

            const data = response.data.datos;

            this.setState({ conectado: true, usu_codigo: data.usu_codigo });

        } else {

            this.setState({ conectado: false });

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
            const response = await axios.post('http://localhost:5000/alum/guardar_experiencia', {
                alum_codigo: this.state.usu_codigo,
                exp_cargo: this.state.cargo,
                exp_empresa_nombre: this.state.empresa,
                exp_actividades: this.state.actividades,
                exp_fecha_ini: this.state.año_seleccionadoDEXP,
                exp_fecha_fin: this.state.fecha_fin,
            }, config);

            if (response.data.mensaje) {
                const data = response.data.datos;

                var container = document.getElementById("containerExperiencia");
                var el = document.createElement("li");
                el.className = "col-md-4";
                el.id = "cardExp-" + data.exp_codigo;
                el.innerHTML = "<div class='thumbnail' style='border: 1px'> <a id='closeExp' class='close' href='#'>×</a>" + this.state.cargo + "<br />" + this.state.empresa + "<br />" + this.state.año_seleccionadoDEXP + " - " + this.state.fecha_fin;

                // var container = document.getElementById("containerExperiencia");
                // var el = document.createElement("li");
                // el.className = "card card-hover-shadow mt-4 col-md-4";
                // el.id = "cardExp-" + data.exp_codigo;
                // el.innerHTML = `<div class="card-header bg-transparent border-bottom-0">
                //                     <a id='closeExp' class='close' href='#'>×</a>
                //                 </div>
                //                 <div class="card-body mt-n5">
                //                     <p class="card-text">
                //                     `+this.state.cargo+`
                //                     </p>
                //                 </div>`;
                
                
                //"<div class='card'> <div class='card-block'>" + this.state.cargo + "<br />" + this.state.empresa + "<br />" + this.state.año_seleccionadoDEXP + "- " + this.state.fecha_fin+"</div></div>";
                
            }


        } else if (this.state.mes_seleccionadoH != "") {
            const response = await axios.post('http://localhost:5000/alum/guardar_experiencia', {
                alum_codigo: this.state.usu_codigo,
                exp_cargo: this.state.cargo,
                exp_empresa_nombre: this.state.empresa,
                exp_actividades: this.state.actividades,
                exp_fecha_ini: this.state.año_seleccionadoDEXP,
                exp_fecha_fin: this.state.año_seleccionadoHEXP,
            }, config);

            if (response.data.mensaje) {
                const data = response.data.datos;
                var container = document.getElementById("containerExperiencia");
                var el = document.createElement("li");
                el.className = "col-md-4";
                el.id = "cardExp-" + data.exp_codigo;
                el.innerHTML = "<div class='thumbnail' style='border: 1px'> <a id='closeExp' class='close' href='#'>×</a>" + this.state.cargo + "<br />" + this.state.empresa + "<br />" + this.state.año_seleccionadoDEXP + " - " + this.state.año_seleccionadoHEXP;
            }
        }

        container.append(el);

        //limpia el modal
        $(".modal").on("hidden.bs.modal", function () {
            $(".modal-body input").val("");
            $(".modal-body textarea").val("");
            $('input[type="radio"]').prop('checked', false);
            $('#mes_seleccionadoD').val(0);
            $('#año_seleccionadoDEXP').val(0);
            $('#mes_seleccionadoH').val(0);
            $('#año_seleccionadoHEXP').val(0);
        });

        //cierra el modal
        $('#modalexp').modal('hide')


    }



    render() {



        return (
            <div class="modal fade" id="modalexp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Nueva experiencia laboral</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Cargo o puesto:</label>
                                    <input type="text" class="form-control" id="cargo" name="cargo" value={this.state.cargo} onChange={this.onInputChange} />
                                </div>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Nombre de la empresa:</label>
                                    <input type="text" class="form-control" id="empresa" name="empresa" value={this.state.empresa} onChange={this.onInputChange} />
                                </div>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Actividades desarrolladas:</label>
                                    <textarea class="form-control" name="actividades" id="actividades" value={this.state.actividades} onChange={this.onInputChange} rows="2"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Trajando actualmente:</label>
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" onChange={this.onInputChangeCursando} name="actualmente_seleccionadoEXP" value="Sí" required />
                                                <label className="form-check-label" >Sí</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" onChange={this.onInputChangeCursando} name="actualmente_seleccionadoEXP" value="No" required />
                                                <label className="form-check-label" >No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <If condition={this.state.cursando === 'No'}>
                                    <Then>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Desde:</label>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.onInputChange} id="mes_seleccionadoD" name="mes_seleccionadoD" value={this.state.mes_seleccionadoD} required>
                                                        {
                                                            this.state.meses.map((meses, index) => (
                                                                <option key={meses} value={index}>
                                                                    {meses}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.onInputChange} id="año_seleccionadoDEXP" name="año_seleccionadoDEXP" value={this.state.año_seleccionadoDEXP} required>
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
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Hasta:</label>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.onInputChange} id="mes_seleccionadoH" name="mes_seleccionadoH" value={this.state.mes_seleccionadoH} required>
                                                        {
                                                            this.state.meses.map((meses, index) => (
                                                                <option key={meses} value={index}>
                                                                    {meses}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.onInputChange} id="año_seleccionadoHEXP" name="año_seleccionadoHEXP" value={this.state.año_seleccionadoHEXP} required>
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
                                        </div>
                                    </Then>
                                </If>
                                <If condition={this.state.cursando === 'Sí'}>
                                    <Then>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Desde:</label>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.onInputChange} id="mes_seleccionadoD" name="mes_seleccionadoD" value={this.state.mes_seleccionadoD} required>
                                                        {
                                                            this.state.meses.map((meses, index) => (
                                                                <option key={meses} value={index}>
                                                                    {meses}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <select className="form-control" onChange={this.onInputChange} id="año_seleccionadoDEXP" name="año_seleccionadoDEXP" value={this.state.año_seleccionadoDEXP} required>
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
                                        </div>
                                    </Then>
                                </If>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button id="saveExp" type="button" class="btn btn-primary" onClick={this.howItWorks} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}