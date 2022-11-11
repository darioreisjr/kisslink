import { useState, useEffect } from "react";
import "./networks.css";

import { Header } from "./../../components/Header";
import Input from "../../components/Input";
import { MdAddLink } from "react-icons/md";

import { bancoDados } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function Networks() {
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {

     function loadLinks(){
        const docRef = doc(bancoDados, "social", "link")
        getDoc(docRef)
        .then((snapshot)=>{

            if(snapshot.data() !== undefined) {
                setFacebook(snapshot.data().facebook)
                setTwitter(snapshot.data().twitter)
                setInstagram(snapshot.data().instagram)
            }
        })
        
    }

    loadLinks()
  }, []);

  function handleSave(event) {
    event.preventDefault();

    setDoc(doc(bancoDados, "social", "link"), {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
    })
      .then(() => {
        alert("Urls salvas com sucesso");
      })
      .catch((error) => {
        alert("erro ao salvar" + error);
      });
  }

  return (
    <div className="admin-container">
      <Header />

      <h1 className="title-social"> Suas redes sociais</h1>

      <form className="form" onSubmit={handleSave}>
        <label className="label">Link do facebook</label>
        <Input
          placeholder="Digite a url do facebook..."
          value={facebook}
          onChange={(event) => setFacebook(event.target.value)}
        />

        <label className="label">Link do Twitter</label>
        <Input
          placeholder="Digite a url do Twitter..."
          value={twitter}
          onChange={(event) => setTwitter(event.target.value)}
        />

        <label className="label">Link do Instagram</label>
        <Input
          placeholder="Digite a url do instagram..."
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
        />

        <button type="submit" className="btn-register">
          Salvar Links <MdAddLink size={24} color="#FFF" />
        </button>
      </form>
    </div>
  );
}
