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
    // socketTimeoutMS: 0,
    // keepAlive: true,
    // reconnectTries: 30
};

mongoose.connect(MONGO_CONNECTION,MONGO_OPTIONS)
const MONGOOSE_CONNECTION=mongoose.connection
MONGOOSE_CONNECTION.on('error',console.error.bind(console,'MongoDB Connection Error!'))
MONGOOSE_CONNECTION.once('connected',()=>{
    console.log("MongoDB Connected success")
    start_server()
})

const start_server=()=>{
    const controllers=require('./Controllers')

    app.use('/api',controllers)
    
    app.listen(PORT,()=>{
        console.log(`The app server started at ${PORT}`)
    })
}

