const jwt = require('jsonwebtoken');
const {secret, tokens} = require('../config/authConfig').jwt


const generateAccToken = (userId)=> {

    const paylaod = {
        user_Id: userId,
        type: tokens.access.type,  
    };

    const option = { expiresIn: tokens.access.expiresIn};
    const jwtAccess = jwt.sign(paylaod, secret, option);

    return jwtAccess;
};


const generateRefToken = (uid, userid)=> {
    const paylaod = {
        user_Id: userid,
        _uid: uid,
        type: tokens.refresh.type,  
    };
    const option = { expiresIn: tokens.refresh.expiresIn};

    return {
        _uid: paylaod._uid,
        reftoken: jwt.sign(paylaod, secret, option)
    }
};

module.exports = {
    generateAccToken,
    generateRefToken
};