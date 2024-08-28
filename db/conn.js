const {Sequelize} =  require('sequelize')

const sequelize = new Sequelize('toughts2','root','',{
    host:'localhost',
    dialect:'mysql',
    port:'3308',
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso!')
}
catch(err){
    console.log(`Não foi possível conectar: ${err}`)

}
module.exports = sequelize