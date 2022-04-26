const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
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

module.exports = model("Product", ProductSchema);
