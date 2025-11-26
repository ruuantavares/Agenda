import DataBase from '../config/database.js'

class Clientes {
  constructor() {
    this.model = DataBase.db.define("clientes", {
      id: {
        type: DataBase.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataBase.db.Sequelize.STRING,
      },
      email: {
        type: DataBase.db.Sequelize.STRING,
        unique: true,
      },
      senha: {
        type: DataBase.db.Sequelize.STRING,
      }
    });
  }
}

export default new Clientes().model;
