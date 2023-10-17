require('dotenv').config();
const mongoose = require('mongoose');
const MongoDBKey = process.env.MONGODB_KEY;

const mongoDb = `mongodb+srv://admin:${MongoDBKey}@cluster0.lnrds0m.mongodb.net/chat_message?retryWrites=true&w=majority`;

mongoose.connect(mongoDb, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
