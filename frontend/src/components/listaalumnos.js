import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import Modalchoosejob from './modalchoosejob';
import config from '../metodos/config_session';

export default class Validateempleos extends Component {

    state = {
        alumnos: [],
        conectado: false,
        ruta_server: 'http://localhost:5000/public/usuarios/',
    }



    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/alum/listar_alumnos_disponibles', config);

        if (response.data.mensaje) {

            this.setState({ conectado: true, alumnos: this.state.alumnos.concat(response.data.datos) });

        } else {

            this.setState({ conectado: false });

        }


    }


    openmodal(usu_nombre, usu_codigo){
        $('#modaljobs').modal('show');
        $("#modal_nombre").html(usu_nombre);
        $("#modal_codigo").html(usu_codigo);

    }


    render() {

        $(document).ready(function () {
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
            }, 100);



        return (

            <div class="container mt-3 p-5" style={{ height: '100%' }}>
                <div className='container mt-5' style={{ height: '500px' }}>
                    <h6 style={{ textAlign: 'center' }}>Alumnos disponibles</h6>
                    <hr></hr>
                    <div id="mensajeconfirmacion" class="mt-3"></div>
                    
                    <table id="example" class="display">
                        <thead>
                            <tr>
                                <th className='text-center'>Foto</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Teléfono</th>
                                <th className='text-center'>Dirección</th>
                                <th className='text-center'>Pasantía preferida</th>
                                <th className='text-center' style={{ width: '100px' }}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.alumnos.map(alumnos => (
                                    <tr>
                                        <td ><img src={this.state.ruta_server + alumnos.usu_codigo + "/foto/" + alumnos.usu_foto} alt className="img-fluid d-block rounded" style={{ height: "70px", width: "70px" }} /></td>
                                        <td>{alumnos.usu_nombre}</td>
                                        <td>{alumnos.alum_descripcion}</td>
                                        <td>{alumnos.usu_telefono}</td>
                                        <td className='text-center'>{alumnos.usu_direccion}</td>
                                        <td className='text-center'>{alumnos.alum_d_pasantia}</td>
                                        <td className='text-center'><button type="button" title='Solicitar alumno' class="btn btn-success btn-sm" data-toggle="modal" data-target="#modaljobs" id="submit" onClick={()=> this.openmodal(alumnos.usu_nombre, alumnos.usu_codigo)}><i class="fa fa-check" aria-hidden="true"></i></button>
                                            <Modalchoosejob />
                                            <a href={"/profile/" + alumnos.usu_codigo} ><button type="button" class="btn btn-primary btn-sm" title='Ver perfil alumno'><i class="fa fa-eye" aria-hidden="true"></i></button></a>
                                            <a href={this.state.ruta_server + alumnos.usu_codigo + "/cv/" + alumnos.alum_cv} target="_blank"><button type="button" class="btn btn-info btn-sm" title='Ver CV'><i class="fa fa-book" aria-hidden="true"></i></button></a></td>
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
