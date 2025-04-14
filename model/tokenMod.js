const mongoose = require("mongoose")

const blackList = new mongoose.Schema({
    token: {
        type: String,
        require: true
    }
})

const Blacklisted = mongoose.model("blaclist", blackList)

module.exports = Blacklisted