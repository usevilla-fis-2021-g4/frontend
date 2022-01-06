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
                <td>{this.props.Estudiante.identificacion}</td>
                <td>{this.props.Estudiante.nombre}</td>
                <td>******</td>
                <td>
                    { (this.props.Estudiante.editable === true || typeof this.props.Estudiante.editable === 'undefined') ? <button className="btn btn-outline-secondary" onClick={() => this.props.onEdit(this.props.Estudiante)} title="Editar" > <BsFillPencilFill /> </button> : ""}
                    { (this.props.Estudiante.editable === true || typeof this.props.Estudiante.editable === 'undefined') ? <button className="btn btn-outline-secondary" onClick={() => this.props.onDelete(this.props.Estudiante)} title="Eliminar" ><BsFillTrashFill /> </button> : ""}
                    { (this.props.Estudiante.editable === true || typeof this.props.Estudiante.editable === 'undefined') ? <SubirArchivoAS3 Estudiante={this.props.Estudiante} onImageAdded={this.props.onImageAdded} /> : ""}
                    { (this.props.Estudiante.editable === true || typeof this.props.Estudiante.editable === 'undefined') ? <ImagenIdentificacion Estudiante={this.props.Estudiante} /> : ""}
                </td>
            </tr>
        );
    }
}