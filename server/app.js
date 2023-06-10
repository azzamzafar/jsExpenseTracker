const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./utils/db_con.js');
const userRoutes = require('./routers/expenses.js')
const setcors = require('./middlewares/setcors.js')
app.use(setcors.setcors)
app.use(bodyParser.json({extended:false}))


// app.use('',)
app.use('/expenses',userRoutes)

sequelize.sync().then(()=>{
    app.listen(PORT)
}).catch(err=>console.log(err))
