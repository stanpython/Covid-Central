const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://stan:rhino@cluster0.etihd.mongodb.net/covid19?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'covid19',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const globalSchema = new Schema({
  date: String,
  cases: Number,
  deaths: Number,
  recovered: Number,
});

const Global = mongoose.model('global', globalSchema);

module.exports = Global;
