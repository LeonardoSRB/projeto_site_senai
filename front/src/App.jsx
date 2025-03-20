import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Home from "./pages/home";
import ModalDisciplinas from "./pages/home";
import ModalProfessores from "./components/modals/teachers";
import Teacher from "./pages/teacher";
import Disciplina from "./pages/Disciplina";

export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/modalprofessores" element={<ModalProfessores />}/>
                <Route path="/modaldisciplinas" element={<ModalDisciplinas />}/>
                <Route path="/teacher" element={<Teacher />}/>
                <Route path="/disciplina" element={<Disciplina />}/>
            </Routes>
        </Router>
    )
}

