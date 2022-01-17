import React, {Component} from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import ImagenIdentificacion from "./ImagenIdentificacion";
import SubirArchivoAS3 from "./SubirArchivoAS3";

export default class Nota extends Component{
    render(){
        return (
            <tr>
                <td>{this.props.nota.alumno}</td>
                <td>{this.props.nota.asignatura}</td>
                <td>{this.props.nota.nota}</td>
                <td>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onEdit(this.props.nota)} title="Editar" > <BsFillPencilFill /> </button> 
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onDelete(this.props.nota)} title="Eliminar" ><BsFillTrashFill /> </button>
                    <SubirArchivoAS3 nota={this.props.nota} onImageAdded={this.props.onImageAdded} />
                    <ImagenIdentificacion nota={this.props.nota} /> 
                </td>
            </tr>
        );
    }
}