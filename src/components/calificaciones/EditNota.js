import React, { Component } from "react";
import { FaSave, FaBan } from "react-icons/fa";

export default class EditNota extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log(event);
        this.props.onChange({ ...this.props.nota, [event.target.name]: event.target.value });
    }

    render() {
        return (
            <tr>
                <td>
                    <select name="alumno" className="form-control" value={this.props.nota.alumno} placeholder="Seleccione un estudiante" onChange={this.handleChange}>
                        {
                            this.props.estudiantes.map((estudiante) => (
                                <option key={estudiante._id} value={estudiante.nombre} > {estudiante.nombre} </option>
                            ))
                        }
                    </select>
                </td>
                <td>
                    <select name="asignatura" className="form-control"  value={this.props.nota.asignatura} placeholder="Seleccione un Materia" onChange={this.handleChange}>
                        {
                            this.props.materias.map((materia) => (
                                <option key={materia._id} value={materia.nombre} > {materia.nombre} </option>
                            ))
                        }
                    </select>
                </td>
                <td>
                    <input className="form-control" type="text" name="nota" value={this.props.nota.nota} onChange={this.handleChange} />
                </td>
                <td>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onSave(this.props.nota)} title="Guardar" > <FaSave /> </button>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onCancel(this.props.nota)} title="Cancel" >  <FaBan />  </button>
                </td>
            </tr>
        );
    }
}