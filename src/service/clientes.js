import Clientes from "../model/clientes.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "NAO-TEM-SEGREDO";
const SALT = 10;

class ServiceClientes {
  async FindAll() {
    const clientes = await Clientes.findAll();
    return clientes
  }
  async FindOne(id) {
    if (!id) {
      throw new Error("Favor informar o ID");
    }
    const cliente = await Clientes.findByPk(id);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  }
  async Create(nome, email, senha) {
    if (!nome || !email || !senha) {
      throw new Error("Favor preencher todos os campos");
    }
    const senhaCrip = await bcrypt.hash(String(senha), SALT);

    await Clientes.create({
      nome,
      email,
      senha: senhaCrip,
      ativo: true
    });
  }
  async Update(id, nome, senha) {
    if (!id) {
      throw new Error("Favor informar o ID");
    }
    const oldClient = await Clientes.findByPk(id);

    if (!oldClient) {
      throw new Error("Cliente não encontrado");
    }
    oldClient.nome = nome || oldClient.nome;
    oldClient.senha = senha || oldClient.senha;

    return oldClient.save();
  }
  async Delete(id) {
    if (!id) {
      throw new Error("Favor informar o ID");
    }
    const oldClient = await Clientes.findByPk(id);
    if (!oldClient) {
      throw new Error("Cliente não encontrado");
    }
    oldClient.destroy();
  }

  async Login(email, senha) {
    if (!email || !senha) {
      throw new Error("Favor informar email e senha validoos");
    }
    const cliente = await Clientes.findOne({ where: { email } });
    if (!cliente || !(await bcrypt.compare(String(senha), cliente.senha))) {
      throw new Error("Email ou senha inválidos");
    }
    return jwt.sign(
      {
        id: cliente.id,
        nome: cliente.nome,
        roles: cliente.roles,
      },
      JWT_SECRET,
      { expiresIn: 60 * 60 }
    );
  }
}

export default new ServiceClientes();
