const express = require('express');
const cors = require('cors');
const UserRoutes = require('./src/routes/UserRoutes')
const conn = require('./src/db/comn');

//Inicialized
const app = express();

// Config JSON response
app.use(express.json());

//Solve Cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public folder for img
app.get('/', (req, res) => {
    res.status(200)
    .json({msg: 'Bem vindo a nossa API'})
})

//Routes
app.use('/users', UserRoutes)

app.listen(5000);