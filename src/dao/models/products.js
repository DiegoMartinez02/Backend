const mongoose = require('mongoose');
const { Schema } = mongoose;

const collection = "Products";

const schema = new Schema({

    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: [String],
        require: true
    },
    code: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    id: {
        type: Number,
        require: true
    }
});

const productsModel = mongoose.model(collection, schema);

module.exports = productsModel;