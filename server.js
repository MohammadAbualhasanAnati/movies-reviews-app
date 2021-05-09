const path = require('path')
const express = require("express")
const app = express()
const env=require('dotenv')

env.config()

const PORT=process.env.PORT


const controllers=require('./Controllers')

app.use('/api',controllers)

app.listen(PORT,()=>{
    console.log(`The app server started at ${PORT}`)
})