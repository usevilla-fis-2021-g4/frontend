import React, {Component} from "react";

export default class Materia extends Component 
{
    render()
    {
        return (
            <tr>
                <td>{this.props.materia.nombre}</td>
                <td>{this.props.materia.descripcion}</td>
                <td>{this.props.materia.area}</td>
                <td>
                { (this.props.materia.editable === true || typeof this.props.materia.editable === 'undefined') ? <button className="btn btn-primary" onClick={() => this.props.onEdit(this.props.materia)} >Edit</button> : ""}
                    { (this.props.materia.editable === true || typeof this.props.materia.editable === 'undefined') ? <button className="btn btn-primary" onClick={() => this.props.onDelete(this.props.materia)} >Delete</button> : ""}
                    
                </td>
            </tr>
        );
    }
}