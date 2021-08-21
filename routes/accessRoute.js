const Router = require('express')
const { GetTokenA, GetTokens } = require('../controllers/tokenController')
const AccessToken = require('../middleware/accessToken')



const router = Router()


router.use('/',
    [
        AccessToken
    ])

router.get("/atkn", GetTokenA)

router.get('/tkns', GetTokens)



module.exports = router