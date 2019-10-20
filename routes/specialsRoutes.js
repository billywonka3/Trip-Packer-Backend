const express = require('express');
const router = express.Router();

const Specials = require('../models/Specials');
const Trip = require('../models/Trip');


router.get('/details/:id', (req, res, next)=>{

    Specials.findById(req.params.id)
    .then((theSpecials)=>{
        res.json(theSpecials)
    })

    .catch((err)=>{
        res.json(err);
    })

})


router.post('/', (req, res, next)=>{

    let tripID = req.body.theTrip;

    Specials.create({
        category: req.body.theCategory,
        name: req.body.theName,
        // weight: req.body.theweight,
    })

    .then((theSpecials)=>{ 

        Trip.findByIdAndUpdate(tripID, {
            $push: {Specials: theSpecials._id}
        }, {new: true})

        .then((response)=>{
            res.json({response, theSpecials})
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

    Specials.findByIdAndUpdate(req.params.id, {
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

    Specials.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })

    .catch((err)=>{
        res.json(err)
    })

})


module.exports = router;