// require('dotenv').config()
// const express = require('express')
// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')


// const app = express()
// app.use(express.json())

// //PUBLIC

// app.get('/', (req, res) => {
//     res.status(200)
//     .json({msg: 'Bem vindo a nossa API'})
// })

// //PRIVATE

// app.get('/user/:id', chectToken, async (req, res) => {
//     const id = req.params.id

//     const user = await User.findById(id, '-password')

//     if(!user) {
//         return res.status(404).json({msg: 'O usuario não encontrado'})
//     }

//     res.status(200).json({ user })
// })

// function chectToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(" ")[1]

//     if(!token) {
//         return res.status(401).json({msg: "Acesso negado"})
//     }

//     try {
//         const secret = process.env.secret
//         jwt.verify(token, secret)
//         next()

//     } catch(err) {
//         return res.status(400).json({msg: 'Token inválido'})
//     }
// }

