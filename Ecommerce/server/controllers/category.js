const Category = require('../models/category');
const slugify = require('slugify');
const Sub = require("../models/sub")
// We use slug instead of ID, so parameter for slug would be : slug: slugify(name)
// Take a look at Category in models file to see schema
exports.create = async (req, res) => {
    try{
        const {name} = req.body;
        //const {category} = await new Category({name, slug: slugify(name)}).save();
        //res.json(category);
        res.json(await new Category({name, slug: slugify(name)}).save());
    } catch(err){
        //console.log(err)
        res.status(400).send('Create category failed');
    }
};

exports.list = async (req, res) => {
    res.json(await Category.find({}). sort({createdAt: -1}).exec());
}

exports.read = async (req, res) => {
    let category = await Category.findOne({slug: req.params.slug}).exec();
    res.json(category);
};

exports.update = async (req, res) => {
    const { name } = req.body; // Restaurant to Body Shop
    try{
        const updated = await Category.findOneAndUpdate({slug: req.params.slug},
            {name, slug: slugify(name)},
            {new : true} // everytime we want to update we have to have this otherwise it also contains old updates
            );
        res.json(updated);
    } catch(err){
        res.status(400).send("Category update failed");
    }
}

exports.remove = async (req, res) => {
    try{
        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Category delete failed");
    }
}

exports.getSubs = (req, res) => {
    Sub.find({parent: req.params._id}).exec((err, subs) => {
        if(err)
            console.log(err);
        res.json(subs);
    });
};