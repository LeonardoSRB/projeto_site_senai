import React, { useState, useEffect } from "react";
import {FaUserGraduate, FaBook} from 'react-icons/fa'
import Head from "../../components/head";
import Footer from "../../components/footer";
import { useNavigate } from 'react-router-dom'
import './home.css'

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="main">
            <header>
                <Head/>
            </header>
            <div className="menu_container">
                <div className="menu">
                    <button onClick={navigate('/teacher')}> <FaUserGraduate/> Professores </button>
                    <button onClick={navigate('/Disciplina')}> <FaBook/> Disciplina </button>
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    )

}