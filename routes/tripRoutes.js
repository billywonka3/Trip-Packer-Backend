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
  let clothA = new Clothing ({name: 'Shirts x4'})
  clothA.save( (err)=>{ if(err){console.log(err);} } )
  let clothB = new Clothing ({name: 'Pants x4'})
  clothB.save( (err)=>{ if(err){console.log(err);} } )
  let clothC = new Clothing ({name: 'Underpants x4'})
  clothC.save( (err)=>{ if(err){console.log(err);} } )
  let clothD = new Clothing ({name: 'Pairs of Socks x4'})
  clothD.save( (err)=>{ if(err){console.log(err);} } )

  let hygieneA = new Toiletries ({name: 'Toothbrush'})
  hygieneA.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneB = new Toiletries ({name: 'Toothpaste'})
  hygieneB.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneC = new Toiletries ({name: 'Floss'})
  hygieneC.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneD = new Toiletries ({name: 'Shampoo'})
  hygieneD.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneE = new Toiletries ({name: 'Nail Clipper'})
  hygieneE.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneF = new Toiletries ({name: 'Tweezers'})
  hygieneF.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneG = new Toiletries ({name: 'Q-tips or Cerumen Spoon'})
  hygieneG.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneH = new Toiletries ({name: 'Eye Drops'})
  hygieneH.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneI = new Toiletries ({name: 'Lip Balm'})
  hygieneI.save( (err)=>{ if(err){console.log(err);} } )
  let hygieneJ = new Toiletries ({name: 'Deodorant'})
  hygieneJ.save( (err)=>{ if(err){console.log(err);} } )

  let elecA = new Electronics ({name: 'Laptop & Charger'})
  elecA.save( (err)=>{ if(err){console.log(err);} } )
  let elecB = new Electronics ({name: 'Phone Chargers'})
  elecB.save( (err)=>{ if(err){console.log(err);} } )
  let elecC = new Electronics ({name: 'Battery Pack'})
  elecC.save( (err)=>{ if(err){console.log(err);} } )
  let elecD = new Electronics ({name: 'Headphones'})
  elecD.save( (err)=>{ if(err){console.log(err);} } )
  let elecE = new Electronics ({name: 'Tablet'})
  elecE.save( (err)=>{ if(err){console.log(err);} } )


  // ----------------------------------------------------------------

  Trip.create({
    title: req.body.theTitle,
    description: req.body.theDescription,
    clothing: [clothA._id, clothB._id, clothC._id, clothD._id, ],
    toiletries: [hygieneA._id, hygieneB._id, hygieneC._id, hygieneD._id, hygieneE._id, hygieneF._id, hygieneG._id, hygieneH._id, hygieneI._id, hygieneJ._id, ],
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
