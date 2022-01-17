import React, { useContext } from 'react'
import { Link, NavLink, Router, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate('/');

    const handleLogout = () => {
        const action = { type: types.logout }
        dispatch(action);
        navigate('/login', { replace: true });
    };

    return (

        <div className="container" >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand" >Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink
                            className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                            to="/materias"
                        >
                            Materias
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                            to="/notas"
                        >
                            Calificaciones
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                            to="/estudiantes"
                        >
                            Estudiantes
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                            to="/profesores"
                        >
                            Profesores
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">
                        <span className="nav-item nav-link text-info">
                            {user.firstName}
                        </span>
                        <button
                            className="nav-item nav-link btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}