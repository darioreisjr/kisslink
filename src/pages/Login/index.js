import { useState } from "react";
import "./login.css";
import { Logo } from "./../../components/Logo/index";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleLogin(event){
    event.preventDefault(); //Para previnir que a página atualize 
    alert("Teste")
  }

  return (
    <div className="login-container">
      <Logo />

      <form className="form" onSubmit={handleLogin} >
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
