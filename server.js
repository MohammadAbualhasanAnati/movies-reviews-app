const path = require('path')
const express = require("express")
const app = express()
const env=require('dotenv')
const mongoose=require('mongoose')

mongoose.Promise = require('bluebird')

env.config()


const PORT=process.env.PORT
const MONGO_CONNECTION=process.env.MONGO_CONNECTION
var MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true,
    socketTimeoutMS: 0,
    keepAlive: true,
};

mongoose.connect(MONGO_CONNECTION,MONGO_OPTIONS)
const MONGOOSE_CONNECTION=mongoose.connection
MONGOOSE_CONNECTION.on('error',console.error.bind(console,'MongoDB Connection Error!'))
MONGOOSE_CONNECTION.once('connected',()=>{
    console.log("MongoDB Connected successfully")
    start_server()
})
MONGOOSE_CONNECTION.once('disconnected', () => {
    console.log("MongoDB disconnected successfully")
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
});

const start_server=()=>{
    const bodyParser=require('body-parser')

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const controllers=require('./Controllers')
    app.use('/api',controllers)
    
    app.listen(PORT,()=>{
        console.log(`The app server started at ${PORT}`)
    })
    
}

