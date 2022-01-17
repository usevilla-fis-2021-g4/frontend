import React, {Component} from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import ImagenIdentificacion from "./ImagenIdentificacion";
import SubirArchivoAS3 from "./SubirArchivoAS3";

export default class Estudiante extends Component 
{
    render()
    {
        return (
            <tr>
                <td>{this.props.estudiante.identificacion}</td>
                <td>{this.props.estudiante.nombre}</td>
                <td>******</td>
                <td>
                    { (this.props.estudiante.editable === true || typeof this.props.estudiante.editable === 'undefined') ? <button className="btn btn-outline-secondary" onClick={() => this.props.onEdit(this.props.estudiante)} title="Editar" > <BsFillPencilFill /> </button> : ""}
                    { (this.props.estudiante.editable === true || typeof this.props.estudiante.editable === 'undefined') ? <button className="btn btn-outline-secondary" onClick={() => this.props.onDelete(this.props.estudiante)} title="Eliminar" ><BsFillTrashFill /> </button> : ""}
                    { (this.props.estudiante.editable === true || typeof this.props.estudiante.editable === 'undefined') ? <SubirArchivoAS3 estudiante={this.props.estudiante} onImageAdded={this.props.onImageAdded} /> : ""}
                    { (this.props.estudiante.editable === true || typeof this.props.estudiante.editable === 'undefined') ? <ImagenIdentificacion estudiante={this.props.estudiante} /> : ""}
                </td>
            </tr>
        );
    }
}