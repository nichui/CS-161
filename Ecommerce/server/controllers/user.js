const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart');
const Coupon = require('../models/coupon')
const Order = require('../models/order')

exports.userCart = async(req, res) => {

    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({email: req.user.email}).exec();

    // check if cart with logged in user id already exist

    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id}).exec();

    if(cartExistByThisUser){
        await cartExistByThisUser.remove();
        console.log("remove old cart");
    }

    for(let i = 0; i < cart.length; i++){
        let object = {};

        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.season = cart[i].season;
        //get price for creating total
        let productFromDb = await Product.findById(cart[i]._id).select("price").exec();

        object.price = productFromDb.price;

        products.push(object);
    }

    //console.log('products', products)
    let cartTotal = 0
    for(let i = 0; i < products.length; i++){
        cartTotal = cartTotal + products[i].price * products[i].count;
    }

    //console.log('cartTotal', cartTotal);

    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id,
    }).save();
    console.log('new cart --------> ', newCart);
    await res.json({ ok: true});
};

exports.getUserCart = async (req,res) => {
    const user = await User.findOne({ email: req.user.email}).exec();
    let cart = await Cart.findOne({ orderedBy: user._id})
        .populate('products.product', '_id title price totalAfterDiscount')
        .exec();


    const { products, cartTotal, totalAfterDiscount} = cart;

    await res.json({ products, cartTotal, totalAfterDiscount});

}

exports.emptyCart = async(req, res) => {
    const user = await User.findOne({email: req.user.email}).exec();

    const cart = await Cart.findOneAndRemove({ orderedBy: user._id}).exec();

    await res.json(cart);
};

exports.saveAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate({email: req.user.email},
        {address: req.body.address}
        ).exec();

    await res.json({ok: true});
};

exports.applyCouponToUserCart = async (req, res) => {
    const {coupon} = req.body
    console.log('COUPON', coupon);

    const validCoupon = await Coupon.findOne({name: coupon}).exec()
    if(validCoupon === null){
        return res.json({
            err: 'Invalid coupon',
        });
    }
    console.log('VALID COUPON', validCoupon);

    const user = await User.findOne({email: req.user.email}).exec();

    let {products, cartTotal} = await Cart.findOne({orderedBy: user._id})
        .populate('products.product', '_id title price')
        .exec();

    console.log('cartTotal', cartTotal, 'discount%', validCoupon.discount);

    //calculate total after discount
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
    //console.log('------>', totalAfterDiscount);

    await Cart.findOneAndUpdate(
        {orderedBy: user._id},
        {totalAfterDiscount},
        {new: true}
    ).exec();
    await res.json(totalAfterDiscount)
};

exports.createOrder = async(req,res) => {
    const {paymentIntent} = req.body.stripeResponse;
    const user = await User.findOne({email: req.user.email}).exec();
    let {products} = await Cart.findOne({orderedBy: user._id}).exec();

    let newOrder = await new Order({
        products,
        paymentIntent,
        orderedBy: user._id
    }).save();

    // decrement quantity, increment sold
    let bulkOption = products.map((item) => {
        return {
            updateOne: {
                filter: {_id: item.product._id}, // IMPORTANT item.product
                update: {$inc: {quantity: -item.count, sold: +item.count}},

            }
        }
    })

    let updated = await Product.bulkWrite(bulkOption, {});
    console.log('PRODUCT QUANTITY-- AND SOLD++', updated);

    console.log('NEW ORDER SAVED', newOrder);

    await res.json({ ok: true });
};