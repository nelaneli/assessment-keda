//importing modules
const {Sequelize, DataTypes} = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5432
//database name is parking
const sequelize = new Sequelize(`postgres://postgres:123456@localhost:5432/parking`, {dialect: "postgres"})

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to parking`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

//connecting to model
db.records = require('./recordModel') (sequelize, DataTypes)

//exporting the module
module.exports = db