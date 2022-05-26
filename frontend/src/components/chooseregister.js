import React, { Component } from 'react'



export default class main extends Component {


    render() {

        return (

            <div class="m-0 vh-100 row justify-content-center align-items-center">
                <div class="col-auto p-5 text center">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card text-center">
                                <a href="/registerstudent"> <img class="card-img-top"  src="https://imagenes.elpais.com/resizer/1o1Mhv-_HC1MCqh75DQmoaDsBZc=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/A6IQ62G4UNCYDPZ7MVSTQI4SMU.jpg" alt="" /></a> 
                                <div class="card-body">
                                    <h5 class="card-title">Registrarse como estudiante</h5>
                                    <p class="card-text">Soy alumno en busca de una empresa para realizar prácticas pre profesionales.</p>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-6">
                            <div class="card text-center">
                                <a href="/registeremp"><img class="card-img-top" src="https://www.aval.ec/wp-content/uploads/2018/12/aval.jpg"  alt="Card  cap" /></a> 
                                <div class="card-body">
                                    <h5 class="card-title">Registrarse como empresa</h5>
                                    <p class="card-text">Soy una empresa en busqueda de pasantes que deseen realizar prácticas pre profesionales. </p>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        )

    }
}
