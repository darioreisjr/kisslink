import { useState, useEffect } from "react";

import "./admin.css";

import { Header } from "../../components/Header";
import { Logo } from "./../../components/Logo/index";
import Input from "./../../components/Input/index";

import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

import { bancoDados } from "../../services/firebaseConnection";

import {  toast } from 'react-toastify';


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

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const linksRef = collection(bancoDados, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

     onSnapshot(queryRef, (snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      setLinks(lista)
    });
  }, []);

  async function handleRegister(event) {
    event.preventDefault();

    if (nameInput === "" || urlInput === "") {

      toast.warn('Preencha todos os campos!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return;
    }

    addDoc(collection(bancoDados, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        toast.success('Link cadastrado com Sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
      .catch((error) => {
        alert("");
        toast.error('Ops!!! erro ao salvar o link', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      });
  }

  async function handleDeleteLink(id){
    toast.success('Link deletado com sucesso!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    const docRef = doc(bancoDados, "links", id)
    await deleteDoc(docRef)
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

      {links.map((item, index) => (
        <article
          key={index}
          className="list animate-pop"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p>{item.name}</p>
          <div>
            <buttom className="btn-delete" onClick={()=> handleDeleteLink(item.id)} >
              <FiTrash2 size={18} color="#FFF" />
            </buttom>
          </div>
        </article>
      ))}
    </div>
  );
}
