const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        price: Number,
        inventory: Number,
        nextDelivery: Date,
        deliveryAmt: Number,
        name: String
    },
    { timestamps: true }
)

const item = mongoose.model('item', itemSchema)
module.exports = item