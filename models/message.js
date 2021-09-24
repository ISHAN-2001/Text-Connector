const mongoose = require("mongoose");

let messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Message-board",messageSchema);