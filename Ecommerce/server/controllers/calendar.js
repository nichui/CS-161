const Calendar= require('../models/calendar');
const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try{
        req.body.slug = slugify(req.body.name);
        const newCalendar = await new Calendar(req.body).save();
        await res.json(newCalendar);
    } catch(err){
        //console.log(err)
        res.status(400).send('Server error. Please contact administration.');
    }
};

exports.list = async (req, res) => {
    res.json(await Calendar.find({}). sort({createdAt: -1}).exec());
}

exports.read = async(req, res) => {
    const calendar = await Calendar.findOne({slug: req.params.slug}).exec();
    const products = await Product.find({calendar})
        .populate('calendar')
        /*.populate('postedBy', '_id name')*/ //for multiple admins
        .exec();
    await res.json({
        calendar,
        products
    })
}
exports.update = async (req, res) => {
    const { name } = req.body
    try{
        if(req.body.name){
            req.body.slug = slugify(req.body.name);
        }
        const updated = await Calendar.findOneAndUpdate( {slug: req.params.slug},
            req.body,
            {new: true}
            ).exec();
        res.json(updated);
    } catch(err){
        res.status(400).send("Category update failed");
    }
}

exports.remove = async (req, res) => {
    try{
        const deleted = await Calendar.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Calendar delete failed");
    }
}
