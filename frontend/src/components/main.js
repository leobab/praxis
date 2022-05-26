import React, { Component } from 'react'
import axios from 'axios'

import config from '../metodos/config_session';

export default class main extends Component {


    render() {

        return (
            
            <div>
                {/* ======= Hero Section ======= */}
                <section id="hero" className="hero d-flex align-items-center">
                    <div className="container ">
                        <div className="row">
                            <div className="col-lg-6 d-flex flex-column justify-content-center">
                                <h1>Bienvenido a la bolsa de prácticas laborales de la Carrera de Mercadotecnia de la UTMACH</h1>
                                <h2>Busca oportunidad para realizar las prácticas pre profesionales laborales</h2>
                                <div>
                                    <div className="text-center text-lg-start">
                                        <a href="#about" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                            <span>¿Cómo funciona?</span>
                                            <i className="bi bi-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 hero-img" data-aos="zoom-out">
                                {/* <img src="https://i.ibb.co/rvSNnMX/PNG.png" className="img-fluid" alt /> */}
                                {/* <img src="https://i.ibb.co/rvSNnMX/PNG.png" class="img-fluid" alt="Responsive image"></img> */}
                                <img src="http://portalvirtualempleo.us.es/wp-content/uploads/2013/11/portalas_empleo.png" class="img-fluid" alt="Responsive image"></img>
                            </div>
                        </div>
                    </div>
                </section>{/* End Hero */}
                <main id="main">
                    {/* ======= About Section ======= */}
                    <section id="about" className="about">
                        <div className="container" data-aos="fade-up">
                            <div className="row gx-0">
                                <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="content">
                                        <h3>Como funciona</h3>
                                        <h2>Alumnos</h2>
                                        <p>
                                            Si eres un alumno de la Carrera de Mercadotecnia de la Universidad Técnica de Machala, podrás registrarte para postular a prácticas pre profesionales laborales en empresas del sector.
                                        </p>
                                        <div className="text-center text-lg-start">
                                            <a href="http://localhost:3000/registerstudent" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                                                <span>Registrarse</span>
                                                <i className="bi bi-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay={200}>
                                    <img src="https://img.freepik.com/foto-gratis/estudiantes-alegres-que-comunican-despues-lecciones_23-2147860636.jpg?w=900" className="img-fluid" alt />
                                </div>
                            </div>
                        </div>
                    </section>{/* End About Section */}
                    <section id="about" className="about">
                        <div className="container" data-aos="fade-up">
                            <div className="row gx-0">
                                <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="content">
                                        <h3>Como funciona</h3>
                                        <h2>Empresas</h2>
                                        <p>
                                            Si usted es representante de una empresa del sector, podrá registrarse para ofertar vacantes de prácticas pre profesionales laborales y seleccionar al estudiante idóneo para el cargo.
                                        </p>
                                        <div className="text-center text-lg-start">
                                            <a href="http://localhost:3000/registeremp" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                                                <span>Registrarse</span>
                                                <i className="bi bi-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay={200}>
                                    <img src="https://img.freepik.com/foto-gratis/joven-lider-equipo-gran-corporacion-informando-companeros-trabajo-apuntando-al-grafico-reunion-personal-corporativo_482257-4169.jpg?w=900" className="img-fluid" alt />
                                </div>
                            </div>
                        </div>
                    </section>{/* End About Section */}
                    {/* ======= Values Section ======= */}
                    <section id="values" className="values">
                    <div className="container" data-aos="fade-up">
                            <header className="section-header">
                                <h2></h2>
                                <p>Nuestros objetivos</p>
                            </header>

                            <div class="card mb-3">
                                <img style={{ height:"250px", width:"20" }} src="https://images.squarespace-cdn.com/content/v1/53aadf1de4b0a0a817640cca/1493052680347-305Z2MV014C8QRJ7HU8E/image-asset.jpeg?format=1000w" className="card-img-top" alt="Responsive image" />

                                    <div class="card-body">
                                        <h5 class="card-title">Incursionar</h5>
                                        <p class="card-text">Incursionar al estudiante al mundo laboral mediante la plataforma de Praxis, la cual permitira opciones para realizar sus prácticas pre profesionales laborales.</p>
                                        {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                    </div>
                            </div>

                            <div class="card mb-3">
                                <img style={{ height:"250px", width:"20" }} src="https://www.redem.org/wp-content/uploads/2016/04/profesor-universitario.jpg" className="card-img-top" alt="Responsive image" />

                                    <div class="card-body">
                                        <h5 class="card-title">Proveer</h5>
                                        <p class="card-text">Proveer a instituciones de acogida como entidades públicas o privadas, personas naurales o profesionales en libre ejercicio que brinde apertura para que la o el estudiante realice actividades de prácticas preprofesionales laborales o pasantías.</p>
                                        {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                    </div>
                            </div>
                        </div>

                        <div className="container" data-aos="fade-up">
                            <header className="section-header">
                                <h2></h2>
                                <p>Metas alcanzadas</p>
                            </header>
{/* Arreglar altura de metas alcanazdas */}
                            <div className="row">
                                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="box">
                                        <img src="https://img.freepik.com/vector-gratis/icono-isometrico-hombre-presentando-proyecto-pizarra-reunion-negocios_1284-63948.jpg?size=626&ext=jpg&uid=R65621102&ga=GA1.2.1852910101.1641495467" className="img-fluid" alt />
                                        <h3>Empresas registradas</h3>
                                        <h2 className="colorh2">52</h2>

                                    </div>
                                </div>
                                <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="box">
                                        <img src="https://img.freepik.com/vector-gratis/libro-lectura-dos-alumnos-escuela-ilustracion-isometrica-escritorio-blanco_1284-64284.jpg?w=740" className="img-fluid" alt />
                                        <h3>Alumnos registrados</h3>
                                        <h2 className="colorh2">20</h2>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="box">
                                        <img src="https://img.freepik.com/vector-gratis/elegir-mejor-concepto-candidato_52683-43377.jpg?w=900" className="imagenObjetivos" alt />
                                        <h3 colorh2>Número de postulaciones</h3>
                                        <h2 className="colorh2">+120</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>{/* End Values Section */}
                </main>
                </div>
        )

    }
}