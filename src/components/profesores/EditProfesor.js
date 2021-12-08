import React, {Component} from "react";

export default class EditProfesor extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event)
    {
        // console.log("EditProfesor handleChange");
        this.props.onChange({...this.props.profesor, [event.target.name]: event.target.value}); 
    }

    render()
    {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" name="identificacion" value={this.props.profesor.identificacion} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="nombre" value={this.props.profesor.nombre} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="password" name="password" value={this.props.profesor.password} onChange={this.handleChange} />
                </td>
                <td>
                    <button className="btn btn-primary" onClick={() => this.props.onSave(this.props.profesor)} >Save</button>
                    <button className="btn btn-primary" onClick={() => this.props.onCancel(this.props.profesor)} >Cancel</button>
                </td>
            </tr>
        );
    }
}