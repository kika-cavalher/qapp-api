const express = require('express');
const requireDir = require('require-dir')
const cors = require('cors');
const UserRoutes = require('./src/routes/UserRoutes')
// require('./src/db/comn');

(async () => {
    try {
        const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DB_PROD : process.env.DB_LOCAL;
        await db.mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.log(`Erro ao conectar no banco de dados! ${error}`);

        process.exit();
    }
})();

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