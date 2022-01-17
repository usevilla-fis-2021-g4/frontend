import React, {Component} from "react";
import { BsArrowClockwise, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";
import EstudiantesApi from './EstudiantesApi';

export default class NewEstudiante extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            identificacion:"", 
            nombre:""
        };

        this.changeEstudiante = this.changeEstudiante.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeEstudiante(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd()
    {
        this.props.onAddEstudiante(this.state);
        this.setState({
            identificacion:"", 
            nombre:""
        });
    }


    render()
    {
        return (
            <table className="table table-bordered table-striped table-hover" >
                <thead>
                    <tr colSpan="3">
                        <th>Nuevo Estudiante</th>
                    </tr>
                    <tr>
                        <th>identificacion</th>
                        <th>nombre</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="form-control" type="text" name="identificacion" value={this.state.identificacion} onChange={this.changeEstudiante} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="nombre" value={this.state.nombre} onChange={this.changeEstudiante} />
                        </td>
                    
                        <td>
                            <button className="btn btn-outline-secondary" onClick={this.clickAdd} title="Agregar Estudiante" > <FaPlusSquare/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}