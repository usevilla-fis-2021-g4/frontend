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
                { (this.props.profesor.editable === true || typeof this.props.profesor.editable === 'undefined') ? <button className="btn btn-primary" onClick={() => this.props.onEdit(this.props.profesor)} >Edit</button> : ""}
                    { (this.props.profesor.editable === true || typeof this.props.profesor.editable === 'undefined') ? <button className="btn btn-primary" onClick={() => this.props.onDelete(this.props.profesor)} >Delete</button> : ""}
                    
                </td>
            </tr>
        );
    }
}