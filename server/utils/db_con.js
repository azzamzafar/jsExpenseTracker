const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker',
    'azzam','StrongPassword@123',{
        dialect:'mysql',
        host:'localhost'
    }
)

module.exports = sequelize;