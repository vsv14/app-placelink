const { Router } = require("express");
const Access = require("../middleware/access");
const {Link, User} = require('../models')
const config = require('config')
const shortid = require('shortid')




const router = Router()

router.use('/', 
    [
        Access
    ]
)

router.post('/generate', async (req, res)=>{
    try{
        const baseUrl = config.get('baseURL')
        const {to} = req.body

        const exist = await Link.findOne(
            {
                where: {
                    link_to: to,
                }
            }
        )

        if(exist){
            return res.json({link: exist})
        }

        const code = shortid.generate()
        const redirect = baseUrl + '/t/' + code
        console.log('route generate linkuData', req.uData)

        let link = await Link.create({
            code: code,
            link_to: to,
            link_redirect: redirect,
            userId: req.uData
        })

        res.status(201).json({link})


    }catch(e){
        console.log(e)
        res.status(500).json({message: "Something went wrong, server error"})
    }
})

router.get('/', async (req, res)=>{
    try{
        const links = await Link.findAll(
            {
                where: {
                    userId: req.uData
                },
                order: [
                    ['updatedat', 'DESC'],
                ],
            }
        )
        res.json({links})
    }catch(e){
        
        res.status(500).json({message: "Something went wrong, server error"})
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const link = await Link.findOne(
            {
                raw: true,
                where: {
                    code: req.params.id,
                },
                include:[
                    {
                        model: User,
                        as: 'user',
                        required: true,
                        attributes: ['email']
                    }
                ]
            }
        )

        res.json({link})
    }catch(e){
        res.status(500).json({message: "Something went wrong, server error"})
    }
})


router.put('/:id', async (req, res)=>{
    try{
        await Link.update(
            {
                link_to: req.body.link
            },
            {
                where: {
                    code: req.params.id
                }
            }
        ).then(result=>{
            if(result == 1){
                res.status(200).json({message: "Link was updated"})
            }else{
                res.status(500).json({message: "Error of update"})
            }
        })
  
        

        
    }catch(e){
        res.status(500).json({message: "Something went wrong, server error"})
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        
  
        await Link.destroy(
            {
                where: {
                    code: req.params.id,
                },
                
            }
        ).then(result=>{
            if(result === 1){
                res.status(200).json({message: "Link was deleted"})
            }else{
                res.status(500).json({message: "Error of delete"})
            }
        })

        
    }catch(e){
        res.status(500).json({message: "Something went wrong, server error"})
    }
})



module.exports = router