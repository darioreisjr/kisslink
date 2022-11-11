import { useState } from "react";

import "./admin.css";

import { Header } from "../../components/Header";
import { Logo } from "./../../components/Logo/index";
import Input from "./../../components/Input/index";

import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

import { bancoDados } from "../../services/firebaseConnection";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#f1f1f1");
  const [textColorInput, setTextColorInput] = useState("#121212");

  async function handleRegister(event) {
    event.preventDefault();

    if(nameInput === '' || urlInput ==='') {
        alert('atenção: preencha todos os campos!')
        return
    }

    addDoc(collection(bancoDados,"links"),{
        name: nameInput,
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
        created: new Date()
    })
    .then(()=>{
        setNameInput("")
        setUrlInput("")
        alert("Link cadastrado com Sucesso!")
    })
    .catch((error)=>{
        alert("ops erro ao salvar o link")
    })

  }

  return (
    <div className="admin-container">
      <Header />

      <Logo />

      <form className="form" onSubmit={handleRegister}>
        <label className="label">Nome do link</label>
        <Input
          placeholder="Nome do link..."
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />

        <label className="label">Url do link</label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
        />

        <section className="container-colors">
          <div>
            <label className="label right">Fundo do Link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(event) => setBackgroundColorInput(event.target.value)}
            />
          </div>
          <div>
            <label className="label right">Cor do Link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(event) => setTextColorInput(event.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="preview">
            <label className="label">Veja como está ficando👇</label>
            <article
              className="list"
              style={{
                marginBottom: 8,
                whamarginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button className="btn-register" type="submit">
          Cadastrar <MdAddLink size={24} color="FFF" />
        </button>
      </form>

      <h2 className="title">Meus links</h2>

      <article
        className="list animate-pop"
        style={{ backgroundColor: "#000", color: "#FFF" }}
      >
        <p>Grupo exclusivo no telegram</p>
        <div>
          <buttom className="btn-delete">
            <FiTrash2 size={18} color="#FFF" />
          </buttom>
        </div>
      </article>
    </div>
  );
}
