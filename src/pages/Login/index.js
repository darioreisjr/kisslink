import { useState } from "react";
import "./login.css";
import { Logo } from "./../../components/Logo/index";

import { autenticacao } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

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
        toast.success("Bem Vindo de volta", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
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
          theme: "colored",
        });
      });
  }

  return (
    <div className="login-container">
      <Logo />

      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
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
