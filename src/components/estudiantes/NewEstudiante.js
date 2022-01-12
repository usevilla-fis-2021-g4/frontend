import React, {Component} from "react";
import { BsArrowClockwise, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";
import EstudiantesApi from './EstudiantesApi';

export default class NewEstudiante extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            identificacion:"", 
            nombre:"", 
            password:"",
            mostrarPassword: false
        };

        this.changeEstudiante = this.changeEstudiante.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.generarPassword = this.generarPassword.bind(this);
        this.mostrarPassword = this.mostrarPassword.bind(this);
        this.ocultarPassword = this.ocultarPassword.bind(this);
    }

    changeEstudiante(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd()
    {
        this.props.onAddEstudiante(this.state);
        this.setState({
            identificacion:"", 
            nombre:"", 
            password:"",
            mostrarPassword: false
        });
    }

    generarPassword()
    {
        console.log("generarPassword");

        EstudiantesApi.getNewPassword().then(
            (result) => {
                console.log(result);
                
                this.setState({
                    password: result.password
                });
            },
            (error) => {
                /*
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
                */
            }
        );
    }

    mostrarPassword()
    {
        console.log("mostrarPassword");
        this.setState({
            mostrarPassword: true
        });
    }


    ocultarPassword()
    {
        console.log("ocultarPassword");
        this.setState({
            mostrarPassword: false
        });
    }

    render()
    {
        return (
            <table className="table table-bordered table-striped table-hover" >
                <thead>
                    <tr colSpan="3">
                        <th>Nuevo Estudiante</th>
                    </tr>
                 
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="form-control" type="text" name="identificacion" value={this.state.identificacion} onChange={this.changeEstudiante} />
                        </td>
                        <td>
                            <input className="form-control" type="text" name="nombre" value={this.state.nombre} onChange={this.changeEstudiante} />
                        </td>
                        <td>
                            <div className="input-group">
                                <input className="form-control" type={this.state.mostrarPassword ? "text" : "password"} name="password" value={this.state.password} onChange={this.changeEstudiante} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" title="Generar" onClick={this.generarPassword}> <BsArrowClockwise /> </button>
                                    <button className={this.state.mostrarPassword ? "btn btn-outline-secondary d-none" : "btn btn-outline-secondary"} type="button" title="Mostrar" onClick={this.mostrarPassword}> <BsFillEyeFill /> </button>
                                    <button className={this.state.mostrarPassword ? "btn btn-outline-secondary" : "btn btn-outline-secondary d-none"} type="button" title="Ocultar" onClick={this.ocultarPassword}> <BsFillEyeSlashFill /> </button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <button className="btn btn-outline-secondary" onClick={this.clickAdd} title="Agregar Estudiante" > <FaPlusSquare/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}