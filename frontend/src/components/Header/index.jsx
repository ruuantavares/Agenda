import { Link } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../auth/Context";
import { useContext } from "react";

export default function Header() {
  const { token } = useContext(AuthContext);

  return (
    <header>
      <h1>Minha Agenda API</h1>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        {!token ? null : (
          <Link to="/clientes">
            <button>Clientes</button>
          </Link>
        )}
        <Link to="/atendimentos">
          <button>Atendimentos</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </nav>
    </header>
  );
}
