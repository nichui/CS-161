const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        text : true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index : true,
    },
    monthsToScroll: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    unavailableWeekDays: {
        type: Array,
    },
    timeSlots: {
        type: Array,
        required: true,
    },
    bookedDates: {
        type: Array,
    },
}, {timestamps: true}
);

module.exports = mongoose.model('Calendar', calendarSchema);