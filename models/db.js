const mongoose = require('mongoose');
require('dotenv').config()

function connect() {
    
    let password = process.env.MONGO_URL; //Type your password here

    //let url2 = mongodb://localhost:27017/connect
    // Change this url if in cloud
    let url = `mongodb+srv://Project:${password}@cluster0.clm6b.mongodb.net/Text_Connector?retryWrites=true&w=majority`;
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Mongo DB Connected"))
        .catch(err => console.log(err));
}
module.exports = connect();