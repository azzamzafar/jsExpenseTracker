const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expenses.js')

router.get('',expenseControllers.getExpenseList);
router.post('',expenseControllers.postAddExpense);

router.get('/:expenseId',expenseControllers.getSingleExpense);
router.put('/:expenseId',expenseControllers.putUpdateExpense);
router.delete('/:expenseId',expenseControllers.deleteExpense);
module.exports = router;