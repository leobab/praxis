import React, { Component } from 'react'
import { If, Else } from 'react-if';
import axios from 'axios'
import { Link } from 'react-router-dom'
import $ from 'jquery';

import config from '../metodos/config_session';

export default class Validatestudent extends Component {

    state = {
        estudiantes_validar: [],
        conectado: false
    }



    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/alum/listar_alumnos', config);

        if (response.data.mensaje) {

            this.setState({ conectado: true, estudiantes_validar: this.state.estudiantes_validar.concat(response.data.datos) });

        } else {

            this.setState({ conectado: false });

        }


    }

    async eliminar(alum_codigo_enviado) {
        const response = await axios.post('http://localhost:5000/alum/eliminar_alumno', {
            alum_codigo: alum_codigo_enviado
        }, config);

        if (response.data.mensaje) {

            window.location.href = "/validatestudent";

        }else{
            var container = document.getElementById("containerErrores");
            var el = document.createElement("div");
            el.className = "alert alert-danger alert-dismissible fade show";
            el.role = "alert";
            el.innerHTML = "Error al borrar estudiante. <button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span></button>";
            container.append(el);
            
        }
    }

    render() {

        $(document).ready(function () {
            setTimeout(function () {
                $('#example').DataTable({
                    "bDestroy": "true",
                    "language": {
                        "decimal": ",",
                        "thousands": ".",
                        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "infoPostFix": "",
                        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "loadingRecords": "Cargando...",
                        "lengthMenu": "Mostrar _MENU_ registros",
                        "paginate": {
                            "first": "Primero",
                            "last": "Último",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        },
                        "processing": "Procesando...",
                        "search": "Buscar:",
                        "searchPlaceholder": "Término de búsqueda",
                        "zeroRecords": "No se encontraron resultados",
                        "emptyTable": "Ningún dato disponible en esta tabla",
                        "aria": {
                            "sortAscending":  ": Activar para ordenar la columna de manera ascendente",
                            "sortDescending": ": Activar para ordenar la columna de manera descendente"
                        },
                }});
            }, 350);
        });


        return (

            <div class="container mt-3 p-5" style={{ height: '100%' }}>
                <div className='container mt-5' style={{ height: '500px' }}>
                    <h6 style={{ textAlign: 'center' }}>Alumnos por validar</h6>
                    <hr></hr>
                    <div id="containerErrores" class="mt-3"></div>
                    <table id="example" class="display">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th className='text-center'>Dirección</th>
                                <th className='text-center'>Teléfono</th>
                                <th className='text-center' style={{ width: '100px' }}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.estudiantes_validar.map(estudiantes_validar => (
                                    <tr>
                                        <td>{estudiantes_validar.usu_nombre}</td>
                                        <td>{estudiantes_validar.usu_correo}</td>
                                        <td className='text-center'>{estudiantes_validar.usu_direccion}</td>
                                        <td className='text-center'>{estudiantes_validar.usu_telefono}</td>
                                        <td className='text-center'><button type="button" onClick={() => this.eliminar(estudiantes_validar.usu_codigo)} title='Eliminar estudiante' class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>



        )
    }

}
