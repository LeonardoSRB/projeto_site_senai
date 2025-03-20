import React, { useState, useEffect } from "react";
import './styles.css'
import { AwardIcon } from "lucide-react";
import axios from "axios";

const ModalDisciplinas = ({
    isOpen,
    onClose,
    disciplinaSelecionada,
    setSetar,
    setar
}) => {
    if (!isOpen) return null

    console.log("Disc Select: ", disciplinaSelecionada)

    const [id, setId] = useState(disciplinaSelecionada?.id || "")
    const [cod, setCod] = useState(disciplinaSelecionada?.cod || "")
    const [disc, setDisc] = useState(disciplinaSelecionada?.disc || "")
    const [aulas, setAulas] = useState(disciplinaSelecionada?.aulas || "")
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (disciplinaSelecionada) {
            setId(disciplinaSelecionada.id)
            setCod(disciplinaSelecionada.cod || '')
            setDisc(disciplinaSelecionada.disc || '')
            setAulas(disciplinaSelecionada.aulas || '')

        } else {
            setId('')
            setCod('')
            setDisc('')
            setAulas('')

        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const novaDisciplina = { codigo, disc, aulas }
        if (disciplinaSelecionada) {
            atualizar({ ...disciplinaSelecionada})
        } else {
            criar(novaDisciplina)
        }
    }

    const newDisciplina = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/disc',
                {
                    cod: cod,
                    disc: disc,
                    aulas: aulas,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            console.log("Dados inseridos com sucesso...")
            setSetar(!setar)
            onClose(false)
        } catch (error) {

        }
    }

    const editDisciplina = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/disciplina/${disciplinaSelecionada.id}`,
                {
                    cod: cod,
                    disc: disc,
                    aulas: aulas,

                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            console.log("Dados atualizados com sucesso...")
            setSetar(!setar)
            onClose(false)
        } catch (error) {

        }
    }

    return (
        <div className="container_container">

            <div className="container_modal">
                <div className="head_modal">
                    <button className="close_button" onClick={onClose}>X</button>
                </div>
                <div className="body_modal">
                    <div className="caixa1">
                        <h2>{disciplinaSelecionada ? "Editar" : "Cadastrar"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="cod_modal"
                                placeholder="código"
                                type="text"
                                value={cod}
                                onChange={(e) => setCod(e.target.value)}
                            />
                            <input
                                className="disc_modal"
                                placeholder="nome da disciplina"
                                type="text"
                                value={disc}
                                onChange={(e) => setDisc(e.target.value)}
                            />
                            <input
                                className="aulas_modal"
                                placeholder="aulas"
                                type="text"
                                value={aulas}
                                onChange={(e) => setAulas(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="caixa2">
                        <h1>Foto</h1>
                    </div>
                </div>
                <div className="footer_modal">
                    <button
                        type="submit"
                        onClick={disciplinaSelecionada ? editDisciplina : newDisciplina}
                    >
                        {disciplinaSelecionada  ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    )

}

export default ModalDisciplinas