import React, {Component} from "react";

export default class Profesores extends Component {

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
}
    
