const express = require('express');
const router  = express.Router();

const Trip = require('../models/Trip');
const Clothing    = require('../models/Clothing');
const Toiletries    = require('../models/Toiletries');
const Electronics    = require('../models/Electronics');

/* GET home page */
router.get('/', (req, res, next) => {
  // this route is actualy localhost:3000/api/trips 
  //  because of the preface i put on this routes file in app.js

  Trip.find().populate('clothing').populate('toiletries').populate('electronics')
  .then((allTheTrips)=>{
    res.json(allTheTrips);
  })

  .catch((err)=>{
    res.json(err);
  })

});


router.get('/details/:id', (req, res, next)=>{

  Trip.findById(req.params.id).populate('clothing').populate('toiletries').populate('electronics')

  .then((singleTrip)=>{
    res.json(singleTrip);
  })

  .catch((err)=>{
    res.json(err);
  })

})


router.post('/', (req, res, next)=>{

  // Pre-generated Item Lists (for Clothing, Toiletries, Electronics)
  let clothCatA = new Clothing ({category: 'Tops'})
  clothCatA.save( (err)=>{ if(err){console.log(err);} } )
  let clothCatB = new Clothing ({category: 'Bottoms'})
  clothCatB.save( (err)=>{ if(err){console.log(err);} } )

  let hygieneA = new Toiletries ({name: 'Toothbrushes'})
  hygieneA.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneB = new Toiletries ({name: 'Toothpaste'})
  hygieneB.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneC = new Toiletries ({name: 'Shampoo'})
  hygieneC.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneD = new Toiletries ({name: 'Nail Clippers'})
  hygieneD.save( (err)=>{ if(err){console.log(err);} } )

  let elecA = new Electronics ({name: 'Laptop & Charger'})
  elecA.save( (err)=>{ if(err){console.log(err);} } )
  let elecB = new Electronics ({name: 'Phone Chargers'})
  elecB.save( (err)=>{ if(err){console.log(err);} } )
  let elecC = new Electronics ({name: 'Battery Pack'})
  elecC.save( (err)=>{ if(err){console.log(err);} } )
  let elecD = new Electronics ({name: 'Tablet'})
  elecD.save( (err)=>{ if(err){console.log(err);} } )
  let elecE = new Electronics ({name: 'Headphones'})
  elecE.save( (err)=>{ if(err){console.log(err);} } )


  // ----------------------------------------------------------------

  Trip.create({
    title: req.body.theTitle,
    description: req.body.theDescription,
    clothing: [clothCatA._id, clothCatB._id, ],
    toiletries: [hygieneA._id, hygieneB._id, hygieneC._id, hygieneD._id, ],
    electronics: [elecA._id, elecB._id, elecC._id, elecD._id, elecE._id, ],
    // user.myClothing: [],
    // user.myToiletries: [],
    // user.myElectronics: [],
    owner: req.user._id
  })

  .then((singleTrip)=>{
    res.json(singleTrip);
  })

  .catch((err)=>{
    res.json(err);
  })

})


router.post('/update/:id', (req, res, next)=>{

  Trip.findByIdAndUpdate(req.params.id, {
    title: req.body.theTitle,
    description: req.body.theDescription
  })

  .then((singleTrip)=>{
    res.json(singleTrip);
  })

  .catch((err)=>{
    res.json(err);
  })

})


router.delete('/:id', (req, res, next)=>{

  Trip.findById(req.params.id)
  .then((theTrip)=>{

    theTrip.clothing.forEach(eachClothingID => {
      Clothing.findByIdAndRemove(eachClothingID)
    })
    theTrip.toiletries.forEach(eachToiletriesID => {
      Toiletries.findByIdAndRemove(eachToiletriesID)
    })
    theTrip.electronics.forEach(eachElectronicsID => {
      Electronics.findByIdAndRemove(eachElectronicsID)
    })

    Trip.findByIdAndRemove(theTrip._id)
    .then((singleTrip)=>{
      res.json(singleTrip);
    })

    .catch((err)=>{
      res.json(err);
    })

  })
  .catch((err)=>{
    res.json(err);
  })

})


module.exports = router;
