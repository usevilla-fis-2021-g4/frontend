import React, {Component, Fragment} from "react";
import { FaIdCard } from "react-icons/fa";
import ModalImagen from "./ModalImagen";

import NotasApi from "./NotasApi";


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

    monstrarIdentificacion(nota)
    {
        NotasApi.getIdentificacionNota(nota).then(
            (response) => {
                console.log("response");
                console.log(response);

                this.setState({
                    srcImagenIdentificacion: response.url
                });

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
                    (typeof this.props.nota.imagenIdentificacion !== "undefined" && this.props.nota.imagenIdentificacion !== "") ?
                    <Fragment>
                        <button className="btn btn-outline-secondary" onClick={() => this.monstrarIdentificacion(this.props.nota)} title="Mostrar Identificacion" > <FaIdCard/> </button>

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