import React, {Component} from "react";

import Materia from './Materia';
import Alert from './Alert';
import NewMateria from './NewMateria';
import EditMateria from './EditMateria';
import MateriasApi from './MateriasApi';

export default class Materias extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            errorInfo: null,
            materias: [],
            isEditing: {}
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addMateria = this.addMateria.bind(this);

        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
    }

    componentDidMount()
    {
        MateriasApi.getAllMaterias().then(
            (result) => {
                this.setState({
                    materias: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        );
    }

    handleEdit(materia)
    {
        this.setState(prevState => {

            return ({
                isEditing: {...prevState.isEditing, [materia._id]: materia} 
            });

        });
    }

    handleDelete(materia)
    {
        console.log("handleDelete");
        console.log("pasó por Materia.js handleDelete, materia "+materia.nombre);


       MateriasApi.deleteMateria(materia).then(
            (response) =>
            {
                console.log("response");
                console.log(response);
                console.log("el servidor respondió bien, ahora si modifico el estado");
                this.setState(prevState => ({
                    materias: prevState.materias.filter((m) => m._id !== materia._id)
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

    addMateria(materia)
    {
        
        console.log("addMateria");

        //corrección de datos faltantes que deben ir al backend
        materia["editable"] = true;

        MateriasApi.addMateria(materia)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("agregó la materia");
                var nuevaMateria = data;

                this.setState(prevState => {
                    console.log("pasó por el punto 1");
                    const materias = prevState.materias;

                    materia["_id"] = nuevaMateria._id;
                    console.log("Materia tiene el _ID "+materia["_id"]+" y nuevaMateria "+nuevaMateria._id);
                    if(!materias.find(m => m.nombre === materia.nombre))
                    {
                        console.log("pasó por el punto 2", materia);             

                        return ({
                            materias: [...prevState.materias, materia]
                            
                        });
                    }

                });
                
            })
            .catch((error) => {
                console.log("Algo salió mal al agregar la materia");
                //console.log(error.message);
                
                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );

    }

    handleEditCancel(materia)
    {
        console.log("pasó por Materia.js handleEditCancel, materia "+ materia.nombre);
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[materia._id];
            return {
                isEditing: isEditing
            }
        })
    }

    handleEditChange(materia)
    {
        //console.log("pasó por Materia.js handleEditChange, materia "+materia.nombre);
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [materia._id]: materia}
        }));
    }

    handleEditSave(materia)
    {
        //console.log("pasó por Porfesor.js handleEditSave, materia "+materia.nombre);


        MateriasApi.updateMateria(materia).then(
            (response) => {
                console.log("Editó la materia");

                this.setState(prevState => {

                    const isEditing = Object.assign({}, prevState.isEditing);
                    delete isEditing[materia._id];
        
                    const materias = prevState.materias;
                    const pos = materias.findIndex(m  => m._id ===  materia._id);
        
                    return {
                        materias: [...materias.slice(0, pos), Object.assign({}, materia), ...materias.slice(pos + 1)],
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

    render()
    {
    
        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                <NewMateria onAddMateria={this.addMateria} />

                <br/>

                <table className="table table-bordered table-striped table-hover" >
                    <thead>
                        <tr colSpan="3">
                            <th>Lista de Materias</th>
                        </tr>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Area</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.materias.map((materia) => 
                            
                            !this.state.isEditing[materia._id] ?
                            <Materia materia={materia} onEdit={this.handleEdit} onDelete={this.handleDelete} key={materia._id} />
                            :
                            <EditMateria 
                            materia={this.state.isEditing[materia._id]} 
                                onCancel={this.handleEditCancel} 
                                onSave={this.handleEditSave} 
                                onChange={this.handleEditChange}
                                key={materia._id} />
                        )}
                        
                    </tbody>
                </table>
                
            </div>
        );

    }

}
    
