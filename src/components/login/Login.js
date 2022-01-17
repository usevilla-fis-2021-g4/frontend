import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext} from "../../auth/authContext"
import { useForm } from "../../hooks/useForm/useForm";
import  LoginService from "../../services/login.service";
import { types } from "../../types/types";
import Alert from '../ui/Alert';

export const Login = () => {
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate('/');
    const [values, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = values;


    const [state, setState] = useState({
        errorInfo : null
    })

    const handleCloseError = ()=>{
        setState((state)=> state.errorInfo = '');
    }

    const handleLogin = async (e)=>{
        e.preventDefault();

        if(!email || !password) return;

        await LoginService.login({email, password}).then(response => {
                const action = {
                    type: types.login,
                    payload: response.data
                };
                dispatch(action);
                navigate('/', {replace: true});
            })
            .catch( (e) => {
                let message = "";
                console.log(e.response, e.request, e.message, e.config, e.toJSON());
                if(e.response &&  e.response.status === 400){
                    if(e.response.data.errors[0].path === '.body.email')
                        message = "El formato del email es incorrecto.";
                    else    
                        message = "Email o Password son incorrectos.";
                }else{
                    message ='El usuario no existe.';
                }
                    
                setState( {...state , errorInfo : message } );
            });

        // LoginService.login(action.payload)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
        // dispatch(action);
        // const { pathname } = localStorage.getItem('lastPath');
        
        // navigate(pathname || '/', {replace: true});
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-7">
                <h1>Login</h1>
                <hr />
                <Alert message={state.errorInfo} onClose={handleCloseError} />
                <form onSubmit={handleLogin}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            onChange={handleInputChange}
                            aria-describedby="basic-addon1"
                            autoComplete="off"/>
                    </div>
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                        autoComplete="off"/>
                    <button type="submit" className="btn btn-primary mt-2" disabled={!email || !password}>Login</button>
                </form>
            </div>
        </div>
    );
}