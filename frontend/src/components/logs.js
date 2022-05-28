import React, { Component } from 'react'
import { If, Else, Then} from 'react-if';
import config from '../metodos/config_session';
import axios from 'axios';
import Conectadofalse from './conectadofalse';
import $ from 'jquery';

export default class logs extends Component {

    state = {
        logs_lista: [],
        conectado: false
    }

    async componentDidMount() {

        const responseSesion = await axios.get('http://localhost:5000/usuario/ver_sesion', config);

        if (responseSesion.data.mensaje) {

            this.setState({ conectado: true });

        } else {

            this.setState({ conectado: false });

        }

        const response = await axios.get('http://localhost:5000/logs/lista', config);

        if (response.data.mensaje) {

            this.setState({ logs_lista: this.state.logs_lista.concat(response.data.datos) });

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


    render(){

        return(
            <If condition={this.state.conectado}>
                <Then>
                    <div class="container mt-3 p-5" style={{ height: '100%' }}>
                        <div className='container mt-5' style={{ height: '1000px' }}>
                            <h6 style={{ textAlign: 'center' }}>Historial de actividades de la página</h6>
                            <hr></hr> 

                            <table id="example" class="display">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th className='text-center'>Descripción Actividad</th>
                                        <th className='text-center'>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.logs_lista.map(logs_lista => (
                                            <tr>
                                                <td>{logs_lista.log_codigo}</td>
                                                <td className='text-center'>{logs_lista.log_descripcion}</td>
                                                <td className='text-center'>{logs_lista.log_fecha}</td>
                                                
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