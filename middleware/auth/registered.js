const {User} = require('../../models')



async function Regeitered(req, res, next){
    console.log({message: req.body})
    try{
        await User.findOne({
                where: {
                    uname: req.body.uname
                }
            }).then(user => {
                if (user) {
                    res.status(409).json({
                        message: "Failed! Username is already in use!"
                    });
                    return;
                }
            })


            User.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then(user => {
                    if (user) {
                        res.status(409).send({
                            message: "Failed! Email is already in use!"
                        });
                        return;
                    }

                    next();
                });
    }catch(e){

    }
}

module.exports = Regeitered