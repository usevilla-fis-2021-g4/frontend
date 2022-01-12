import React, {Component} from "react";

import Nota from './Nota';
import Alert from './Alert';
import NewNota from './NewNota';
import EditNota from './EditNota';
import NotasApi from './NotasApi';

export default class Notas extends Component {

    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            notas: [],
            isEditing: {}
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addNota= this.addNota.bind(this);

        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleImageAdded = this.handleImageAdded.bind(this);
    }

    componentDidMount(){
        NotasApi.getAllNotas().then(
            (result) => {
                this.setState({
                    notas: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "ERROR! Problema al conectar con el servidor."
                })
            }
        );
    }

    handleEdit(nota){
        this.setState(prevState => {

            return ({
                isEditing: {...prevState.isEditing, [nota._id]: nota} 
            });

        });
    }

    handleDelete(nota){
        console.log("handleDelete");
        NotasApi.deleteNota(nota).then(
            (response) =>
            {
                console.log(response);
                this.setState(prevState => ({
                    notas: prevState.notas.filter((p) => p._id !== nota._id)
                }));
            } ,
            (error) =>
            {
                console.log("error");
            }
        );
    }

    handleCloseError(){
        this.setState({
            errorInfo: null
        });
    }

    addNota(nota){
        NotasApi.addNota(nota)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("agregó la nota");
                let nuevaNota = data[0];

                this.setState(prevState => {
                    console.log("pasó por el punto 1");
                    const notas = prevState.notas;

                    notas["_id"] = nuevaNota._id;
        
                    if(!notas.find(p => p.identificacion  === nota.identificacion )){
                        console.log("pasó por el punto 2", nota);             

                        return ({
                            notas: [...prevState.notas, nota]
                        });
                    }
                });
                
            })
            .catch((error) => {
                console.log("Algo salió mal al agregar la nota");
                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );

    }

    handleEditCancel(nota){
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[nota._id];
            return {
                isEditing: isEditing
            }
        })
    }

    handleEditChange(nota){
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [nota._id]: nota}
        }));
    }

    handleEditSave(nota){
        NotasApi.updateNota(nota).then(
            (response) => {
                console.log("upate nota");

                this.setState(prevState => {

                    const isEditing = Object.assign({}, prevState.isEditing);
                    delete isEditing[nota._id];
        
                    const notas = prevState.notas;
                    const pos = notas.findIndex(p  => p._id ===  nota._id);
        
                    return {
                        notas: [...notas.slice(0, pos), Object.assign({}, nota), ...notas.slice(pos + 1)],
                        isEditing: isEditing
                    };
                });

            },
            (error) => {
                console.log("no edito la nota");

                this.setState(prevState => {
                    return ({
                        errorInfo: error.message
                    });
                });
            }
        );
    }

    handleImageAdded(nota)
    {
        console.log("handleImageAdded");
        this.setState(prevState => {

            const notas = prevState.notas;
            const pos = notas.findIndex(p  => p._id ===  nota._id);

            return {
                notas: [...notas.slice(0, pos), Object.assign({}, nota), ...notas.slice(pos + 1)]
            };
        });
    }

    render(){
    
        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                <NewNota onAddNota={this.addNota} />

                <br/>

                <table className="table table-bordered table-striped table-hover" >
                    <thead>
                        <tr colSpan="3">
                            <th>Lista de Notas</th>
                        </tr>
                        <tr>
                            <th>Alumno</th>
                            <th>Asignatura</th>
                            <th>Nota</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.notas.map((nota) => 
                            
                            !this.state.isEditing[nota._id] ?
                            <Nota 
                                nota={nota} 
                                onEdit={this.handleEdit} 
                                onDelete={this.handleDelete} 
                                onImageAdded={this.handleImageAdded} 
                                key={nota._id} />
                            :
                            <EditNota
                                nota={this.state.isEditing[nota._id]} 
                                onCancel={this.handleEditCancel} 
                                onSave={this.handleEditSave} 
                                onChange={this.handleEditChange}
                                key={nota._id} />
                        )}
                        
                    </tbody>
                </table>
                
            </div>
        );

    }

}
    
