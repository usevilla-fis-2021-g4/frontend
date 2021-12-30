import React, {Component, Fragment} from "react";
import { FaIdCard } from "react-icons/fa";

import ProfesoresApi from "./ProfesoresApi";


export default class ImagenIdentificacion extends Component 
{

    constructor(props) 
    {
        super(props);
        this.refImagenIdentificacion = React.createRef();
        this.monstrarIdentificacion = this.monstrarIdentificacion.bind(this);
    }

    monstrarIdentificacion(profesor)
    {
        console.log("profesor");
        console.log(profesor);

        ProfesoresApi.getIdentificacionProfesor(profesor).then(
            (response) => {
                console.log("response");
                console.log(response);
                // window.open(response.url, '_blank');

                this.refImagenIdentificacion.current.src = response.url;
            },
            (error) => {
                console.log("error");
                console.log(error);
            }
        );
    }

    render()
    {
        return (
            <Fragment>

                { 
                    (typeof this.props.profesor.imagenIdentificacion !== "undefined" && this.props.profesor.imagenIdentificacion !== "") ?
                    <Fragment>
                        <button className="btn btn-outline-secondary" onClick={() => this.monstrarIdentificacion(this.props.profesor)} title="Mostrar Identificacion" > <FaIdCard/> </button>
                        <img ref={this.refImagenIdentificacion} src="" width="100" height="100" alt="me obligó" />
                    </Fragment>
                    :
                    <Fragment/>
                }

            </Fragment>
        );
    }
}