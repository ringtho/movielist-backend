const { DataTypes} = require('sequelize')
const { sequelize } = require('../db/connectDB')

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.sync({ force: false })

module.exports = User