import Clientes from "../model/clientes.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Atendimento from "../model/atendimento.js"

const JWT_SECRET = "NAO-TEM-SEGREDO";
const SALT = 10;

class ServiceClientes {
  async FindAll() {
    const clientes = await Clientes.findAll({
      include:[{
        model: Atendimento,
        attributes: ['id', 'dia', 'horario', 'valor', 'concluido', 'user']
      }]
    });
    return clientes
  }
  async FindOne(id) {
    if (!id) {
      throw new Error("Favor informar o ID");
    }
    const cliente = await Clientes.findByPk(id, {
      include:[{
        model: Atendimento,
        attributes: ['id', 'dia', 'horario', 'valor', 'concluido', 'user']
      }]
    });
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  }
  async Create(nome, email, senha, ativo, roles) {
    if (!nome || !email || !senha) {
      throw new Error("Favor preencher todos os campos");
    }
    const senhaCrip = await bcrypt.hash(String(senha), SALT);

    await Clientes.create({
      nome,
      email,
      senha: senhaCrip,
      ativo,
      roles
    });
  }
  async Update(id, nome, email, senha) {
    if (!id || !nome || !email || !senha) {
      throw new Error("Favor preencher os campos");
    }
    const oldClient = await Clientes.findByPk(id);

    if (!oldClient) {
      throw new Error("Cliente não encontrado");
    }
    oldClient.nome = nome || oldClient.nome;
    oldClient.email = email || oldClient.email;
    oldClient.senha = senha
      ? await bcrypt.hash(String(senha), SALT)
      : oldClient.senha;

    return oldClient.save();
  }
  async Delete(id) {
    if (!id) {
      throw new Error("Favor informar o ID");
    }
    const client = await Clientes.findByPk(id);
    if (!client) {
      throw new Error("Cliente não encontrado");
    }
    return client.destroy();
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
