const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'mysql'
  }
)

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDB, sequelize }
