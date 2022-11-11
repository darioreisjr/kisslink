import "./admin.css";

import { Header } from "../../components/Header";
import { Logo } from "./../../components/Logo/index";
import Input from "./../../components/Input/index";

import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

export default function Admin() {
  return (
    <div className="admin-container">
      <Header />

      <Logo />

      <form className="form">
        <label className="label">Nome do link</label>
        <Input placeholder="Nome do link..." />

        <label className="label">Url do link</label>
        <Input type="url" placeholder="Digite a url..." />

        <section className="container-colors">
          <div>
            <label className="label right">Fundo do Link</label>
            <input type="color" />
          </div>
          <div>
            <label className="label right">Cor do Link</label>
            <input type="color" />
          </div>
        </section>

        <button className="btn-register" type="submit">
          Cadastrar <MdAddLink size={24} color="FFF" />
        </button>
      </form>

      <h2 className="title">Meus links</h2>

      <article className="list animate-pop"
      style={{backgroundColor:"#000", color:"#FFF"}}
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
