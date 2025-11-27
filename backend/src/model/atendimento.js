import database from '../config/database.js'
import Clientes from './clientes.js'



class Atendimento {
    constructor() {
        this.model = database.db.define('Atendimentos', {  
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            dia: {
                type: database.db.Sequelize.STRING
            },  
            horario: {
                type: database.db.Sequelize.STRING
                
            },
            valor: {
                type: database.db.Sequelize.FLOAT
            },  
            concluido: {    
                type: database.db.Sequelize.BOOLEAN
            },
            user: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Clientes,
                    key: 'id'
                }
            }
        })

        this.model.belongsTo(Clientes, {foreignKey: 'user'})
        Clientes.hasMany(this.model, {foreignKey: 'user'})
    }
}

export default new Atendimento().model