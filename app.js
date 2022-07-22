require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200)
    .json({msg: 'Bem vindo a nossa API'})
})

//register

const User = require('./src/models/User')


app.post('/auth/signup', async(req, res) => {
    const {name, email, password, checkPassword} = req.body

    if(!name) {
        return res.status(422).json({msg: 'O nome deve ser obrigatório'})
    }
    if(!email) {
        return res.status(422).json({msg: 'O e-mail deve ser obrigatório'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha deve ser obrigatório'})
    }

    if(password != checkPassword ) {
        return res.status(422).json({msg: 'A senha deve ser igual a informada'})
    }

    const userExist = await User.findOne({ email: email })

    if(userExist) {
        return res.status(422).json({msg: 'Utilize outro e-mail'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try{
        await user.save()
        res.status(201).json({msg: 'Usuario criado com sucesso.'})
    
    }catch(err){
        res.status(500).json({msg: err})
    }
})

//login
app.post('/auth/signin', async(req, res) => {
    const {email, password} = req.body

    if(!email) {
        return res.status(422).json({msg: 'O e-mail deve ser obrigatório'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha deve ser obrigatório'})
    }


    const user = await User.findOne({ email: email })

    if(!user) {
        return res.status(404).json({msg: 'Usuario não encontrado'})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({msg: 'Senha inválida'})
    }

    try{
        const secret = process.env.secret
        
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )
        
        res.status(200).json({msg: 'Autenticação realizada com sucesso.', token})
    
    }   catch(err){
        res.status(500).json({msg: err})
    }

})

const dbUser=  process.env.DB_USER
const dbPass= process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@qapp-api.kupeevk.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3030)
        console.log('Conectou ao banco')
    })
    .catch((err) => console.log(err))





