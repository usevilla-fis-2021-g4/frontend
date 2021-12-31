import React, {Component} from "react";
import { BsArrowClockwise, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";
import ProfesoresApi from './ProfesoresApi';

export default class NewProfesor extends Component 
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

        this.changeProfesor = this.changeProfesor.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.generarPassword = this.generarPassword.bind(this);
        this.mostrarPassword = this.mostrarPassword.bind(this);
        this.ocultarPassword = this.ocultarPassword.bind(this);
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
            password:"",
            mostrarPassword: false
        });
    }

    generarPassword()
    {
        console.log("generarPassword");

        ProfesoresApi.getNewPassword().then(
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
                            <div className="input-group">
                                <input className="form-control" type={this.state.mostrarPassword ? "text" : "password"} name="password" value={this.state.password} onChange={this.changeProfesor} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" title="Generar" onClick={this.generarPassword}> <BsArrowClockwise /> </button>
                                    <button className={this.state.mostrarPassword ? "btn btn-outline-secondary d-none" : "btn btn-outline-secondary"} type="button" title="Mostrar" onClick={this.mostrarPassword}> <BsFillEyeFill /> </button>
                                    <button className={this.state.mostrarPassword ? "btn btn-outline-secondary" : "btn btn-outline-secondary d-none"} type="button" title="Ocultar" onClick={this.ocultarPassword}> <BsFillEyeSlashFill /> </button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <button className="btn btn-outline-secondary" onClick={this.clickAdd} title="Agregar Profesor" > <FaPlusSquare/></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}