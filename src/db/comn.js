const mongoose = require('mongoose') 


async function main() {
  await mongoose.connect('mongodb://localhost:27017/qappApi')
  console.log('Conectado ao MongoDb')
}

main().catch((err) => console.log(err))


module.exports = mongoose;
