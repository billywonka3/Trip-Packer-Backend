const express = require('express');
const router = express.Router();

const Clothing = require('../models/Clothing');
const Trip = require('../models/Trip');


router.get('/details/:id', (req, res, next)=>{

    Clothing.findById(req.params.id)
    .then((theClothing)=>{
        res.json(theClothing)
    })

    .catch((err)=>{
        res.json(err);
    })

})


router.post('/', (req, res, next)=>{

    let tripID = req.body.theTrip;

    Clothing.create({
        category: req.body.theCategory,
        name: req.body.theName,
        // weight: req.body.theweight,
    })

    .then((theClothing)=>{ 

        Trip.findByIdAndUpdate(tripID, {
            $push: {clothing: theClothing._id}
        }, {new: true})

        .then((response)=>{
            res.json({response, theClothing})
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

    Clothing.findByIdAndUpdate(req.params.id, {
      category: req.body.theCategory,
      name: req.body.theName,
    //   weight: req.body.theWeight,
    })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.delete('/:id', (req, res, next)=>{

    Clothing.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })

    .catch((err)=>{
        res.json(err)
    })

})


module.exports = router;