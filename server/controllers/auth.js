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