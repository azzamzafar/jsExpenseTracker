const UserModel = require('../models/users.js');
const sequelize = require('../utils/db_con.js');
const argon2 = require('argon2')
exports.postAddUser = async (req,res,next) =>{
    const {username,email,password} = req.body;
    try{
        const result = await UserModel.findAll({
            where:{email:email}
        })
        // console.log(result)
        if (result.length>0){
            res.status(409).json({msg:"User Already Exists"})
        }
        else{
            const hash = await argon2.hash(password,{type:argon2.argon2id});

            const result = await sequelize.transaction(async (t)=>{
                return await UserModel.create({
                    username:username,
                    email:email,
                    password:hash
                },{transaction:t})
            })
            res.status(201).json({msg:"User Added"})
        }
    }catch(err){
        res.status(500).send("Unsuccessful");
    }
}

exports.postLoginUser = async (req,res,next)=>{
    const {email,password} = req.body;
    if (email.includes('@')){
        try{
            const users = await sequelize.transaction(async (t)=>{
                return await UserModel.findAll({
                    where:{email:email}
                },{transaction:t})
            })
            const jusers = JSON.parse(JSON.stringify(users))

            if (jusers.length!=1) res.status(404).send("Not Found")

            else if (!(await argon2.verify(jusers[0].password,password))) res.status(401).send("Password Incorrect")

            else res.status(303).json({msg:"login successful"})
        }catch(err){
            console.log(err)
        }
    }
}