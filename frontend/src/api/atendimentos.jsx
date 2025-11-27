import api from "./api";

export const getAtendimentos = async () => {
  const response = await api.get("/api/v1/atendimentos");

  if (response.status !== 200) {
    throw new Error("Erro ao buscar atendimentos");
  }
  return response.data.atendimentos;
};

export const createAtendimento = async (atendimento) => {
  const response = await api.post("/api/v1/atendimento", atendimento);
  return response;
};

export const updateAtendimento = async (id, atendimento) => {
  const response = await api.put(`/api/v1/atendimento/${id}`, atendimento);
  return response;
};

export const deleteAtendimento = async (id) => {
  const response = await api.delete(`/api/v1/atendimento/${id}`);
  return response;
};

