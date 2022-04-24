const mongoose = require('mongoose');
const mongoURI = "";

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo succecfully");
    })
}

module.exports = connectToMongo;