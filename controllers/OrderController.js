const { response, request, json } = require("express");
const Order = require("../models/order");

const list = async (req, res = response) => {
  try {
    const [orders] = await Promise.all([
      Order.find().select({
        status: 1,
        totalPrice: 1,
        address: 1,
        date: 1,
        product: 1,
        customerName: 1,
        customerEmail: 1,
      }),
    ]);

    if (!orders) {
      return res.status(400).json({
        ok: false,
        msg: "No hay ninguna orden",
      });
    }

    return res.json({
      ok: true,
      orders,
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
    const order = await Order.findById(id);

    if (!order) {
      return res.status(400).json({
        ok: false,
        msg: "Order no encontrada",
      });
    }

    return res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "La orden no se encuentra",
    });
  }
};

const update = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, ...all } = req.body;

    const order = await Order.findByIdAndUpdate(id, all);

    if (!order) {
      return res.status(400).json({
        ok: false,
        msg: "Orden no encontrada",
      });
    }

    const newOrder = await Order.findById(id);

    return res.json({
      ok: true,
      newOrder,
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
    const order = new Order(body);

    await order.save();
    return res.json({
      ok: true,
      order,
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
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(400).json({
        ok: false,
        msg: "Order no encontrada",
      });
    }

    return res.json({
      ok: true,
      order,
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
