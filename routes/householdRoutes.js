const express = require('express');
const router = express.Router();

const Household = require('../models/Household');
const Trip = require('../models/Trip');


router.get('/details/:id', (req, res, next)=>{

    Household.findById(req.params.id)
    .then((theHousehold)=>{
        res.json(theHousehold)
    })

    .catch((err)=>{
        res.json(err);
    })

})


router.post('/', (req, res, next)=>{

    let tripID = req.body.theTrip;

    Household.create({
        name: req.body.theName,
        // weight: req.body.theweight,
    })

    .then((theHousehold)=>{ 

        Trip.findByIdAndUpdate(tripID, {
            $push: {household: theHousehold._id}
        })

        .then((response)=>{
            res.json({response, theHousehold})
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

    Household.findByIdAndUpdate(req.params.id, {
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

    Household.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })

    .catch((err)=>{
        res.json(err)
    })

})


module.exports = router;