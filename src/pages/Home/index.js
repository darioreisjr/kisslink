import { useState, useEffect } from "react";

import "./home.css";

import { Social } from "./../../components/Social/index";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

import { bancoDados } from "../../services/firebaseConnection";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    function loadLinks() {
      const linksref = collection(bancoDados, "links");
      const queryRef = query(linksref, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
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

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(bancoDados, "social", "link");

      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data().facebook,
            twitter: snapshot.data().twitter,
            instagram: snapshot.data().instagram,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="home-container">
      <h1>Dario Reis</h1>
      <span>Veja meus links 👇</span>

      <main className="links">
        {links.map((item) => (
          <section
            key={item.id}
            style={{ backgroundColor: item.bg }}
            className="link-area"
          >
            <a href={item.url} target="blank">
              <p className="link-text" style={{ color: item.color }}>
                {item.name}
              </p>
            </a>
          </section>
        ))}

        {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
          <footer>
            <Social url={socialLinks?.Facebook}>
              <FaFacebook size={35} color="FFF" />
            </Social>
            <Social url={socialLinks?.twitter}>
              <FaTwitter size={35} color="FFF" />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="FFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
