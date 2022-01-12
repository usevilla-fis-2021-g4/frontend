import React, {Component} from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import ImagenIdentificacion from "./ImagenIdentificacion";
import SubirArchivoAS3 from "./SubirArchivoAS3";

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
                    { (this.props.profesor.editable === true || typeof this.props.profesor.editable === 'undefined') ? <button className="btn btn-outline-secondary" onClick={() => this.props.onEdit(this.props.profesor)} title="Editar" > <BsFillPencilFill /> </button> : ""}
                    { (this.props.profesor.editable === true || typeof this.props.profesor.editable === 'undefined') ? <button className="btn btn-outline-secondary" onClick={() => this.props.onDelete(this.props.profesor)} title="Eliminar" ><BsFillTrashFill /> </button> : ""}
                    { (this.props.profesor.editable === true || typeof this.props.profesor.editable === 'undefined') ? <SubirArchivoAS3 profesor={this.props.profesor} onImageAdded={this.props.onImageAdded} /> : ""}
                    { (this.props.profesor.editable === true || typeof this.props.profesor.editable === 'undefined') ? <ImagenIdentificacion profesor={this.props.profesor} /> : ""}
                </td>
            </tr>
        );
    }
}