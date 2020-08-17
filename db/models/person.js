const Sequelize = require('sequelize');
const { sequelize } = require('..');

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
    }, { sequelize });
    return Person;
};