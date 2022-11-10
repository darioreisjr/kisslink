import "./home.css";

import { Social } from "./../../components/Social/index";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Dario Reis</h1>
      <span>Veja meus links 👇</span>

      <main className="links">
        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal no Youtube</p>
          </a>
        </section>

        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal no Youtube</p>
          </a>
        </section>

        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal no Youtube</p>
          </a>
        </section>

        <footer>
          <Social url="https://facebook.com/darioreisjr">
            <FaFacebook size={35} color="FFF" />
          </Social>
          <Social url="https://twitter.com/darioreisjr">
            <FaTwitter size={35} color="FFF" />
          </Social>
          <Social url="https://instagram.com/darioreisjr">
            <FaInstagram size={35} color="FFF" />
          </Social>
        </footer>
      </main>
    </div>
  );
}
