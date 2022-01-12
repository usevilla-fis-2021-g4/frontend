import React, {Component} from "react";
import { FaSave, FaBan } from "react-icons/fa";

export default class EditEstudiante extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event)
    {
        // console.log("EditEstudiante handleChange");
        this.props.onChange({...this.props.Estudiante, [event.target.name]: event.target.value}); 
    }

    render()
    {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" name="identificacion" value={this.props.Estudiante.identificacion} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="nombre" value={this.props.Estudiante.nombre} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="password" name="password" value={this.props.Estudiante.password} onChange={this.handleChange} />
                </td>
                <td>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onSave(this.props.Estudiante)} title="Guardar" > <FaSave /> </button>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onCancel(this.props.Estudiante)} title="Cancel" >  <FaBan />  </button>
                </td>
            </tr>
        );
    }
}