const mongoose = require('mongoose')
const schema = mongoose.Schema

const customerSchema = new schema({
    _id: {
        type: schema.Types.ObjectId,
        auto: true
    },
    userName: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel