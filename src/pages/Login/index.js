import { useState } from "react";
import "./login.css";
import { Logo } from "./../../components/Logo/index";

import { autenticacao } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Input from './../../components/Input';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault(); //Para previnir que a página atualize

    if (email === "" || password === "") {
      alert("preencha todos os campos!");
      return;
    }

    signInWithEmailAndPassword(autenticacao, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
        toast.info("Bem Vindo de volta", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(() => {
        toast.error("Erro ao tentar fazer seu login", {
          position: "top-right",
          autoClose: 1500,
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
    <div className="login-container">
      <Logo />

      <form className="form" onSubmit={handleLogin}>

        <Input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="************"
          autoComplete="on"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit"> Acessar </button>
      </form>
    </div>
  );
}
