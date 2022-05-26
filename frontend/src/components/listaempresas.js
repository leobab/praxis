import React, { Component } from 'react'
import { If } from 'react-if';
import axios from 'axios'

import config from '../metodos/config_session';

export default class Principal extends Component {

    state = {
        usu_tipo: '',
        usu_codigo: '',
        usu_nombre: '',
        usu_foto: '',
        conectado: false

    }

    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/usuario/ver_sesion', config);


        if (response.data.mensaje) {

            const data = response.data.datos;

            this.setState({ conectado: true, usu_codigo: data.usu_codigo, usu_nombre: data.usu_nombre, usu_foto: data.usu_foto, usu_tipo: data.usu_tipo });

        } else {

            this.setState({ conectado: false });

        }

    }


    render() {

        return (
            <div className="container-fluid">
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                <div className="event-schedule-area-two bg-color pad100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <div className="title-text">
                                        <h2>Event Schedule</h2>
                                    </div>
                                    <p>
                                        In ludus latine mea, eos paulo quaestio an. Meis possit ea sit. Vidisse molestie<br />
                                        cum te, sea lorem instructior at.
                                    </p>
                                </div>
                            </div>
                            {/* /.col end*/}
                        </div>
                        {/* row end*/}

                        <form>
                            <div class="form-row align-items-center">
                                <div class="col-auto">
                                    <label class="sr-only" for="inlineFormInput">Name</label>
                                    <input type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Jane Doe" />
                                </div>
                                <div class="col-auto">
                                    <label class="sr-only" for="inlineFormInputGroup">Username</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">@</div>
                                        </div>
                                        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Username" />
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" id="autoSizingCheck" />
                                        <label class="form-check-label" for="autoSizingCheck">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-primary mb-2">Submit</button>
                                </div>
                            </div>
                        </form>

                        <div className="row 6">
                            <div className="col-lg-12">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade active show" id="home" role="tabpanel">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col-8 text-center">Empresa</th>
                                                        <th scope="col text-center">Descripción</th>
                                                        <th scope="col">Categoría</th>
                                                        <th scope="col">Ubicación</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="inner-box">

                                                        <td>
                                                            <div className='col'>
                                                                <div className="event-img text-center">
                                                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt />
                                                                    <h5><a>Gran Hogar</a></h5>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="event-wrap">
                                                                <div className="meta">
                                                                    <div className="col">
                                                                        <p>Satisfacer las necesidades de los socios brindando productos financieros, excelencia en el servicio y sólidos valores.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="r-no">
                                                                <span>Pasaje, El Oro</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="primary-btn">
                                                                <a className="btn btn-primary" href="#">Ver más</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="primary-btn text-center">
                                                <a href="#" className="btn btn-primary">Download Schedule</a>
                                            </div>
                                        </div>
                                        {/* /col end*/}
                                    </div>
                                    {/* /row end*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )

    }
}
