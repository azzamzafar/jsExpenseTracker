const ExpenseModel = require('../models/expenses.js');
const sequelize = require('../utils/db_con.js');
// const {serverlogger} = require('../utils/logger.js');

exports.postAddExpense = async (req,res,next) =>{
    const amount = req.body.amount;
    const category = req.body.category;
    const description = req.body.description;
    try{
        const result = await sequelize.transaction(async (t)=>{
            const expenses = await ExpenseModel.create({
                amount:amount,
                category:category,
                description:description
            },{transaction: t})
            return expenses
        })
        res.status(201).send("created")
    }catch(err){
        // serverlogger.error(err)
        res.status(500).send("Unsuccessful!")
    }
}

exports.putUpdateExpense = async (req,res,next) => {
    const expenseId = req.params.expenseId;
    try{
        const result = await sequelize.transaction(async (t)=>{
            return await ExpenseModel.update({
                amount: req.body.amount,
                category:req.body.category,
                description:req.body.description,
            },{
                where:{id:expenseId}
            },{transaction:t})
        })
        res.status(204).send("Updated")
    }catch(err){
        // serverlogger.error(err)
        res.status(500).send("Internal Server Error")
    }
}

exports.getExpenseList = async (req,res,next)=>{
    try{
        const result = await sequelize.transaction(async (t)=>{
            return await ExpenseModel.findAll({transaction:t});
        })
        return res.json(result)
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}
exports.getSingleExpense = async (req,res,next) => {
    const expenseId = req.params.expenseId;
    try{
        const result = await sequelize.transaction(async (t)=>{
            return await ExpenseModel.findByPk(expenseId,{transaction:t})
        })
        res.json(result)
    }catch(err){
        //serverlogger.error(err)
        res.status(500).send("Internal Server Error")
    }
}

exports.deleteExpense = async (req,res,next)=>{
    const expenseId = req.params.expenseId;
    try{
        const result = await sequelize.transaction(async (t)=>{
            const expense = await ExpenseModel.findByPk(expenseId,{transaction:t})
            return await expense.destroy({transaction:t})
        })
        res.status(201).send("Deleted")
    }catch(err){
        // serverlogger.error(err)
        res.status(500).send("Internal Server Error")
    }
}