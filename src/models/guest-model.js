let mongoose = require('mongoose');



let logsDB = {
    "name": "guestSWU",
    "password": "50xReGJGiY5kTBD3"
}

const config = {
    autoIndex: false,
    useNewUrlParser: true,
  };

const USER = 'guestSWU';
const DATABASE = 'StarWarsUniverse';
const SERVER = 'vreymond-coben.mongodb.net';
const PASSWORD = '50xReGJGiY5kTBD3';

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@vreymond-cluster-coben.mongodb.net/${DATABASE}`, config);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED')

  db.db.collection("Characters", function(err, collection){
    collection.find({}).toArray(function(err, data){
        console.log(data); 
    })
});



  let CustomerSchema = new mongoose.Schema({
    name: String
});
module.exports = mongoose.model('Characters', CustomerSchema)
});



