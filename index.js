const express = require('express');
const requireDir = require('require-dir')
const cors = require('cors');
const UserRoutes = require('./src/routes/UserRoutes')
require('./src/db/comn');

//Inicialized
const app = express();

// Config JSON response
app.use(express.json());

//Solve Cors
app.use(cors());

requireDir('./src/models')

// Public folder for img
app.get('/', (req, res) => {
    res.status(200)
    .json({msg: 'Bem vindo a nossa API'})
})

//Routes
app.use('/users', UserRoutes)

app.listen(process.env.PORT || 5000);