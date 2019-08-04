const express = require('express');
const router = express.Router();

const Electronics = require('../models/Electronics');
const Trip = require('../models/Trip');


router.get('/details/:id', (req, res, next)=>{

    Electronics.findById(req.params.id)
    .then((theElectronics)=>{
        res.json(theElectronics)
    })

    .catch((err)=>{
        res.json(err);
    })

})


router.post('/', (req, res, next)=>{

    let tripID = req.body.theTrip;

    Electronics.create({
        name: req.body.theName,
        // weight: req.body.theweight,
    })

    .then((theElectronics)=>{ 

        Trip.findByIdAndUpdate(tripID, {
            $push: {Electronicss: theElectronics._id}
        })

        .then((response)=>{
            res.json({response, theElectronics})
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

    Electronics.findByIdAndUpdate(req.params.id, {
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

    Electronics.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })

    .catch((err)=>{
        res.json(err)
    })

})


module.exports = router;