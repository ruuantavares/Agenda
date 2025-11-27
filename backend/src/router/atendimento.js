import express from 'express'
import ControllerAtendimento from '../controller/atendimento.js'

const router = express.Router()

router.get('/atendimentos', ControllerAtendimento.FindAll)
router.get('/atendimento/:id', ControllerAtendimento.FindOne)
router.post('/atendimento', ControllerAtendimento.Create) 
router.put('/atendimento/:id', ControllerAtendimento.Update) 
router.delete('/atendimento/:id', ControllerAtendimento.Delete)


export default router