const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');


router.get('/', (req, res) => {
    res.render("hotel/addUpdate", {
        viewTitle: "Insert Hotel Information"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insert(req, res);
        else
        update(req, res);
});


//Inserting hotel Info
function insert(req, res) {
    var hotel = new Hotel();
    hotel.name = req.body.name;
    hotel.location = req.body.location;
    hotel.email = req.body.email;
    hotel.mobile = req.body.mobile;
    hotel.ratings = req.body.ratings;
    hotel.price = req.body.price;
    hotel.ratings = req.body.ratings;
    hotel.currency = req.body.currency;
    hotel.homePage = req.body.homePage;
    hotel.save((err, doc) => {
        if (!err)
            res.redirect('hotel/info');
        else 
        {
           console.log('Error during record insertion : ' + err);
        }
    });
}

// For the Updation of hotel info
function update(req, res) {
    Hotel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) 
        { 
            res.redirect('hotel/info'); 
        }
        else 
        {
          console.log('Error during record update : ' + err);
        }
    });
}


// To retrieve hotel info
router.get('/info', (req, res) => {
    Hotel.find((err, docs) => {
        if (!err) {
            res.render("hotel/info", {
                info: docs
            });
        }
        else {
            console.log('Error in retrieving hotel info :' + err);
        }
    });
});



router.get('/:id', (req, res) => {
    Hotel.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("hotel/addUpdate", {
                viewTitle: "Update Hotel Information",
                hotel: doc
            });
        }
    });
});

//To delete the hotel data
router.get('/delete/:id', (req, res) => {
    Hotel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/hotel/info');
        }
        else { console.log('Error in hotel info delete :' + err); }
    });
});


module.exports = router;