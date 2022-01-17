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
        this.props.onChange({...this.props.estudiante, [event.target.name]: event.target.value}); 
    }

    render()
    {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" name="identificacion" value={this.props.estudiante.identificacion} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="nombre" value={this.props.estudiante.nombre} onChange={this.handleChange} />
                </td>
                
                <td>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onSave(this.props.estudiante)} title="Guardar" > <FaSave /> </button>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.onCancel(this.props.estudiante)} title="Cancel" >  <FaBan />  </button>
                </td>
            </tr>
        );
    }
}