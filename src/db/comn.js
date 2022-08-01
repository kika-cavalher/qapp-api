const mongoose = require('mongoose')
require('dotenv').config()


function main() {
  const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DB_PROD : process.env.DB_LOCAL;
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Conectado ao MongoDb')
}

main()


module.exports = mongoose;
