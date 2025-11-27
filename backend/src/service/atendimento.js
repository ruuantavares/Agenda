import Atendimento from "../model/atendimento.js";
import Clientes from "../model/clientes.js";

class ServiceAtendimento {
  async FindAll() {
    const atendimento = await Atendimento.findAll({
      include:[{
        model: Clientes,
        attributes: ['id', 'nome', 'email', 'ativo']
      }]
    })
    return atendimento;
  }

  async FindOne(id) {

    if (!id) {
      throw new Error("Favor informar um ID válido.");
    }

    const atendimento = await Atendimento.findByPk(id,{
      include:[{
        model: Clientes,
        attributes: ['id', 'nome', 'email', 'ativo']
      }]
    })

    if (!atendimento) {
      throw new Error(`Atendimento ${id} não encontrado.`);
    }
    return atendimento;
  }

  async Create(dia, horario, valor, concluido, user) {
    if (!dia || !horario || !valor || concluido === undefined || !user) {
      throw new Error("Favor preencher todos os campos.");
    }

    await Atendimento.create({
      dia,
      horario,
      valor,
      concluido,
      user
    });
  }

  async Update(id, dia, horario, valor, concluido, user) {
    if (!id ) {
      throw new Error("Favor informar um ID");
    }

    const atendimentoOld = await Atendimento.findByPk(id);

    if (!atendimentoOld) {
      throw new Error(`Usuario ${id} não encontrado`);
    }
    atendimentoOld.dia = dia || atendimentoOld.dia;
    atendimentoOld.horario = horario || atendimentoOld.horario;
    atendimentoOld.valor = valor || atendimentoOld.valor;
    atendimentoOld.concluido = concluido || atendimentoOld.concluido;
    atendimentoOld.user = user || atendimentoOld.user;

    return atendimentoOld.save();
  }

  async Delete(id) {
    if (!id) {
      throw new Error("Favor informar um ID válido");
    }

    const atendimentoOld = await Atendimento.findByPk(id);

    if (!atendimentoOld) {
      throw new Error(`Atendimento ${id} não encontrado`);
    }
    return atendimentoOld.destroy();
  }
}

export default new ServiceAtendimento();
