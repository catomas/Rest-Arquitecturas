const { Schema, model } = require("mongoose");

const OrderSchema = Schema(
  {
    status: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    address: {
      type: String,
    },
    date: {
      type: Date,
    },
    product: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    offset: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrderSchema);
