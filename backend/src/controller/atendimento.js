import ServiceAtendimento from "../service/atendimento.js";

class ControllerAtendimento {
  async FindAll(_, res) {
    try {
      const atendimentos = await ServiceAtendimento.FindAll();
      res.status(200).send({
        data: atendimentos,
        message: "Atendimentos encontrados com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao buscar atendimentos: " + error.message,
      });
    }
  }
  async FindOne(req, res) {
    try {
      const id = req.params.id;
      const atendimentos = await ServiceAtendimento.FindOne(id);
      res.status(200).send({
        data: atendimentos,
        message: "Atendimento encontrado com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao buscar atendimento: " + error.message,
      });
    }
  }

  async Create(req, res) {
    try {
      const { dia, horario, valor, concluido, user } = req.body;
      await ServiceAtendimento.Create(dia, horario, valor, concluido, user);
      res.status(201).send({
        message: "Atendimento criado com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao criar o atendimento: " + error.message,
      });
    }
  }

  async Update(req, res) {
    try {
      const id = req.params.id;
      const { dia, horario, valor, concluido, user } = req.body;

      await ServiceAtendimento.Update(id, dia, horario, valor, concluido, user);
      res.status(200).send({
        message: "Atendimento atualizado com sucesso",
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao atualizar atendimento: " + error.message,
      });
    }
  }

  async Delete(req, res) {
    try {
      const id = req.params.id;
      await ServiceAtendimento.Delete(id);

      res.status(204).send();
    } catch (error) {
      res.status(500).send({
        message: "Erro ao deletar atendimento: " + error.message,
      });
    }
  }
}

export default new ControllerAtendimento();
