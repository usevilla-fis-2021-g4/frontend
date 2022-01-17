import React, {Component} from "react";
import { FaSave, FaBan } from "react-icons/fa";

export default class EditNota extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.props.onChange({...this.props.nota, [event.target.name]: event.target.value}); 
    }

    render()
    {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" name="alumno" value={this.props.nota.alumno} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="asignatura" value={this.props.nota.asignatura} onChange={this.handleChange} />
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