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
            <div class="m-0 vh-100 row justify-content-center align-items-center mt-10">
                <div className="container mt-8">
                    <div className="row">
                        <div className="col-lg-12 card-margin">
                            <div className="card search-form">
                                <div className="card-body p-0">
                                    <form id="search-form">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row no-gutters">
                                                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                        <select className="form-control" id="exampleFormControlSelect1">
                                                            <option>Ubicación</option>
                                                            <option>Machala</option>
                                                            <option>Pasaje</option>
                                                            <option>Huaquillas</option>
                                                            <option>Santa Rosa</option>
                                                            <option>El Guabo</option>
                                                            <option>La ponce</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                                                        <input type="text" placeholder="Buscar..." className="form-control" id="search" name="search" />
                                                    </div>
                                                    <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                                                        <button type="submit" className="btn btn-base">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-margin">
                                <div className="card-body">
                                    <div className="row search-body">
                                        <div className="col-lg-12">
                                            <div className="search-result">
                                                <div className="result-header">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="records">Empleos: <b>1-20</b> of <b>200</b> Resultados</div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="result-actions">
                                                                <div className="result-sorting">
                                                                    <span>Sort By:</span>
                                                                    <select className="form-control border-0" id="exampleOption">
                                                                        <option value={1}>Relevancia</option>
                                                                        <option value={2}>Nombres (A-Z)</option>
                                                                        <option value={3}>Nombres (Z-A)</option>
                                                                    </select>
                                                                </div>
                                                                <div className="result-views">
                                                                    <button type="button" className="btn btn-soft-base btn-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
                                                                            <line x1={8} y1={6} x2={21} y2={6} />
                                                                            <line x1={8} y1={12} x2={21} y2={12} />
                                                                            <line x1={8} y1={18} x2={21} y2={18} />
                                                                            <line x1={3} y1={6} x2={3} y2={6} />
                                                                            <line x1={3} y1={12} x2={3} y2={12} />
                                                                            <line x1={3} y1={18} x2={3} y2={18} />
                                                                        </svg>
                                                                    </button>
                                                                    <button type="button" className="btn btn-soft-base btn-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                                                                            <rect x={3} y={3} width={7} height={7} />
                                                                            <rect x={14} y={3} width={7} height={7} />
                                                                            <rect x={14} y={14} width={7} height={7} />
                                                                            <rect x={3} y={14} width={7} height={7} />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="result-body">
                                                    <div className="table-responsive">
                                                        <table className="table widget-26">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://www.granhogar.com.ec/bundles/images/LOGO-GH.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Ingeniero de software / Desarrollador</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Gran Hogar</a> <span className="text-muted time">Hace 2 horas</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Tiempo completo</p>
                                                                            <p className="text-muted m-0">en <span className="location">Machala, El oro</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">Comercial</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-base">
                                                                            <i className="indicator bg-base" />
                                                                            <span>Desarrollo de software</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://www.granhogar.com.ec/bundles/images/LOGO-GH.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Ingeniero de software / Desarrollador</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Gran Hogar</a> <span className="text-muted time">Hace 1 dia</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Tiempo completo</p>
                                                                            <p className="text-muted m-0">en <span className="location">Machala, El oro</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">Comercial</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-base">
                                                                            <i className="indicator bg-base" />
                                                                            <span>Desarrollo de software</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://www.granhogar.com.ec/bundles/images/LOGO-GH.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Ingeniero de software / Desarrollador</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Gran Hogar</a> <span className="text-muted time">hace 2 dias</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Tiempo completo</p>
                                                                            <p className="text-muted m-0">en <span className="location">Machala, El oro</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">Comercial</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-base">
                                                                            <i className="indicator bg-base" />
                                                                            <span>Desarrollo de software</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://www.granhogar.com.ec/bundles/images/LOGO-GH.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Ingeniero de software / Desarrollador</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Gran Hogar</a> <span className="text-muted time">Hace 1 semana</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Tiempo completo</p>
                                                                            <p className="text-muted m-0">en <span className="location">Machala, El oro</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">Comercial</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-base">
                                                                            <i className="indicator bg-base" />
                                                                            <span>Desarrollo de software</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://seeklogo.com/images/S/servientrega-logo-C097C05543-seeklogo.com.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Marketing en redes sociales / Marketing</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Servientrega</a> <span className="text-muted time">Hace 5 dias</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Part-Time</p>
                                                                            <p className="text-muted m-0">in <span className="location">Mumbai, IN</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">$ 70/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-info">
                                                                            <i className="indicator bg-info" />
                                                                            <span>Infra Supervision</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star starred">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://seeklogo.com/images/S/servientrega-logo-C097C05543-seeklogo.com.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Senior Software Engineer / Developer</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Servientrega</a> <span className="text-muted time">Hace 1 semana</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Full-Time</p>
                                                                            <p className="text-muted m-0">in <span className="location">Servientrega</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">$ 50/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-base">
                                                                            <i className="indicator bg-base" />
                                                                            <span>Software Development</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://seeklogo.com/images/S/servientrega-logo-C097C05543-seeklogo.com.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Marketing &amp; Communication Supervisor</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Servientrega</a> <span className="text-muted time">Hace una semana</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Part-Time</p>
                                                                            <p className="text-muted m-0">in <span className="location">Santa Rosa, El Oro</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">$ 60/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-warning">
                                                                            <i className="indicator bg-warning" />
                                                                            <span>Marketing</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-title">
                                                                            <a href="#">Senior Data Analyst / Scientist</a>
                                                                            <p className="m-0"><a href="#" className="employer-name">Servientrega.</a> <span className="text-muted time">Hace 1 mes</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-info">
                                                                            <p className="type m-0">Part-Time</p>
                                                                            <p className="text-muted m-0">in <span className="location">Pasaje, El Oro</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-salary">$ 60/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-category bg-soft-success">
                                                                            <i className="indicator bg-success" />
                                                                            <span>Artificial Intelligence</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <nav className="d-flex justify-content-center">
                                        <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
                                            <li className="page-item">
                                                <a className="page-link no-border" href="#">
                                                    <span aria-hidden="true">«</span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link no-border" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link no-border" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link no-border" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link no-border" href="#">4</a></li>
                                            <li className="page-item">
                                                <a className="page-link no-border" href="#">
                                                    <span aria-hidden="true">»</span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
