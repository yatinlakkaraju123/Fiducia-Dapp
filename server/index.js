const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const SCmodel = require('./models/smartcontractinfo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/fiducia")

app.get('/',(req,res)=>{
    SCmodel.find({}).then(scinfo=>res.json(scinfo)).catch(err=>res.json(err))
})
app.post("/deploy",(req,res)=>{
    SCmodel.create(req.body).then(scinfo=>{
        res.json(scinfo)
        console.log(scinfo)
        
    }
        ).catch(err=>res.json(err))


})
app.listen(3001,()=>{
    console.log("Server is running");
})