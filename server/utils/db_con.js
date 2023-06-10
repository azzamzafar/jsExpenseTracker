const Sequelize = require('sequelize');
const {dblogger} = require('./logger.js')


const sequelize = new Sequelize('expense-tracker',
    'azzam','StrongPassword@123',{
        dialect:'mysql',
        host:'localhost',
        // logging: sql=>{
        //     if (!sql.startsWith('Executing (default): '
        //     || !sql.includes('TRANSACTION'
        //     || !sql.includes('COMMIT')))){
        //         dblogger.info(sql)      
        //     }
        // }
    }
)

module.exports = sequelize;