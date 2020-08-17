const Sequelize = require('sequelize');
const { BOOLEAN } = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { 
      type: Sequelize.STRING,
      allowNull: false,
      validate: { 
        notEmpty: true,
      },
    },
    runtime: { 
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { 
        min: {
          args: 1,
          msg: 'Please provide a value greater than "0" for "runtime"',
        },
      },
    },
    releaseDate: { 
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: { 
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',    
        },
      },
    },
    isAvailableOnVHS: { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: { },
    },
  }, { sequelize });

  return Movie;
};