import jwt from "jsonwebtoken";
import SericeClientes from "../service/clientes.js";

const JWT_SECRET = "NAO-TEM-SEGREDO";

export default function authMidlleWare(roles = []) {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        throw new Error("Sem permissão");
      }
      const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
      const cliente = await SericeClientes.FindOne(decoded.id);
      if(roles.length && 
        !roles.includes(cliente.roles)){
        throw new Error("Voce não tem permissão")
      }
      req.headers.cliente = cliente;
      next();
    } catch (error) {
      res.status(403).send({
        data: null,
        message: "Acesso negado: " + error.message,
        error: true,
      });
    }
  };
}
