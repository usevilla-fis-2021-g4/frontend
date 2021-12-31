import React, {Component} from "react";

import Profesor from './Profesor';
import Alert from './Alert';
import NewProfesor from './NewProfesor';
import EditProfesor from './EditProfesor';
import ProfesoresApi from './ProfesoresApi';

export default class Profesores extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            errorInfo: null,
            profesores: [],
            isEditing: {}
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addProfesor = this.addProfesor.bind(this);

        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleImageAdded = this.handleImageAdded.bind(this);
    }

    componentDidMount()
    {
        ProfesoresApi.getAllProfesores().then(
            (result) => {
                this.setState({
                    profesores: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        );
    }

    handleEdit(profesor)
    {
        this.setState(prevState => {

            return ({
                isEditing: {...prevState.isEditing, [profesor._id]: profesor} 
            });

        });
    }

    handleDelete(profesor)
    {
        console.log("handleDelete");
        console.log("pasó por Porfesor.js handleDelete, profesor "+profesor.identificacion);


        ProfesoresApi.deleteProfesor(profesor).then(
            (response) =>
            {
                console.log("response");
                console.log(response);
                console.log("el servidor respondió bien, ahora si modifico el estado");
                this.setState(prevState => ({
                    profesores: prevState.profesores.filter((p) => p._id !== profesor._id)
                }));
            } ,
            (error) =>
            {
                console.log("algo falló en el servidor no modifico el estado");
            }
        );
    }

    handleCloseError()
    {
        this.setState({
            errorInfo: null
        });
    }

    addProfesor(profesor)
    {
        console.log("addProfesor");

        //corrección de datos faltantes que deben ir al backend
        profesor["editable"] = true;

        ProfesoresApi.addProfesor(profesor)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("agregó el profesor");
                //console.log("data[0]");
                //console.log(data[0]);
                var nuevoProfesor = data[0];

                this.setState(prevState => {
                    console.log("pasó por el punto 1");
                    const profesores = prevState.profesores;

                    profesor["_id"] = nuevoProfesor._id;
        
                    if(!profesores.find(p => p.identificacion === profesor.identificacion))
                    {
                        console.log("pasó por el punto 2", profesor);             

                        return ({
                            profesores: [...prevState.profesores, profesor]
                        });
                    }
                });
                
            })
            .catch((error) => {
                console.log("Algo salió mal al agregar el profesor");
                //console.log(error.message);
                
                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );

    }

    handleEditCancel(profesor)
    {
        console.log("pasó por Porfesor.js handleEditCancel, profesor "+profesor.identificacion);
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[profesor._id];
            return {
                isEditing: isEditing
            }
        })
    }

    handleEditChange(profesor)
    {
        //console.log("pasó por Porfesor.js handleEditChange, profesor "+profesor.identificacion);
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [profesor._id]: profesor}
        }));
    }

    handleEditSave(profesor)
    {
        //console.log("pasó por Porfesor.js handleEditSave, profesor "+profesor.identificacion);


        ProfesoresApi.updateProfesor(profesor).then(
            (response) => {
                console.log("Editó el profesor");

                this.setState(prevState => {

                    const isEditing = Object.assign({}, prevState.isEditing);
                    delete isEditing[profesor._id];
        
                    const profesores = prevState.profesores;
                    const pos = profesores.findIndex(p  => p._id ===  profesor._id);
        
                    return {
                        profesores: [...profesores.slice(0, pos), Object.assign({}, profesor), ...profesores.slice(pos + 1)],
                        isEditing: isEditing
                    };
                });

            },
            (error) => {
                console.log("Algo salió mal al editar el profesor");

                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );
    }

    handleImageAdded(profesor)
    {
        console.log("handleImageAdded");
        console.log(profesor);

        this.setState(prevState => {

            const profesores = prevState.profesores;
            const pos = profesores.findIndex(p  => p._id ===  profesor._id);

            return {
                profesores: [...profesores.slice(0, pos), Object.assign({}, profesor), ...profesores.slice(pos + 1)]
            };
        });
    }

    render()
    {
    
        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                <NewProfesor onAddProfesor={this.addProfesor} />

                <br/>

                <table className="table table-bordered table-striped table-hover" >
                    <thead>
                        <tr colSpan="3">
                            <th>Lista Profesores</th>
                        </tr>
                        <tr>
                            <th>identificacion</th>
                            <th>nombre</th>
                            <th>password</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.profesores.map((profesor) => 
                            
                            !this.state.isEditing[profesor._id] ?
                            <Profesor 
                                profesor={profesor} 
                                onEdit={this.handleEdit} 
                                onDelete={this.handleDelete} 
                                onImageAdded={this.handleImageAdded} 
                                key={profesor._id} />
                            :
                            <EditProfesor 
                                profesor={this.state.isEditing[profesor._id]} 
                                onCancel={this.handleEditCancel} 
                                onSave={this.handleEditSave} 
                                onChange={this.handleEditChange}
                                key={profesor._id} />
                        )}
                        
                    </tbody>
                </table>
                
            </div>
        );

    }

}
    
