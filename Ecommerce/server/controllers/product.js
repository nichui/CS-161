const Product = require('../models/product')
const slugify = require('slugify')
const User = require('../models/user');
const Reservation = require('../models/reservation');
const mongoose = require('mongoose');

exports.create = async(req, res) => {
    try{
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save()
        await res.json(newProduct);
    }
    catch (err) {
        console.log(err);
        //res.status(400).send("Create product failed");
        await res.status(400).json({
            err: err.message,
        })
    }
};

exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subs')
        .populate('calendar')
        .sort([['createAt', 'desc']])
        .exec();
    await res.json(products);
};

exports.remove = async(req, res) => {
    try{
        const deleted = await Product.findOneAndRemove({slug: req.params.slug}).exec();
        await res.json(deleted);
    }
    catch(err){
        console.log(err)
        return res.status(400).send('Product delete failed')
    }
}

exports.read = async(req, res) => {
    const product = await Product.findOne({slug: req.params.slug})
        .populate('category')
        .populate('subs')
        .populate('calendar')
        .exec();
    await res.json(product);
}

exports.orders = async(req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.productId)){
        console.log(req.params.productId);
        const orders = await Reservation.find({
                        productId: req.params.productId,
                        }).exec()
        console.log('All reservations of this location', orders);
        await res.json(orders);
    } else {
        await res.status(400).json({'Error':'Failed to retrieve reservations of this location.'});
    }
}

exports.update = async (req, res) => {
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findOneAndUpdate(
            {slug: req.params.slug},
            req.body,
            {new: true}
            ).exec();
        await res.json(updated);
    }
    catch (err) {
        console.log('PRODUCT UPDATE ERROR ----> ',err)
        /*return res.status(400).send('Product update failed')*/
        await res.status(400).json({
            err: err.message,
        });
    }
}

//WITHOUT PAGINATION

/*exports.list = async(req, res) => {
    try{
        // createdAt/updatedAt, desc/asc, 3
        const {sort, order, limit} = req.body
        const products = await Product.find({})
            .populate('category')
            .populate('subs')
            .sort([[sort, order]])
            .limit(limit)
            .exec();

        await res.json(products);
    }
    catch(err){
        console.log(err)
    }
};*/

exports.list = async(req, res) => {
    try{
        // createdAt/updatedAt, desc/asc, 3
        const {sort, order, page} = req.body;
        const currentPage = page || 1
        const perPage = 3

        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate('category')
            .populate('subs')
            .populate('calendar')
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        await res.json(products);
    }
    catch(err){
        console.log(err)
    }
};

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    await res.json(total);
};

exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec()
    const user = await User.findOne({email: req.user.email}).exec()
    const {star} = req.body
    //who is updating?
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
        (element) =>
            (element.postedBy.toString() === user._id.toString())
    );
    // if user haven't left rating yet, push it
    if(existingRatingObject === undefined){
        let ratingAdded = await Product.findByIdAndUpdate(product._id, {
            $push: { ratings: {star, postedBy: user._id } }, // add comment review later here
        },
            {new: true}
            ).exec();
        console.log("ratingAdded", ratingAdded);
        await res.json(ratingAdded);
    }
    else{
        // if user have already left rating, update it
        const ratingUpdated = await Product.updateOne({
            ratings: { $elemMatch:  existingRatingObject},
            },
            {$set: {"ratings.$.star": star}},
            { new : true }
            ).exec();
        console.log('ratingUpdated', ratingUpdated);
        await res.json(ratingUpdated);
    }
};

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const related = await Product.find({
        _id: { $ne: product._id},
        category: product.category,

    }).limit(3)
        .populate('category')
        .populate('sub')
        .populate('calendar')
        .populate('postedBy')
        .exec()

    await res.json(related);
};

// SEARCH / FILTER

const handleQuery = async(req, res, query) => {
    const products = await Product.find({ $text: { $search : query }})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec();

    await res.json(products);
}

const handlePrice = async(req, res, price) => {
    try {
        let products = await Product.find({
            price:{
                $gte: price[0], // greater than
                $lte: price[1], // less than
            },
        })
            .populate('category', '_id name')
            .populate('subs', '_id name')
            .populate('postedBy', '_id name')
            .exec();

        await res.json(products);
    }
    catch (err){
        console.log(err);
    }
};

const handleCategory = async (req,res, category) => {
    try{
        let products = await Product.find({category})
            .populate('category', '_id name')
            .populate('subs', '_id name')
            .populate('postedBy', '_id name')
            .exec();
        await res.json(products);
    }
    catch(err){
        console.log(err)
    }
}

const handleStar =  (req, res, stars) => {
    Product.aggregate([
        {
            $project: {
                document: "$$ROOT",
                floorAverage: {
                    $floor: { $avg: "$ratings.star" }
                },
            },
        },
        { $match: {floorAverage: stars}}
    ])
        .limit(12)
        .exec((err, aggregates) => {
            if(err){
                console.log('AGGREGATE ERROR', err)
            }
            Product.find({_id:aggregates})
                .populate('category', '_id name')
                .populate('subs', '_id name')
                .populate('postedBy', '_id name')
                .exec((err, products) => {
                    if(err){
                        console.log('PRODUCT AGGREGATE ERROR', err);
                    }
                    res.json(products)
                });
        });

};

const handleSub = async (req, res, sub) => {
    const products = await Product.find({subs: sub})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec();

    await res.json(products);

}

const handleShipping = async (req, res, shipping) => {
    const products = await Product.find({shipping})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec();

    await res.json(products);
}

const handleSeason = async (req, res, season) => {
    const products = await Product.find({season})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec();

    await res.json(products);
}
const handleBrand = async (req, res, brand) => {
    const products = await Product.find({brand})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec();

    await res.json(products);
}

const handleMany = async (req, res, many) => {
    console.log('Handler data:', many)
    const products = await Product.find(many)
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec();

    await res.json(products);
}


// exports.searchFilters = async (req, res) => {
//     const {query, price, category, stars, sub, shipping, season, brand} = req.body;
//     if(query){
//         console.log('query', query)
//         await handleQuery(req, res, query);
//     }

//     //price [20, 200]
//     if(price !== undefined){
//         console.log('price --->', price)
//         await handlePrice(req, res, price);
//     }

//     if(category){
//         console.log("category ---->", category);
//         await handleCategory(req, res, category);
//     }

//     if(stars){
//         console.log("category ---->", stars);
//         await handleStar(req, res, stars);
//     }

//     if(sub){
//         console.log("category ---->", sub);
//         await handleSub(req, res, sub);
//     }

//     if(shipping){
//         console.log("category ---->", shipping);
//         await handleShipping(req, res, shipping);
//     }

//     if(season){
//         console.log("category ---->", season);
//         await handleSeason(req, res, season);
//     }

//     if(brand){
//         console.log("category ---->", brand);
//         await handleBrand(req, res, brand);
//     }
// };

exports.searchFilters = async (req, res) => {
    const {query, price, category, star, sub, shipping, season, brand} = req.body;
    var temp = {}
    if(query){
        console.log('query', query)
        temp ['$text'] = { $search : query }
    }

    //price [20, 200]
    if(price !== undefined && price.length){
        console.log('price --->', price)
        temp['price'] = {
            $gte: price[0], // greater than
            $lte: price[1], // less than
        }
    }

    if(category && category.length){
        console.log("category ---->", category);
        temp['category'] = category
    }

    if(sub){
        console.log("sub ---->", sub);
        temp['subs'] = sub
    }

    if(shipping){
        console.log("shipping ---->", shipping);
        temp['shipping'] = shipping
    }

    if(season){
        console.log("season ---->", season);
        temp['season'] = season
    }

    if(brand){
        console.log("brand ---->", brand);
        temp['brand'] = brand
    }

    if(star){
        console.log("stars ---->", star);
        Product.aggregate([
            {
                $project: {
                    document: "$$ROOT",
                    floorAverage: {
                        $floor: { $avg: "$ratings.star" }
                    },
                },
            },
            { $match: {floorAverage: star}}
        ])
            .limit(12)
            .exec((err, aggregates) => {
                if(err){
                    console.log('AGGREGATE ERROR', err)
                }
                temp['_id'] = aggregates;
                handleMany(req, res, temp);
            });
    }
    else
        await handleMany(req, res, temp)
};