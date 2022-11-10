import "./header.css";

import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="admin-header">
      <nav className="nav-header">
        <button>
          <BiLogOut size={28} color="#DB2629" />
        </button>

        <Link to="/admin" >Links</Link>
        <Link to="/admin/social">Redes Sociais</Link>
      </nav>
    </header>
  );
}
