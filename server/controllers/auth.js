const User = require('../models/users.js');
const UserModel = require('../models/users.js');
const sequelize = require('../utils/db_con.js');

exports.postAddUser = async (req,res,next) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const result = await UserModel.findAll({
            where:{email:email}
        })
        // console.log(result)
        if (result.length>0){
            res.status(409).json({msg:"User Already Exists"})
        }
        else{
            const result = await sequelize.transaction(async (t)=>{
                return await UserModel.create({
                    username:username,
                    email:email,
                    password:password
                },{transaction:t})
            })
            res.status(201).json({msg:"User Added"})
        }
    }catch(err){
        res.status(500).send("Unsuccessful");
    }
}

exports.postLoginUser = async (req,res,next)=>{
    const handle = req.body.email;
    const password = req.body.password;
    if (handle.includes('@')){
        try{
            const users = await sequelize.transaction(async (t)=>{
                return await UserModel.findAll({
                    where:{email:handle}
                },{transaction:t})
            })
            const jusers = JSON.parse(JSON.stringify(users))

            if (jusers.length!=1) res.status(404).send("Not Found")

            else if (jusers[0].password!=password) res.status(401).send("Password Incorrect")

            else res.status(303).json({msg:"login successful"})
        }catch(err){
            console.log(err)
        }
    }
}