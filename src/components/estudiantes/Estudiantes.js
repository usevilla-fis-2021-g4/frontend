import React, {Component} from "react";

import Estudiante from './Estudiante';
import Alert from './Alert';
import NewEstudiante from './NewEstudiante';
import EditEstudiante from './EditEstudiante';
import EstudiantesApi from './EstudiantesApi';

export default class Estudiantes extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            errorInfo: null,
            Estudiantes: [],
            isEditing: {}
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addEstudiante = this.addEstudiante.bind(this);

        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleImageAdded = this.handleImageAdded.bind(this);
    }

    componentDidMount()
    {
        EstudiantesApi.getAllEstudiantes().then(
            (result) => {
                this.setState({
                    Estudiantes: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        );
    }

    handleEdit(estudiante)
    {
        this.setState(prevState => {

            return ({
                isEditing: {...prevState.isEditing, [estudiante._id]: estudiante} 
            });

        });
    }

    handleDelete(estudiante)
    {
        console.log("handleDelete");
        console.log("pasó por Estudiante.js handleDelete, estudiante "+estudiante.identificacion);


        EstudiantesApi.deleteEstudiante(estudiante).then(
            (response) =>
            {
                console.log("response");
                console.log(response);
                console.log("el servidor respondió bien, ahora si modifico el estado");
                this.setState(prevState => ({
                    estudiantes: prevState.estudiantes.filter((p) => p._id !== estudiante._id)
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

    addEstudiante(estudiante)
    {
        console.log("addEstudiante");

        //corrección de datos faltantes que deben ir al backend
        estudiante["editable"] = true;

        EstudiantesApi.addEstudiante(estudiante)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("agregó el estudiante");
                //console.log("data[0]");
                //console.log(data[0]);
                var nuevoEstudiante = data[0];

                this.setState(prevState => {
                    console.log("pasó por el punto 1");
                    const estudiantes = prevState.estudiantes;

                    estudiante["_id"] = nuevoEstudiante._id;
        
                    if(!estudiantes.find(p => p.identificacion === estudiante.identificacion))
                    {
                        console.log("pasó por el punto 2", estudiante);             

                        return ({
                            estudiantes: [...prevState.estudiantes, estudiante]
                        });
                    }
                });
                
            })
            .catch((error) => {
                console.log("Algo salió mal al agregar el estudiante");
                //console.log(error.message);
                
                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );

    }

    handleEditCancel(estudiante)
    {
        console.log("pasó por Estudiante.js handleEditCancel, estudiante "+estudiante.identificacion);
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[estudiante._id];
            return {
                isEditing: isEditing
            }
        })
    }

    handleEditChange(estudiante)
    {
        //console.log("pasó por estudiante.js handleEditChange, estudiante "+estudiante.identificacion);
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [estudiante._id]: estudiante}
        }));
    }

    handleEditSave(estudiante)
    {
        //console.log("pasó por Estudiante.js handleEditSave, estudiadnte "+estudiante.identificacion);


        EstudiantesApi.updateEstudiante(estudiante).then(
            (response) => {
                console.log("Editó el estudiante");

                this.setState(prevState => {

                    const isEditing = Object.assign({}, prevState.isEditing);
                    delete isEditing[estudiante._id];
        
                    const estudiantes = prevState.estudiantes;
                    const pos = Estudiantes.findIndex(p  => p._id ===  estudiante._id);
        
                    return {
                        estudiantes: [...estudiantes.slice(0, pos), Object.assign({}, estudiante), ...estudiantes.slice(pos + 1)],
                        isEditing: isEditing
                    };
                });

            },
            (error) => {
                console.log("Algo salió mal al editar el estudiante");

                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );
    }

    handleImageAdded(estudiadnte)
    {
        console.log("handleImageAdded");
        console.log(estudiadnte);

        this.setState(prevState => {

            const estudiantes = prevState.estudiantes;
            const pos = estudiantes.findIndex(p  => p._id ===  estudiadnte._id);

            return {
                estudiantes: [...estudiantes.slice(0, pos), Object.assign({}, estudiadnte), ...estudiantes.slice(pos + 1)]
            };
        });
    }

    render()
    {
    
        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                <NewEstudiante onAddEstudiante={this.addEstudiante} />

                <br/>

                <table className="table table-bordered table-striped table-hover" >
                    <thead>
                        <tr colSpan="3">
                            <th>Lista Estudiantes</th>
                        </tr>
                        <tr>
                            <th>identificacion</th>
                            <th>nombre</th>
                            <th>password</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Estudiantes.map((estudiadnte) => 
                            
                            !this.state.isEditing[estudiadnte._id] ?
                            <Estudiante 
                                estudiadnte={estudiadnte} 
                                onEdit={this.handleEdit} 
                                onDelete={this.handleDelete} 
                                onImageAdded={this.handleImageAdded} 
                                key={estudiadnte._id} />
                            :
                            <EditEstudiante 
                                estudiadnte={this.state.isEditing[estudiadnte._id]} 
                                onCancel={this.handleEditCancel} 
                                onSave={this.handleEditSave} 
                                onChange={this.handleEditChange}
                                key={estudiadnte._id} />
                        )}
                        
                    </tbody>
                </table>
                
            </div>
        );

    }

}