const Router = require('express')
const {Link} = require('../models')



const router = Router()

router.get('/:code', async (req, res)=>{
    try{
        const link = await Link.findOne(
            {
                where: {
                    code: req.params.code
                }
            }
        )

        if(link){
            link.counter++
            await Link.update(
                {
                    counter: link.counter
                },
                {
                    where: {
                        code: req.params.code
                    }
                }
            ).then(result=>{
                return res.redirect(link.link_to)
            }).catch(e=>{
                res.status(404).json({message: 'Link not found'})
            })
        }

        res.status(404).json({message: 'Link not found'})
    }catch(e){
        res.status(500).json({message: "Something went wrong, server error"})
    }
})


module.exports = router