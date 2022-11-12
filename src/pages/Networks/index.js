import { useState, useEffect } from "react";
import "./networks.css";

import { Header } from "./../../components/Header";
import Input from "../../components/Input";
import { MdAddLink } from "react-icons/md";

import { bancoDados } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { toast } from "react-toastify";

export default function Networks() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(bancoDados, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setNomeUsuario(snapshot.data().nomeUsuario)
          setFacebook(snapshot.data().facebook);
          setTwitter(snapshot.data().twitter);
          setInstagram(snapshot.data().instagram);
        }
      });
    }

    loadLinks();
  }, []);

  function handleSave(event) {
    event.preventDefault();

    setDoc(doc(bancoDados, "social", "link"), {
      nomeUsuario: nomeUsuario,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
    })
      .then(() => {
        toast.success("Urls salvas com sucesso", {
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
        toast.error("erro ao salvar " + error, {
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

  return (
    <div className="admin-container">
      <Header />

      <h1 className="title-social"> Suas redes sociais</h1>

      <form className="form" onSubmit={handleSave}>
        <label className="label">Seu Nome</label>
        <Input
          placeholder="Digite seu nome..."
          type="text"
          value={nomeUsuario}
          onChange={(event) => setNomeUsuario(event.target.value)}
        />

        <label className="label">Link do facebook</label>
        <Input
          placeholder="Digite a url do facebook..."
          type="url"
          value={facebook}
          onChange={(event) => setFacebook(event.target.value)}
        />

        <label className="label">Link do Twitter</label>
        <Input
          placeholder="Digite a url do Twitter..."
          type="url"
          value={twitter}
          onChange={(event) => setTwitter(event.target.value)}
        />

        <label className="label">Link do Instagram</label>
        <Input
          placeholder="Digite a url do instagram..."
          type="url"
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
        />

        <button type="submit" className="btn-register">
          Salvar <MdAddLink size={24} color="#FFF" />
        </button>
      </form>
    </div>
  );
}
