const bcrypt = require('bcryptjs')
const {User, Token} = require('../models')
const { generateAccToken, generateRefToken } = require('../utils/generateT')
const { v4: uuidv4 } = require('uuid');


function RewriteToken(uid){
    return Token.destroy({
        where: {
            _useruid: uid
        }
    }).then(()=>{
        return Token.create(
            {
                _useruid: uid
            }
        )
    }).then(token=>{
        return token._tuid
    }).catch((e)=>{
        //////
        res.status(500).json({message: "Something went wrong, server error"})
    })
}

exports.Signup = async(req, res)=>{
    try{
        const body = req.body

        body.upass = await bcrypt.hash(body.upass, 12)
        await User.create(body)

        res.status(201).json({message:'User was created!'})
    }catch(e){
        res.status(500).json({message: "Something went wrong, server error"}) 
    }
}

exports.Signin = async (req, res)=>{
    try{
        const body = req.body

        let user = await User.findOne({
            where: {
                email: body.email
            }
        }).then(u => {
            if (!u) {
                res.status(404).send({
                    message: "Failed! User not found!"
                });
                return;
            }

            return u
        });

        let compPass = await bcrypt.compare(body.upass, user.upass)
        if(compPass){
            try{
                const tuid = await RewriteToken(user._uuid)
                let  accToken = await generateAccToken(user._id)
                let { reftoken } = await generateRefToken(tuid, user._id)
                

                return res.status(202).json(
                    {   
                        user: user.uname,
                        accessT: accToken,
                        refreshT: reftoken
                    }
                )
            }catch(err){
                return res.status(500).json({message: 'Error sending token'})

            }         
        }else{
            res.status(404).json({
                message: "Email or password is incorrect"
            });
        }
    }catch(e){
        res.status(500).json({message: "Something went wrong, server error"})
    }
}


// Auth 2

exports.Auth2Google = async(req, res)=>{
    try{
        if (!req.user) res.redirect('/')
        
        const data = req.user._json
        const user = {}
        User.findOne({
            where: {
                email: data.email
            }
        }).then(u => {
            if (!u) {
                user.email = data.email
                user.uname = data.given_name
                user.upass = uuidv4();
                return User.create(user)
            }else{
                return u
            }
            
                        
        }).then(async user=>{
            try{
                const tuid = await RewriteToken(user._uuid)
                let  accToken = await generateAccToken(user._id)
                let { reftoken } = await generateRefToken(tuid, user._id)

                
                req.session.udata = {
                    user: user.uname,
                    accessT: accToken,
                    refreshT: reftoken
                }
                
                return res.status(200).redirect('/auth2')

            }catch(err){
                return res.status(500).json({message: 'Error sending token'})
            } 
        })

    }catch(e){
        res.status(500).json({message: "Something went wrong, server error"}) 
    }
}