const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ownerCustomerSchema = new schema({
  _id: {
    type: schema.Types.ObjectId,
    auto: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  dueAmount: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

const ownerCustomerModel = mongoose.model("owner_customers", ownerCustomerSchema);

module.exports = ownerCustomerModel;
