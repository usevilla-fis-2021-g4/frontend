import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './components/general/Home';
import Login from './components/general/Login';
import Asignaturas from './components/asignaturas/Asignaturas';
import Calificaciones from './components/calificaciones/Calificaciones';
import Estudiantes from './components/estudiantes/Estudiantes';
import Profesores from './components/profesores/Profesores';

function App() {
  return (

    <div className="container" >
      <Router>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand" >Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/asignaturas" className="nav-item nav-link" >Asignaturas</Link>
              <Link to="/calificaciones" className="nav-item nav-link" >Calificaciones</Link>
              <Link to="/estudiantes" className="nav-item nav-link" >Estudiantes</Link>
              <Link to="/profesores" className="nav-item nav-link" >Profesores</Link>
              <Link to="/login" className="nav-item nav-link" >Login</Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/asignaturas" element={<Asignaturas/>} ></Route>
          <Route path="/calificaciones" element={<Calificaciones/>} ></Route>
          <Route path="/estudiantes" element={<Estudiantes/>} ></Route>
          <Route path="/profesores" element={<Profesores/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
        </Routes>

      </Router>
    </div>
    
  );
}

export default App;
