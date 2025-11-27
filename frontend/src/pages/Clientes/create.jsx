import { useState } from "react";
import { createCliente } from "../../api/clientes";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  nome: "",
  email: "",
  senha: "",
  ativo: true,
};

export default function CreateCliente() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCliente({
      ...cliente,
      [id]: value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setCliente(INITIAL_STATE);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // seria idela validar os valores do objeto antes de enviar
    const response = await createCliente(cliente);

    if (response.status === 201) {
      toast("Usuário criado com sucesso");
      navigate("/clientes");
    } else {
      toast("Erro ao criar Usuário");
      console.log(response);
    }
  };

  return (
    <div className="form">
      <form>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={cliente.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={cliente.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Senha: </label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={cliente.senha}
            onChange={handleChange}
          />
        </div>
        <div className="actions">
          <button type="reset" onClick={handleReset}>
            Limpar
          </button>
          <button type="submit" onClick={handleSave}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
