import React, {Component} from "react";

export default class Profesor extends Component 
{
    render()
    {
        return (
            <tr>
                <td>identificacion: {this.props.profesor.identificacion}</td>
                <td>nombre: {this.props.profesor.nombre}</td>
                <td>editable: {this.props.profesor.editable ? 'SI': 'NO'}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => this.props.onEdit(this.props.profesor)} >Edit</button>
                </td>
            </tr>
        );
    }
}