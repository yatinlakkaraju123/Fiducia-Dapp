const mongoose = require('mongoose')
const SCinfoSchema = new mongoose.Schema(
    {
        smartcontractaddress:String,
        token:String
    }
)

const SCmodel = mongoose.model("smartcontract",SCinfoSchema)

module.exports = SCmodel