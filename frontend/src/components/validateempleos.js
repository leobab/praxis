import React, { Component } from 'react'
import { If, Else, Then} from 'react-if';
import axios from 'axios'
import Conectadofalse from './conectadofalse';
import $ from 'jquery';

import config from '../metodos/config_session';

export default class Validateempleos extends Component {

    state = {
        empleos_validar: [],
        conectado: false
    }



    async componentDidMount() {

        const responseSesion = await axios.get('http://localhost:5000/usuario/ver_sesion', config);

        if (responseSesion.data.mensaje) {

            this.setState({ conectado: true });

        } else {

            this.setState({ conectado: false });

        }

        const response = await axios.get('http://localhost:5000/empleo/listar_todos_empleos', config);

        if (response.data.mensaje) {

            this.setState({ empleos_validar: this.state.empleos_validar.concat(response.data.datos) });

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
                    "sortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sortDescending": ": Activar para ordenar la columna de manera descendente"
                },
        }});


    }

    async eliminar(job_codigo_enviado) {
        const response = await axios.post('http://localhost:5000/empleo/eliminar_empleo', {
            job_codigo: job_codigo_enviado
        }, config);

        if (response.data.mensaje) {

            window.location.href = "/validateempleo";

        }else{
            var container = document.getElementById("containerErrores");
            var el = document.createElement("div");
            el.className = "alert alert-danger alert-dismissible fade show";
            el.role = "alert";
            el.innerHTML = "Error al borrar empleo. <button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span></button>";
            container.append(el);
        }
    }

    render() {


        return (
            <If condition={this.state.conectado}>
                <Then>
                    <div class="container mt-3 p-5" style={{ height: '100%' }}>
                        <div className='container mt-5' style={{ height: '500px' }}>
                            <h6 style={{ textAlign: 'center' }}>Empleos por validar</h6>
                            <hr></hr>
                            <div id="containerErrores" class="mt-3"></div>
                            <table id="example" class="display">
                                <thead>
                                    <tr>
                                        <th>Empleo</th>
                                        <th>Empresa</th>
                                        <th className='text-center'>Área</th>
                                        <th className='text-center'>Ubicación</th>
                                        <th className='text-center'>Fecha creación</th>
                                        <th className='text-center' style={{ width: '100px' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.empleos_validar.map(empleos_validar => (
                                            <tr>
                                                <td>{empleos_validar.job_titulo}</td>
                                                <td>{empleos_validar.nombre_empresa}</td>
                                                <td className='text-center'>{empleos_validar.job_area}</td>
                                                <td className='text-center'>{empleos_validar.job_ubicacion}</td>
                                                <td className='text-center'>{empleos_validar.job_fecha_creacion}</td>
                                                <td className='text-center'><button type="button" onClick={() => this.eliminar(empleos_validar.job_codigo)} title='Eliminar empleo' class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Then>
                <Else>
                    <Conectadofalse />
                </Else>
                
            </If>
            
        )
    }

}
