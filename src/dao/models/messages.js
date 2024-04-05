const mongoose = require("mongoose");
const { Schema } = mongoose;

const collection = "Messages";

const schema = new Schema({

    email: {
        type: String
    },
    message: {
        type: String
    }
});

const messagesModel = mongoose.model(collection, schema);

module.exports = messagesModel;
