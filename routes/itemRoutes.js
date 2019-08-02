const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const Trip = require('../models/Trip');


router.get('/details/:id', (req, res, next)=>{

    Item.findById(req.params.id)
    .then((theItem)=>{
        res.json(theItem)
    })

    .catch((err)=>{
        res.json(err);
    })

})


router.post('/', (req, res, next)=>{

    let tripID = req.body.theTrip;

    Item.create({
        subcategory: req.body.theSubcategory,
        name: req.body.theName,
        weight: req.body.theweight,
    })

    .then((theItem)=>{ 

        Trip.findByIdAndUpdate(tripID, {
            $push: {items: theItem._id}
        })

        .then((response)=>{
            res.json({response, theItem})
        })

        .catch((err)=>{
            res.json(err)
        })

    })

    .catch((err)=>{
        res.json(err);
    })

})


router.post('/update/:id', (req, res, next)=>{

    Item.findByIdAndUpdate(req.params.id, {
      subcategory: req.body.theSubcategory,
      name: req.body.theName,
      weight: req.body.theWeight,
    })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.delete('/:id', (req, res, next)=>{

    Item.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })

    .catch((err)=>{
        res.json(err)
    })

})


module.exports = router;