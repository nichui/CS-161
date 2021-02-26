const Sub = require('../models/sub');
const slugify = require('slugify')
// We use slug instead of ID, so parameter for slug would be : slug: slugify(name)
// Take a look at Category in models file to see schema
exports.create = async (req, res) => {
    try{
        const {name, parent} = req.body;
        //const {category} = await new Category({name, slug: slugify(name)}).save();
        //res.json(category);
        res.json(await new Sub({name, parent, slug: slugify(name)}).save());
    } catch(err){
        console.log('SUB CREATE ERR ---->',err)
        res.status(400).send('Create sub failed');
    }
};

exports.list = async (req, res) => {
    res.json(await Sub.find({}). sort({createdAt: -1}).exec());
}

exports.read = async (req, res) => {
    let sub = await Sub.findOne({slug: req.params.slug}).exec();
    res.json(sub);
};

exports.update = async (req, res) => {
    const { name, parent } = req.body; // Restaurant to Body Shop
    try{
        const updated = await Sub.findOneAndUpdate({slug: req.params.slug},
            {name, parent, slug: slugify(name)},
            {new : true} // everytime we want to update we have to have this otherwise it also contains old updates
        );
        res.json(updated);
    } catch(err){
        res.status(400).send("Sub update failed");
    }
}

exports.remove = async (req, res) => {
    try{
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Sub delete failed");
    }
}