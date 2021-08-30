const Router = require('express')
const {Registered, Validator} = require('../middleware/auth')
const {Signup, Signin, Auth2Google} = require('../controllers/authController')
const { body } = require('express-validator')

const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth')
    .OAuth2Strategy




const router = Router()


router.use(passport.initialize())
router.use(passport.session())


passport.use(
    new GoogleStrategy(
      {
        clientID: "", //YOUR GOOGLE_CLIENT_ID
        clientSecret: '', //YOUR GOOGLE_CLIENT_SECRET
        callbackURL:
          'https://app-placelink.herokuapp.com/api/auth/google/callback',
          passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        return done(null, profile)
      }
    )
  )

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))



router.post("/signup", 
    [
        body('email', 'Incorrect Email').isEmail(),
        body('upass', 'Minimum password length 8 characters').isLength({ min: 8 }),
        Validator,
        Registered 
    ],
    Signup)

router.post('/signin',
    [
        body('email', 'Incorrect Email').isEmail(),
        body('upass', 'Minimum password length 8 characters').isLength({ min: 8 }),
        Validator
    ],
    Signin)


router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt : "select_account"
  }))

router.get(
    '/google/callback',
    passport.authenticate('google', {
      // successRedirect: '/api/auth/auth2.0/success',
      failureRedirect: '/',
    }),
    Auth2Google
)


router.get(
    '/auth2.0/success',
    (req, res)=>{

      if(!req.session.udata){
        res.status(404).json({message: 'Error: Sign in with Google'})
      }else{
        res.status(200).json({...req.session.udata, message: 'Success: Sign in with Google'})
      }
    }
)

module.exports = router