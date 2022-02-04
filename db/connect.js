const mongoose = require('mongoose')
const connectString = 'mongodb+srv://aditya:1234@nodeexpressprojects.24jwu.mongodb.net/Store-Api?retryWrites=true&w=majority'
const connectDB = (url) => {
 

  return mongoose.connect(connectString)
}

module.exports = connectDB
