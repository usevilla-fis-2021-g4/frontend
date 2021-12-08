import React, {Component} from "react";

export default class Profesor extends Component 
{
    render()
    {
        return (
            <tr>
                <td>{this.props.profesor.identificacion}</td>
                <td>{this.props.profesor.nombre}</td>
                <td>******</td>
                <td>
                    <button className="btn btn-primary" onClick={() => this.props.onEdit(this.props.profesor)} >Edit</button>
                    <button className="btn btn-primary" onClick={() => this.props.onDelete(this.props.profesor)} >Delete</button>
                </td>
            </tr>
        );
    }
}