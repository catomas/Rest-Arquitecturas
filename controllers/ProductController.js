const { response, request, json } = require("express");
const Product = require("../models/product");

const list = async (req, res = response) => {
  try {
    const [products] = await Promise.all([
      Product.find().select({
        name: 1,
        price: 1,
        description: 1,
      }),
    ]);

    if (!products) {
      return res.status(400).json({
        ok: false,
        msg: "No hay ningun producto",
      });
    }

    return res.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Tabla no renderizada",
    });
  }
};

const show = async (req, res = response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        ok: false,
        msg: "product no encontrada",
      });
    }

    return res.json({
      ok: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "El producto no se encuentra",
    });
  }
};

const update = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, ...all } = req.body;

    const product = await Product.findByIdAndUpdate(id, all);

    if (!product) {
      return res.status(400).json({
        ok: false,
        msg: "Orden no encontrada",
      });
    }

    const newProduct = await Product.findById(id);

    return res.json({
      ok: true,
      newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo fallo actualizando la orden",
    });
  }
};

const save = async (req = request, res = response) => {
  try {
    const body = req.body;
    const product = new Product(body);

    await product.save();
    return res.json({
      ok: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo fallo no se puedo guardar la orden",
      error,
    });
  }
};

const remove = async (req, res = response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(400).json({
        ok: false,
        msg: "Product no encontrada",
      });
    }

    return res.json({
      ok: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo fallo, no se pudo remover la Orden",
    });
  }
};

module.exports = {
  list,
  save,
  update,
  remove,
  show,
};
