import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "../components/general/Home";
import Asignaturas from "../components/asignaturas/Asignaturas";
import Nota from "../components/calificaciones/Nota";
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
                    <Route path="/asignaturas" element={<Asignaturas />} ></Route>
                    <Route path="/notas" element={<Nota />} ></Route>
                    <Route path="/estudiantes" element={<Estudiantes />} ></Route>
                    <Route path="/profesores" element={<Profesores />} ></Route>
                </Routes>
            </div>
        </>
    )
}