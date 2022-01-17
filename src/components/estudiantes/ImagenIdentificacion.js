import React, {Component, Fragment} from "react";
import { FaIdCard } from "react-icons/fa";
import ModalImagen from "./ModalImagen";

import EstudiantesApi from "./EstudiantesApi";


export default class ImagenIdentificacion extends Component 
{

    constructor(props) 
    {
        super(props);
        this.state = {
            srcImagenIdentificacion: ""
        };
        this.refModal = React.createRef();
        
        this.monstrarIdentificacion = this.monstrarIdentificacion.bind(this);
    }

    monstrarIdentificacion(estudiante)
    {
        console.log("estudiante");
        console.log(estudiante);

        EstudiantesApi.getIdentificacionEstudiante(estudiante).then(
            (response) => {
                console.log("response");
                console.log(response);
                // window.open(response.url, '_blank');

                this.setState({
                    srcImagenIdentificacion: response.url
                });

                //console.log("this.refModal.current.refButtonOpenModal.current");
                //console.log(this.refModal.current.refButtonOpenModal.current);
                this.refModal.current.refButtonOpenModal.current.click();
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
                    (typeof this.props.estudiante.imagenIdentificacion !== "undefined" && this.props.estudiante.imagenIdentificacion !== "") ?
                    <Fragment>
                        <button className="btn btn-outline-secondary" onClick={() => this.monstrarIdentificacion(this.props.estudiante)} title="Mostrar Identificacion" > <FaIdCard/> </button>

                        {
                        this.state.srcImagenIdentificacion !== "" ?
                        <ModalImagen 
                        content={<img src={this.state.srcImagenIdentificacion} height="200" alt="react me obligó a poner esto" />} 
                        showButtonOpenModal={false} 
                        ref={this.refModal} 
                        /> :
                        <Fragment/>
                        }    
                            
                    </Fragment>
                    :
                    <Fragment/>
                }

            </Fragment>
        );
    }
}