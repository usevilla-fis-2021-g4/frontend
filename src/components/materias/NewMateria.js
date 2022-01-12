import React, {Component} from "react";

export default class NewMateria extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            nombre:"", 
            descripcion:"", 
            area:"",
            
        };

        this.changeMateria = this.changeMateria.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeMateria(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd()
    {
        this.props.onAddMateria(this.state);
        this.setState({
            nombre:"", 
            descripcion:"", 
            area:"",
        });
    }


    render()
    {
        return (
            <table className="table table-bordered table-striped table-hover" >
                <thead>
                    <tr colSpan="3">
                        <th>Nueva Materia</th>
                    </tr>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Area</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="form-control" type="text" name="nombre" value={this.state.nombre} onChange={this.changeMateria} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="descripcion" value={this.state.descripcion} onChange={this.changeMateria} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="area" value={this.state.area} onChange={this.changeMateria} />
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={this.clickAdd} >Agregar Materia</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}