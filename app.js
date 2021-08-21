const express = require('express')
const config = require('config')
const db = require('./models')
const path = require('path')

const session = require('express-session'),
    flash = require('connect-flash')




const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session(
        { 
            secret: 'xx-dd-8f-de',
            resave: true,
            saveUninitialized: false
        }))
app.use(flash())



    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('/?home', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })
    app.get('/detail/:id', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/links', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/signin', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/signup', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/auth2', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('/?home', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })
    
    app.get('/detail/:id', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/links', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/signin', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/signup', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })

    app.get('/auth2', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })
}


app.use('/access', require('./routes/accessRoute'))
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirectRoute'))

const PORT = process.env.PORT || config.get('port')


app.listen(PORT, ()=>{
    console.log(`App has been started on PORT: ${PORT}`)
})