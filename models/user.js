const { DataTypes} = require('sequelize')
const { sequelize } = require('../db/connectDB')
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    profileImg: {
        type: DataTypes.STRING,
        defaultValue: ""
    }
})

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

User.beforeUpdate(async (user) => {
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
})

// User.sync({ force: true })

module.exports = User