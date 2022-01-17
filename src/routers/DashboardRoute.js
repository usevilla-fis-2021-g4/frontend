import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "../components/general/Home";
import Materias from "../components/materias/Materias";
import Notas from "../components/calificaciones/Notas";
import Estudiantes from "../components/estudiantes/Estudiantes";
import Profesores from "../components/profesores/Profesores";
import { Navbar } from "../components/ui/NavBar";

export const DashboardRoute = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-2">
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path="/materias" element={<Materias />} ></Route>
                    <Route path="/notas" element={<Notas />} ></Route>
                    <Route path="/estudiantes" element={<Estudiantes />} ></Route>
                    <Route path="/profesores" element={<Profesores />} ></Route>
                </Routes>
            </div>
        </>
    )
}