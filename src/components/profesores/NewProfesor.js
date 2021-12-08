import React, {Component} from "react";

export default class NewProfesor extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            identificacion:"", 
            nombre:"", 
            password:"", 
        };

        this.changeProfesor = this.changeProfesor.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeProfesor(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd()
    {
        this.props.onAddProfesor(this.state);
        this.setState({
            identificacion:"", 
            nombre:"", 
            password:""
        });
    }

    render()
    {
        return (
            <table className="table table-bordered table-striped table-hover" >
                <thead>
                    <tr colSpan="3">
                        <th>Nuevo Profesor</th>
                    </tr>
                    <tr>
                        <th>identificacion</th>
                        <th>nombre</th>
                        <th>password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="form-control" type="text" name="identificacion" value={this.state.identificacion} onChange={this.changeProfesor} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="nombre" value={this.state.nombre} onChange={this.changeProfesor} />
                        </td>
                        <td>
                            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.changeProfesor} />
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={this.clickAdd} >Agregar Profesor</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}