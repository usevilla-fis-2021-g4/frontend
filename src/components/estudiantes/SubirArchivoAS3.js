import React, {Component} from "react";
import { Fragment } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import EstudiantesApi from "./EstudiantesApi";

export default class SubirArchivoAS3 extends Component {

    constructor(props) 
    {
        super(props);
        this.refInputArchivo = React.createRef();
        this.abrirInput = this.abrirInput.bind(this);
        this.subirArchivo = this.subirArchivo.bind(this);
    }

    abrirInput()
    {
        console.log("aqui");
        this.refInputArchivo.current.click();
    }

    subirArchivo(e)
    {
        //console.log("SubirArchivoAS3.subirArchivo");
        //console.log(e.target.files[0]);
        var file = e.target.files[0];
        //console.log("file");
        //console.log(file);
        var estudiadnte = this.props.estudiadnte;
        //console.log("estudiante");
        //console.log(estudiante);

        EstudiantesApi.uploadIdentificacionEstudiante(estudiadnte, file)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log("data");
            //console.log(data);
            var estudianteActualizado = data;
            this.props.onImageAdded(estudianteActualizado);
        });
    }

    render()
    {
    
        return (
            <Fragment>
                <button className="btn btn-outline-secondary" type="button" title="Subir Imagen de Identificación" onClick={this.abrirInput}> <BsFillCloudUploadFill /> </button>
                <input ref={this.refInputArchivo} type="file" name="identificacion" className="d-none" accept="image/gif, image/jpeg" onChange={this.subirArchivo} ></input>
            </Fragment>
        );

    }

}