import React, {Component} from "react";
import { FaPlusSquare } from "react-icons/fa";

export default class NewNota extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            alumno:"", 
            asignatura:"", 
            nota:""
        };

        this.estudiantes = this.props.estudiante || [];
        this.materias = this.props.materias || [];

        this.changeNota = this.changeNota.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeNota(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd(){
        this.props.onAddNota(this.state);
        this.setState({
            alumno:"", 
            asignatura:"", 
            nota:""
        });
    }

    render(){
        return (
            <table className="table table-bordered table-striped table-hover" >
                <thead>
                    <tr colSpan="3">
                        <th>Nueva Nota</th>
                    </tr>
                    <tr>
                        <th>Alumno</th>
                        <th>Asignatura</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select  name="alumno" className="form-control" plaeholder="Seleccione un estudiante" onChange={this.changeNota}>
                                <option value="0" key={0}>Seleccione un estudiante</option>
                                {
                                    this.estudiantes.map((estudiante)=> (
                                         <option key={estudiante._id} value={estudiante.nombre} > {estudiante.nombre} </option>
                                    ))
                                }
                            </select>
                        </td>
                        <td>
                            <select  name="asignatura" className="form-control" plaeholder="Seleccione un Materia" onChange={this.changeNota}>
                                <option value="0" key={0}>Seleccione una Materia</option>
                                {
                                    this.materias.map((materia)=> (
                                         <option key={materia._id} value={materia.nombre} > {materia.nombre} </option>
                                    ))
                                }
                            </select>
                        </td>
                        {/* <td>
                            <input className="form-control" type="text" name="alumno" value={this.state.alumno} onChange={this.changeNota} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="asignatura" value={this.state.asignatura} onChange={this.changeNota} />
                        </td> */}
                        <td>
                            <input className="form-control" type="text" name="nota" value={this.state.nota} onChange={this.changeNota} />
                        </td>
                        <td>
                            <button className="btn btn-outline-secondary" onClick={this.clickAdd} title="Añadir Nota" > <FaPlusSquare/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}