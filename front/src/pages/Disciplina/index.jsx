import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import ModalDisciplinas from "../../components/modals/disciplinas";
import Head from "../../components/head";
import Footer from "../../components/footer";
import axios from "axios";
import './styles.css'

export default function Disciplina() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [modalOpen, setModalOpen] = useState(false)
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null)
    const [setar, setSetar] = useState(false)

    // console.log("Token Home: ", token)

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/disc',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response.data)
                setDados(response.data)

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [setar])

    const editar = (disciplina) => {
        console.log(disciplina)
        setDisciplinaSelecionada(disciplina)
        setModalOpen(true)
    }


    const deleteDisciplina = async (disciplina) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/disciplina/${disciplina.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log("Dados apagados com sucesso...")
                setSetar(!setar)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="container_disciplina">
            <Head />
            <section className="section-disciplina">
                <div className="table-disciplina">
                    <h2>Lista de disciplinas</h2>
                    {dados.map((disciplina) => (
                        <div className="lista">
                            <div className="col1">
                                <FaEdit className="edit" onClick={() => editar(disciplina)} />
                            </div>
                            <div className="col2">
                                <FaTrash className="delete" onClick={() => deleteDisciplina(disciplina)} />
                            </div>
                            <div className="col3">
                                <span className="id">{disciplina.id}</span>
                            </div>
                            <div className="col4">
                                <span className="cod">{disciplina.cod}</span>
                            </div>
                            <div className="col5">
                                <span className="disc">{disciplina.disc}</span>
                            </div>
                            <div className="col6">
                                <span className="aulas">{disciplina.aulas}</span>
                            </div>
                        </div>
                    ))

                    }
                </div>
                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus
                            className="adicionar"
                            onClick={() => {
                                setDisciplinaSelecionada(null),
                                    setModalOpen(true)
                            }}
                        />
                    </div>
                    <div className="pesquisar">
                        <input placeholder="ID" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>

                <ModalDisciplinas
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    disciplinaSelecionada={disciplinaSelecionada}
                    setSetar={setSetar}
                    setar={setar}
                />
            </section>
            <Footer />
        </div>
    )
}