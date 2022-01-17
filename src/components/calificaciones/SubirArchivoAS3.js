import React, {Component} from "react";
import { Fragment } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import NotasApi from "./NotasApi";

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
        var file = e.target.files[0];
        var nota = this.props.nota;

        NotasApi.uploadIdentificacionNota(nota, file)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var notaActualizada = data;
            this.props.onImageAdded(notaActualizada);
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