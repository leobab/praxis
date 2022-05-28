import React, { Component } from 'react'
import { If, Else } from 'react-if';
import axios from 'axios'
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Modalchangepass from './modalcambiarpass';

import config from '../metodos/config_session';

export default class Validate_admin extends Component {

    state = {
        admin_validar: [],
        conectado: false
    }



    async componentDidMount() {
        const response = await axios.get('http://localhost:5000/usuario/listar_admin', config);
        if (response.data.mensaje) {
            this.setState({ conectado: true, admin_validar: this.state.admin_validar.concat(response.data.datos) });
        } else {
            this.setState({ conectado: false });
        }

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
                    "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sortDescending": ": Activar para ordenar la columna de manera descendente"
                },
            }
        });

    }

    /* async validar(validar_empresa) {
        const response = await axios.post('http://localhost:5000/usuario/validar_admin', {
            emp_codigo: emp_codigo_enviado
        }, config);

        if (response.data.mensaje) {

            window.location.href = "/admin_validate";

        }else{
            var container = document.getElementById("containerErrores");
            var el = document.createElement("div");
            el.className = "alert alert-danger alert-dismissible fade show";
            el.role = "alert";
            el.innerHTML = "Error al validar empresa. <button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span></button>";
            container.append(el);
        }
    } */

    async eliminar(usu_codigo_admin, usu_nombre_admin) {
        const response = await axios.post('http://localhost:5000/usuario/eliminar_admin', {
            usu_codigo: usu_codigo_admin,
            usu_nombre: usu_nombre_admin
        }, config);

        if (response.data.mensaje) {

            window.location.href = "/admin_validate";

        } else {
            var container = document.getElementById("containerErrores");
            var el = document.createElement("div");
            el.className = "alert alert-danger alert-dismissible fade show";
            el.role = "alert";
            el.innerHTML = "Error al borrar admin. <button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span></button>";
            container.append(el);
        }
    }

    render() {

        return (

            <div class="container mt-3 p-5" style={{ height: '100%' }}>
                <div className='container mt-5' style={{ height: '500px' }}>
                    <h6 style={{ textAlign: 'center' }}>Cuentas de administrador</h6>
                    <hr></hr>
                    <button type="button" class="btn btn-success">Crear administrador</button>
                    <div id="containerErrores" class="mt-3"></div>
                    <table id="example" class="display">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Correo</th>
                                <th>Nombre</th>
                                <th className='text-center'>Cédula</th>
                                <th className='text-center'>Teléfono</th>
                                <th className='text-center' style={{ width: '100px' }}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.admin_validar.map(admin_validar => (
                                    <tr>
                                        <td>{admin_validar.usu_codigo}</td>
                                        <td>{admin_validar.usu_correo}</td>
                                        <td>{admin_validar.usu_nombre}</td>
                                        <td className='text-center'>{admin_validar.usu_cedula_ruc}</td>
                                        <td className='text-center'>{admin_validar.usu_telefono}</td>
                                        <td className='text-center'><button type="button" onClick={() => this.eliminar(admin_validar.usu_codigo, admin_validar.usu_nombre)} title='Eliminar admin' class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                        




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
