import React, {Component} from "react";

import Profesor from './Profesor';
import Alert from './Alert';

export default class Profesores extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            profesorSeleccionado: null
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
    }

    handleEdit(profesor)
    {
        this.setState({
            profesorSeleccionado: profesor.nombre
        });
    }

    handleCloseError()
    {
        this.setState({
            profesorSeleccionado: null
        });
    }

    render()
    {
    
        const profesores = [
            {
                _id: 1,
                identificacion: "777777",
                nombre: "Some One",
                password: "123456",
                editable: true
            },
            {
                _id: 2,
                identificacion: "888888",
                nombre: "Some Two XD",
                password: "123456",
                editable: true
            }
        ];

        return (
            <div>
                <Alert message={this.state.profesorSeleccionado} onClose={this.handleCloseError} />

                <table className="table" >
                    <thead>
                        <tr>
                            <th>identificacion</th>
                            <th>nombre</th>
                            <th>editable</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profesores.map(profesor => {
                            return <Profesor profesor={profesor} onEdit={this.handleEdit} key={profesor._id} />
                        })}
                        
                    </tbody>
                </table>
                
            </div>
        );

    }

    /*

    state = {
        profesores: []
    }

    async componentDidMount(){
        //var url = 'https://api-usevilla-fis-2021-g4-juancarlosestradanieto.cloud.okteto.net/api/v1/profesores';
        var url = 'http://localhost:3000/api/v1/profesores';
        const response = await fetch(url, {
	        'mode': 'cors',
	        'headers': {
            	'Access-Control-Allow-Origin': '*',
        	}
    	});
        const data = await response.json();
        console.log(data);
        this.setState({profesores: data});
    }
    
    render()
    {
        return (
            <div>
                <h5>Profesores Registrados</h5>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>identificacion</th>
                            <th>nombre</th>
                            <th>editable</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.profesores.map(profesor => {
                            return (
                                <tr key="{profesor.identificacion}">
                                    <td>{profesor.identificacion}</td>
                                    <td>{profesor.nombre}</td>
                                    <td>{profesor.editable}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

            </div>
        );
    }
    */
}
    
