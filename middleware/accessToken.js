const jwt = require('jsonwebtoken');
const {secret, tokens} = require('../config/authConfig').jwt




async function AccessToken(req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }

    

    let reftoken
    try{
        reftoken = req.headers.authorization.split(' ')[1]
    }catch(e){
        return res.status(401).json({message: 'Access error'});
    }
    

    if(!reftoken){
        return res.status(401).json({message: 'Access error'});
    }

     await jwt.verify(reftoken, secret, (err, uData)=>{        
        if(err){
            return res.status(401).json({message: 'Access error'});
        }

        if(uData.type === tokens.refresh.type){

            req.uData = {
                id: uData.user_Id,
                tuid: uData._uid
            }
            next()
        }else{
            return res.status(401).json({message: 'Access error'});
        }
    })
}

module.exports = AccessToken