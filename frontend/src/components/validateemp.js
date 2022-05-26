import React, { Component } from 'react'
import { If, Else } from 'react-if';
import axios from 'axios'
import { Link } from 'react-router-dom'
import $ from 'jquery';

import config from '../metodos/config_session';

export default class Validateemp extends Component {

    state = {
        empresas_validar: [],
        conectado: false
    }



    async componentDidMount() {

        const response = await axios.get('http://localhost:5000/emp/listar_empresas', config);

        if (response.data.mensaje) {

            this.setState({ conectado: true, empresas_validar: this.state.empresas_validar.concat(response.data.datos) });

        } else {

            this.setState({ conectado: false });

        }


    }

    async validar(emp_codigo_enviado) {
        const response = await axios.post('http://localhost:5000/emp/validar_empresa', {
            emp_codigo: emp_codigo_enviado
        }, config);

        if (response.data.mensaje) {

            window.location.href = "/validateemp";

        }else{
            var container = document.getElementById("containerErrores");
            var el = document.createElement("div");
            el.className = "alert alert-danger alert-dismissible fade show";
            el.role = "alert";
            el.innerHTML = "Error al validar empresa. <button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span></button>";
            container.append(el);
        }
    }

    async eliminar(emp_codigo_enviado) {
        const response = await axios.post('http://localhost:5000/emp/eliminar_empresa', {
            emp_codigo: emp_codigo_enviado
        }, config);

        if (response.data.mensaje) {

            window.location.href = "/validateemp";

        }else{
            var container = document.getElementById("containerErrores");
            var el = document.createElement("div");
            el.className = "alert alert-danger alert-dismissible fade show";
            el.role = "alert";
            el.innerHTML = "Error al borrar empresa. <button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span></button>";
            container.append(el);
        }
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
                    <h6 style={{ textAlign: 'center' }}>Empresas por validar</h6>
                    <hr></hr>
                    <div id="containerErrores" class="mt-3"></div>
                    <table id="example" class="display">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th className='text-center'>Ubicación</th>
                                <th className='text-center'>Convenio</th>
                                <th className='text-center'>Estado</th>
                                <th className='text-center' style={{ width: '100px' }}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.empresas_validar.map(empresas_validar => (
                                    <tr>
                                        <td>{empresas_validar.usu_nombre}</td>
                                        <td>{empresas_validar.emp_descripcion}</td>
                                        <td>{empresas_validar.emp_categoria}</td>
                                        <td className='text-center'>{empresas_validar.usu_direccion}</td>
                                        <td className='text-center'>{empresas_validar.emp_convenio}</td>
                                        <td className='text-center'>{empresas_validar.emp_estado}</td>
                                        <If condition={empresas_validar.emp_estado === 'NO VALIDADO'}>
                                            
                                            <td className='text-center'><button type="button" onClick={() => this.validar(empresas_validar.usu_codigo)} title='Validar empresa' class="btn btn-success btn-sm"><i class="fa fa-check" aria-hidden="true"></i></button>
                                            <button type="button" onClick={() => this.eliminar(empresas_validar.usu_codigo)} title='Eliminar empresa' class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                        </If>
                                        <If condition={empresas_validar.emp_estado === 'VALIDADO'}>
                                            
                                            <td className='text-center'><button type="button" onClick={() => this.eliminar(empresas_validar.usu_codigo)} title='Eliminar empresa' class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                        </If>




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
