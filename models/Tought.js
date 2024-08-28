const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

// User 
const Tought = db.define('Tought',{
    title:{
        type: DataTypes.STRING,
        allowNull:false,
        require:true,
    },
})

Tought.belongsTo(User) // conectar criando um id na tablea Thoughts
User.hasMany(Tought) // indica que o usuário pode ter N ligações com a tabela Toughts

module.exports = Tought