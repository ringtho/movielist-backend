const { sequelize } = require('../db/connectDB')
const { DataTypes } = require('sequelize')

const Movie = sequelize.define('movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  plot: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
        notEmpty: true
    }
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
        notEmpty: true
    }
  },
  rating: {
    type: DataTypes.FLOAT
  },
  notes: {
    type: DataTypes.TEXT
  },
  thumbnail: {
    type: DataTypes.STRING
  }
})

Movie.sync({ force: true })

module.exports = Movie