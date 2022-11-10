import { useState, useEffect } from "react";

import { autenticacao } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

import { Navigate } from "react-router-dom";

export default function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSingned] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(autenticacao, (user) => {

        if(user) {
            const userData = {
                uid: user.uid,
                email: user.email
            }

            localStorage.setItem('@detailUser', JSON.stringify(userData))
            setLoading(false)
            setSingned(true)

        }else{
            setLoading(false)
            setSingned(false)
        }

      });
    }

    checkLogin();
  }, []);

  if (loading) {
    return <div>carregando......</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
