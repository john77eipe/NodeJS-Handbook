var mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'nodeauth';      // REPLACE WITH YOUR DB NAME

class MongoDBConnection {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new MongoDBConnection()
// this class is a singleton because we are returning the instance of the class in the
// module.exports and because of how exports work in ES6