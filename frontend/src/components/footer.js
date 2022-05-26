import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../metodos/config_session';
import { If, Then, Else } from 'react-if';


export default class footer extends Component {

    render() {
        return (
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            {/* Contact Info*/}
                            <section className="widget widget-light-skin">
                                <h3 className="widget-title">Contactos</h3>
                                <p className="text-white">Telefono: (07) 2915626</p>
                                <ul className="list-unstyled text-sm text-white">
                                    <li><span className="opacity-50">Lunes a Viernes:</span>7.00 am - 5.00 pm</li>
                                </ul>
                                <p><a className="navi-link-light" href="#">bolsapracticas@utmachala.edu.ec</a></p><a className="social-button shape-circle sb-facebook sb-light-skin" href="#"><i className="socicon-facebook" /></a><a className="social-button shape-circle sb-twitter sb-light-skin" href="#"><i className="socicon-twitter" /></a><a className="social-button shape-circle sb-instagram sb-light-skin" href="#"><i className="socicon-instagram" /></a><a className="social-button shape-circle sb-google-plus sb-light-skin" href="#"><i className="socicon-googleplus" /></a>
                            </section>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Mobile App Buttons*/}
                            <section className="widget widget-light-skin">
                                <h3 className="widget-title">Participantes</h3>
                                <div className="imgIconos">
                                    <span><img src="http://www.utmachala.edu.ec/portalwp/wp-content/uploads/2015/08/LOGO_OUT.png" className="cat" alt="Responsive image" />
                                    <img src="https://i.ibb.co/2WM8XbH/lgo-fec-removebg-preview.png" className="cat" alt="Responsive image" />
                                    <img src="https://i.ibb.co/RNvQyFf/LOGO.png" className="cat" alt="Responsive image" /></span>
                                    
                                </div>
                                
{/*                                 <a className="market-button mb-light-skin" href="#"><span className="mb-title">UTMACH</span></a><a className="market-button google-button mb-light-skin" href="#"><span className="mb-subtitle">Download on the</span><span className="mb-title">Google Play</span></a><a className="market-button windows-button mb-light-skin" href="#"><span className="mb-subtitle">Download on the</span><span className="mb-title">Windows Store</span></a>
 */}                            </section>
                        </div>
                        <div className="col-lg-4 col-md-10">
                            {/* About Us*/}
                            <section className="widget widget-links widget-light-skin">
                                <h3 className="widget-title">Acerca de nosotros</h3>
                                <h5 style={{ color: 'white' }}>Esta plataforma web se ha creado con el fin de ayudar a los estudiantes de
                                la carrera de Ingeniería en Marketing ha encontrar empresas para la realización de sus prácticas pre profesionales</h5>

                                {/* <ul>
                                    <li><a href="#">Careers</a></li>
                                    <li><a href="#">About Unishop</a></li>
                                    <li><a href="#">Our Story</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Our Blog</a></li>
                                </ul> */}
                            </section>
                        </div>
                    </div>
                    <hr className="hr-light mt-2 margin-bottom-2x" />
                    <div className="row">
                        <div className="col-md-7 padding-bottom-1x" />
                        <div className="col-md-5 padding-bottom-1x">
                            <div className="margin-top-1x hidden-md-up" />
                            {/*Subscription*/}
                            <form className="subscribe-form" action="#" method="post" target="_blank" noValidate>
                                {/* <div className="clearfix">
                                    <div className="input-group input-light">
                                        <input className="form-control" type="email" name="EMAIL" placeholder="Your e-mail" /><span className="input-group-addon"><i className="icon-mail" /></span>
                                    </div>
                                </div><span className="form-text text-sm text-white opacity-50">Subscribe to our Newsletter to receive early discount offers, latest news, sales and promo information.</span> */}
                            </form>
                        </div>
                    </div>
                    {/* Copyright*/}
                    <p className="footer-copyright">© PRAXIS</p>
                </div>
            </footer>

        )
    }
}