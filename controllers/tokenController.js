const { v4 : uuid } = require('uuid')
const {Token} = require('../models')
const { generateAccToken, generateRefToken } = require('../utils/generateT')




exports.GetTokenA = async (req, res)=>{

    return res.json({
        accessT: await generateAccToken(req.uData.id)
        }
    )
}

exports.GetTokens = async (req, res)=>{
    const uid = uuid()

    await Token.update(
        {
            _tuid: uid
        },
        {
            where: {
                _tuid: req.uData.tuid
            }
        }
    ).then(async (result)=>{
        if(result > 0){
            const a_token = await generateAccToken(req.uData.id)
            const {reftoken} = await generateRefToken(uid, req.uData.id)

            return res.status(202).json(
                {   
                    accessT: a_token,
                    refreshT: reftoken
                }
            )
            
        }else{
            return res.status(401).json({message: "No access, please login to your account"})
        }
    }).catch(e=>{
        res.status(500).json({message: "Something went wrong, server error"})
    })
}