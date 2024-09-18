const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  customerName: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
    enum: ["Regular", "Premium"],
  },
  purchaseLimit: {
    type: Number,
    required: true,
    min: 0,
  },
});

const UserSchema = mongoose.model("User", customerSchema);

module.exports = UserSchema;
