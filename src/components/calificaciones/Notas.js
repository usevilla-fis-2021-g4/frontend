import React, {Component} from "react";

import Nota from './Nota';
import Alert from './Alert';
import NewNota from './NewNota';
import EditNota from './EditNota';
import NotasApi from './NotasApi';
import EstudiantesApi from '../estudiantes/EstudiantesApi';
import MateriasApi from '../materias/MateriasApi';


export default class Notas extends Component {

    constructor(props){
        super(props);
        this.state = {
            errorInfo: null,
            notas: [{alumno: "Manuel", asignatura: "Conocimiento del Medio", nota: "Buena", _id: "61e4a78e8d6a41a07a89db93" }],
            estudiantes: [
                {nombre: "Manuel", identificacion: 1231231, _id: 'qweqweqew'},
                {nombre: "Pedro", identificacion: 5465465, _id: 'asdasdasda'}
            ],
            materias: [
                {area: "Algo",descripcion: "Conocimiento del Medio",nombre: "Conocimiento del Medio", _id: 123123},
                {area: "Algo",descripcion: "Conocimiento del Alto",nombre: "Conocimiento del Alto", _id: 456456}
            ],
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

        this.setState({
            materias: [{'_id' : 1, 'area': "Test", 'descripcion': "Test", 'nombre': "Test"}]
        });
    }

    componentDidMount(){

        // Getting list of EStudiantes
        EstudiantesApi.getAllEstudiantes().then(
            (result) => {
                this.setState({
                    estudiantes: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "Problema al conectar con el servicio de Estudiantes"
                })
            }
        );

        // Getting list of Materias
        MateriasApi.getAllMaterias().then(
            (result) => {
                this.setState({
                    materias: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "Problema al conectar con el servicio de Materias"
                })
            }
        );

        // Getting list of Notas
        NotasApi.getAllNotas().then(
            (result) => {
                this.setState({
                    notas: result
                });
            },
            (error) => {
                this.setState({
                    errorInfo: "Problema al conectar con el servicio de Notas"
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
        nota["editable"] = true;
        NotasApi.addNota(nota)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("agregó la nota");
                //console.log("data[0]");
                //console.log(data[0]);
                var nuevaNota = data;

                this.setState(prevState => {
                    console.log("pasó por el punto 1");
                    const notas = prevState.notas;

                    nota["_id"] = nuevaNota._id;
        
                    if(!notas.find(p => p.alumno === nota.alumno))
                    {
                        console.log("pasó por el punto 2", nota);             

                        return ({
                            notas: [...prevState.notas, nota]
                        });
                    }
                });
                
            })
            .catch((error) => {
                console.log("Algo salió mal en el put");
                //console.log(error.message);
                
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

                <NewNota estudiantes={this.state.estudiantes} 
                        materias={this.state.materias} 
                        onAddNota={this.addNota} />

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
                                estudiantes={this.state.estudiantes}
                                materias={this.state.materias}
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
    
