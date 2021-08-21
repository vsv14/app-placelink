const jwt = require('jsonwebtoken');
const {secret, tokens} = require('../config/authConfig').jwt




async function Access(req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }
    let atoken
    try{
        atoken = req.headers.authorization.split(' ')[1]
    }catch(e){
        return res.status(401).json({message: 'Access error'});
    }
    

    if(!atoken){
        return res.status(401).json({message: 'Access error'});
    }

    await jwt.verify(atoken, secret, (err, uData)=>{
        if(err){
            return res.status(401).json({message: 'Access error'});
        }

        if(uData.type === tokens.access.type){
            req.uData = uData.user_Id
            next()
        }else{
            return res.status(401).json({message: 'Access error'});
        }
    })
}

module.exports = Access