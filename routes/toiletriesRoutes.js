const express = require('express');
const router = express.Router();

const Toiletries = require('../models/Toiletries');
const Trip = require('../models/Trip');


router.get('/details/:id', (req, res, next)=>{

    Toiletries.findById(req.params.id)
    .then((theToiletries)=>{
        res.json(theToiletries)
    })

    .catch((err)=>{
        res.json(err);
    })

})


router.post('/', (req, res, next)=>{

    let tripID = req.body.theTrip;

    Toiletries.create({
        name: req.body.theName,
        // weight: req.body.theweight,
    })

    .then((theToiletries)=>{ 

        Trip.findByIdAndUpdate(tripID, {
            $push: {Toiletriess: theToiletries._id}
        })

        .then((response)=>{
            res.json({response, theToiletries})
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

    Toiletries.findByIdAndUpdate(req.params.id, {
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

    Toiletries.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })

    .catch((err)=>{
        res.json(err)
    })

})


module.exports = router;