const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
        text : true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index : true,
    },
    address: {
        type: String, 
        required: true, 
        maxlength: 200, 
        text: true
    }, 

    city: {
        type: String, 
        required: true, 
        maxlength: 50, 
        text: true
    }, 

    state: {
        type: String, 
        enum: ['AZ','CA','NY','TX'],
    },

    zipcode: {
        type: String,
        required: true,
        maxlength: 100,
        text: true
    },

    email: {
        type: String, 
        trim: true, 
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 

    phone: {
        type: String, 
        validate:{
            validator: function(v){
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => 'Not a valid phone number!'
        },
        required: [true, 'Phone number required']
    }, 

    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text : true,
    },

    start_date: {
        type: Date,
        required: true,
    },

    end_date: {
        type: Date, 
        required: true,
    },

    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subs: [
        {
        type: ObjectId,
        ref: 'Sub',
        },
    ],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["Yes", "No"],
    },
    season : {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter', 'Whole Year'],
    },
    brand: {
        type: String,
        enum: ['Hiking', 'Visiting', 'Traveling', 'Entertaining', 'Relaxing'],
    },

    ratings: [
        {
            star: Number,
            postedBy: {type: ObjectId, ref:"User"},
        }
    ]

}, {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);