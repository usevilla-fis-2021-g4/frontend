import React, {Component, Fragment} from "react";
import './ModalImagen.css'

/**
 * Freely adapted by juancarlosestranieto@gmail.com from: https://www.w3schools.com/howto/howto_css_modals.asp
 */
export default class ModalImagen extends Component 
{
    constructor(props) 
    {
        super(props);

        this.refModal = React.createRef();
        this.refButtonOpenModal = React.createRef();
        this.refButtonCloseModal = React.createRef();
    }

    componentDidMount()
    {
        if(this.props.showButtonOpenModal === false)
        {
            this.refButtonOpenModal.current.style.display = "none";
        }

        // Get the modal
        var modal = this.refModal.current;

        // Get the button that opens the modal
        var btn = this.refButtonOpenModal.current;

        // Get the <span> element that closes the modal
        var span = this.refButtonCloseModal.current;

        // When the user clicks on the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target === modal) 
            {
                modal.style.display = "none";
            }
        }
    }

    render()
    {
        return (
            <Fragment>

                <button id="myBtn" ref={this.refButtonOpenModal} >Open Modal</button>

                <div id="myModal" className="modal" ref={this.refModal} >

                    <div className="modal-content">
                        <span className="close" ref={this.refButtonCloseModal} >&times;</span>
                        <p>
                            {this.props.content}
                        </p>
                    </div>

                </div>

            </Fragment>
        );
    }
}