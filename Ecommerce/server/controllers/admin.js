const Order = require("../models/order");

exports.orders = async (req,res) => {
    let allOrders = await Order.find({})
        .sort('-createdAt')
        .populate('products.product')
        .exec();

    await res.json(allOrders);
}

exports.orderStatus = async (req, res) => {
    /*console.log(req.body);
    return;*/
    const { orderId, orderStatus } = req.body;

    let updated = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus },
        {new : true}
    ).exec();

    await res.json(updated);
}