const {validationResult} = require('express-validator')


exports.Validator = (req, res, next)=>{

    let errors
    errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(406).json({
            message: errors.array()[0].msg,
            value:  errors.array()[0].value   
        })
    }else{
        next()
    }
}