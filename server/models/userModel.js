const mongoose = require('mongoose')

const schema = mongoose.Schema

const usersSchema = new schema({
    _id: {
        type: schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const usersModel = mongoose.model("users", usersSchema)

module.exports = usersModel