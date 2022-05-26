import React, { Component } from 'react'
import axios from 'axios';
import Modaladdschools from './modaladdschools'
import Modaladdidioms from './modaladdidioms'
import Modaladdworkexp from './modaladdworkexp';
import Modaladdskills from './modaladdskills';
import config from '../metodos/config_session';
import $ from 'jquery';
export default class completeregisterstudent extends Component {
    

    state = {

        descripcion: '',
        disponibilidad: ["Seleccione", "Presencial", "No presencial", "Semi-presencial"],
        experiencia: '',
        estudios: '',
        idiomas: '',
        habilidades: '',
        disponibilidad_pasantias: '',
        semestres: [],
        paralelos: [],
        horarios:[],
        horario_alum:'',
        alum_sem: '',
        alum_paral: '',
        cv: null,
        alum_d_desde:'',
        alum_d_hasta:''

    }

    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/req/listar_semestres', config);


        if (response.data.mensaje) {

            this.setState({ semestres: this.state.semestres.concat(response.data.datos) });


        }

        const responseP = await axios.get('http://localhost:5000/req/listar_paralelos', config);


        if (responseP.data.mensaje) {

            this.setState({ paralelos: this.state.paralelos.concat(responseP.data.datos) });


        }

        const responseHorario = await axios.get('http://localhost:5000/req/listar_horarios', config);

        if (responseHorario.data.mensaje) {

            this.setState({ horarios: this.state.horarios.concat(responseHorario.data.datos) });

        } 

    }


    onSubmit = async (e) => {

        e.preventDefault();

        let formData = new FormData();

        formData.append('files', this.state.cv);
        formData.append('alum_descripcion', this.state.descripcion);
        formData.append('alum_d_pasantia', this.state.disponibilidad_pasantias);
        formData.append('alum_sem', this.state.alum_sem);
        formData.append('alum_paral', this.state.alum_paral);
        formData.append('alum_d_desde', this.state.alum_d_desde);
        formData.append('alum_d_hasta', this.state.alum_d_hasta);
        formData.append('alum_disponibilidad', this.state.horario_alum);


        const response = await axios.post('http://localhost:5000/alum/completar_registro', formData,
            {
                withCredentials: true, headers:
                {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': true
                }
            });


        if (response.data.mensaje) {

            window.location.href = "/principal";

        }

    }


    loadcv = (e) => {

        this.setState({ cv: e.target.files[0] })

    };

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }


    render() {

        $('#closeExp').on('click', function () {

            var $target = $(this).parents('li');

            const exp = $target.attr("id").split('-');

            const id_exp = exp[1];

            console.log("solo el codigo: " + id_exp);

            const response = axios.post('http://localhost:5000/alum/eliminar_experiencia', {
                exp_codigo: id_exp,
            }, config);

            $target.hide('slow', function () { $target.remove(); });

        });

        $('#closeSchool').on('click', function () {

            var $target = $(this).parents('li');

            const exp = $target.attr("id").split('-');

            const id_exp = exp[1];

            console.log("solo el codigo: " + id_exp);

            const response = axios.post('http://localhost:5000/alum/eliminar_estudios', {
                est_codigo: id_exp,
            }, config);

            $target.hide('slow', function () { $target.remove(); });

        });


        $('#closeIdioma').on('click', function () {

            var $target = $(this).parents('li');

            const exp = $target.attr("id").split('-');

            const id_exp = exp[1];

            const response = axios.post('http://localhost:5000/alum/eliminar_idiomas', {
                idio_codigo: id_exp,
            }, config);

            $target.hide('slow', function () { $target.remove(); });

        });


        $('#closeSkill').on('click', function () {

            var $target = $(this).parents('li');

            const exp = $target.attr("id").split('-');

            const id_exp = exp[1];

            const response = axios.post('http://localhost:5000/alum/eliminar_skills', {
                ski_codigo: id_exp,
            }, config);

            $target.hide('slow', function () { $target.remove(); });

        });


        return (

            <div class="container ">

                <div class="col-lg-12 p-5 text center  ">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title text-center">Completar registro</h5>
                            <form className="mt-4" onSubmit={this.onSubmit}>
                                <h6 class="mt-3 mb-3">Descripción personal</h6>
                                <textarea class="form-control" name="descripcion" onChange={this.onInputChange} value={this.state.descripcion} placeholder="Una descripción bien detallada y extensa de tu perfil profesional te ayudará a destacar entre otros candidatos." rows="2"></textarea>
                                <h6 class="mt-3 mb-3">Experiencia laboral <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modalexp"> + Agregar</button></h6>
                                <Modaladdworkexp />
                                {/* <div id="containerExperiencia" class="containerExperiencia mt-3" name="experiencia" onChange={this.howItWorks}></div> */}
                                {/* <row class="row list-unstyled" </row> */}
                                <div class="container" id="containerExperiencia"></div>
                                <h6 class="mt-3 mb-3">Estudios <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">+ Agregar</button></h6>
                                <Modaladdschools />
                                {/* <div id="containerEstudios" class="mt-3"></div> */}
                                <ul class="row list-unstyled" id="containerEstudios"></ul>
                                <h6 class="mt-3 mb-3">Idiomas <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modalidioms">+ Agregar</button></h6>
                                <Modaladdidioms />
                                <ul class="row list-unstyled" id="containerIdiomas"></ul>
                                {/* <div id="containerIdiomas" class="mt-3"></div> */}
                                <h6 class="mt-3 mb-3">Conocimientos y habilidades <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modalskills">+ Agregar</button></h6>
                                <Modaladdskills />
                                {/* <div id="containerConocimientos" class="mt-3"></div> */}
                                <ul class="row list-unstyled" id="containerConocimientos"></ul>

                                <div className='row'>
                                    <div className='col-4'>
                                        <h6 class="mt-3 mb-3">Disponibilidad de pasantías </h6>
                                        <div className="form-group">
                                            <select className="form-control" onChange={this.onInputChange} name="disponibilidad_pasantias" value={this.state.disponibilidad_pasantias} required>
                                                {
                                                    this.state.disponibilidad.map(disponibilidad => (
                                                        <option key={disponibilidad} value={disponibilidad}>
                                                            {disponibilidad}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <h6 class="mt-3 mb-3">Desde </h6>
                                        <div className="form-group">
                                            <div class="md-form ">
                                                <input type="time" id="inputMDEx1" class="form-control" name='alum_d_desde' value={this.state.alum_d_desde} onChange={this.onInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <h6 class="mt-3 mb-3">Hasta </h6>
                                        <div className="form-group">
                                            <div class="md-form ">
                                                <input type="time" id="inputMDEx1" class="form-control" name='alum_d_hasta' value={this.state.alum_d_hasta} onChange={this.onInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    
                                    <div className='row'>
                                        <div className='col-4'>
                                        <h6 class="mt-3 mb-3">Curso</h6>
                                            <select className="form-control" onChange={this.onInputChange} name="alum_sem" value={this.state.alum_sem} required>
                                                {
                                                    this.state.semestres.map(semestres => (
                                                        <option key={semestres.sem_codigo} value={semestres.sem_codigo}>
                                                            {semestres.sem_nombre}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='col-4'>
                                        <h6 class="mt-3 mb-3">Paralelo</h6>
                                            <select className="form-control" onChange={this.onInputChange} name="alum_paral" value={this.state.alum_paral} required>
                                                {
                                                    this.state.paralelos.map(paralelos => (
                                                        <option key={paralelos.paral_codigo} value={paralelos.paral_codigo}>
                                                            {paralelos.paral_nombre}
                                                        </option>
                                                    ))
                                                }
                                            </select>

                                        </div>
                                        <div className='col-4'>
                                        <h6 class="mt-3 mb-3">Horario disponible</h6>
                                            <select className="form-control" onChange={this.onInputChange} name="horario_alum" value={this.state.horario_alum} required>
                                                {
                                                    this.state.horarios.map(horarios => (
                                                        <option key={horarios.niv_codigo} value={horarios.niv_codigo}>
                                                            {horarios.niv_nombre}
                                                        </option>
                                                    ))
                                                }
                                            </select>

                                        </div>

                                    </div>

                                </div>

                                <h6 class="mt-4 mb-3">Subir CV</h6>
                                <div className="form-group">
                                    <input class="form-control" type="file" name="files" id="formFile" accept="application/pdf" onChange={this.loadcv} />
                                </div>

                                <button className="btn btn-success" style={{ float: "right" }} type="submit">Finalizar Registro</button>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
            

        )
    }
}



