import React, {Component} from "react";

export default class EditMateria extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event)
    {
        // console.log("EditMateria handleChange");
        this.props.onChange({...this.props.materia, [event.target.name]: event.target.value}); 
    }

    render()
    {
        return (
            <tr>
                <td>
                    <input className="form-control" type="text" name="nombre" value={this.props.materia.nombre} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="descripcion" value={this.props.materia.descripcion} onChange={this.handleChange} />
                </td>
                <td>
                    <input className="form-control" type="text" name="area" value={this.props.materia.area} onChange={this.handleChange} />
                </td>
                <td>
                    <button className="btn btn-primary" onClick={() => this.props.onSave(this.props.materia)} >Save</button>
                    <button className="btn btn-primary" onClick={() => this.props.onCancel(this.props.materia)} >Cancel</button>
                </td>
            </tr>
        );
    }
}