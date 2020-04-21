const mongoose = require('mongoose');

var hotelSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    email: {
        type: String
    },
    mobile: {
        type: String,
    },
    ratings: {
        type: String,
    },
    price: {
        type: String,
    },
    currency: {
        type: String,
    },
    homePage: {
        type: String,
    }
});

mongoose.model('Hotel', hotelSchema);
