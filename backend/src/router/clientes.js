import express from "express";
import ControllerClientes from "../controller/clientes.js";
import authMidlleWare from "../middleware/auth.js";

const router = express.Router();

router.post("/login", ControllerClientes.Login);

router.get("/cliente/context", authMidlleWare(), ControllerClientes.FindOne);
router.post("/cliente/", ControllerClientes.Create);
router.put("/cliente/", authMidlleWare(), ControllerClientes.Update);
router.delete("/cliente/", authMidlleWare(), ControllerClientes.Delete);

router.get("/clientes", authMidlleWare(),ControllerClientes.FindAll);
router.get("/cliente/:id", authMidlleWare(), ControllerClientes.FindOne);
router.post("/cliente/admin", authMidlleWare(), ControllerClientes.Create);
router.put("/cliente/:id", authMidlleWare(), ControllerClientes.Update);
router.delete("/cliente/:id", authMidlleWare(), ControllerClientes.Delete);



export default router;
