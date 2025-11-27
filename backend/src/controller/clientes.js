import ServiceClientes from "../service/clientes.js";

class ControllerClientes {
  async FindAll(_, res) {
    try {
      const clientes = await ServiceClientes.FindAll();
      res.status(200).send({
        data: clientes,
        message: "Clientes encontrados com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao buscar clientes: " + error.message,
      });
    }
  }
  async FindOne(req, res) {
    try {
      const id = req.params.id;
      const clientes = await ServiceClientes.FindOne(id);
      res.status(200).send({
        data: clientes,
        message: "Cliente encontrado com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao buscar cliente: " + error.message,
      });
    }
  }

  async Create(req, res) {
    try {
      const loggedUser = req.headers?.clientes;
      let role = 1;
      if (loggedUser && loggedUser.role === 0) {
        role = req.body.role;
      }
      const { nome, email, senha, ativo } = req.body;

      await ServiceClientes.Create(nome, email, senha, ativo, role);
      res.status(201).send({
        message: "Cliente criado com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao criar cliente: " + error.message,
      });
    }
  }

  Update(req, res) {
    try {
      const id = req.params.id;
      const nome = req.body.nome;
      // const email = req.body.email;
      // const senha = req.body.senha;
    
      ServiceClientes.Update(id, nome);
      res.status(200).send({
        message: "Cliente atualizado com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao atualizar cliente: " + error.message,
      });
    }
  }

  async Delete(req, res) {
    try {
      const id = req.params.id 
      await ServiceClientes.Delete(id);

      res.status(204).send();
    } catch (error) {
      res.status(500).send({
        message: "Erro ao deletar cliente: " + error.message,
      });
    }
  }
  async Login(req, res) {
    try {
      const { email, senha } = req.body;
      const token = await ServiceClientes.Login(email, senha);
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao realizar login: " + error.message,
      });
    }
  }
}

export default new ControllerClientes();
