const Reservation= require('../models/reservation');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try{
        // req.body.slug = slugify(req.body.name);
        const newReservation = await new Reservation(req.body).save();
        await res.json(newReservation);
    } catch(err){
        //console.log(err)
        res.status(400).send('Server error. Please contact administration.');
    }
};

exports.list = async (req, res) => {
    res.json(await Reservation.find({}). sort({createdAt: -1}).exec());
}
exports.listByProduct = async(req, res) => {
    let product = await Product.findOne({slug: req.product.slug}).exec();
    let productReservations = await Reservation.find({productId: product._id}).exec();
    await res.json(productReservations);
}

exports.update = async (req, res) => {
    try{
        const updated = await Reservation.findOneAndUpdate( {_id: req.params._id},
            req.body,
            {new: true}
            ).exec();a
        res.json(updated);
    } catch(err){
        res.status(400).send("Reservation update failed");
    }
}

exports.remove = async (req, res) => {
    try{
        const deleted = await Calendar.findOneAndDelete({_id: req.params._id});
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Calendar delete failed");
    }
}
