const express = require('express');
const router  = express.Router();

const Trip = require('../models/Trip');
const Item    = require('../models/Item');


/* GET home page */
router.get('/', (req, res, next) => {
  // this route is actualy localhost:3000/api/categories 
  //  because of the preface i put on this routes file in app.js

  Trip.find().populate('items')
  .then((allTheCategories)=>{
    res.json(allTheCategories);
  })

  .catch((err)=>{
    res.json(err);
  })

});


// router.get('/details/:id', (req, res, next)=>{

//   Trip.findById(req.params.id).populate('items')

//   .then((singleTrip)=>{
//     res.json(singleTrip);
//   })

//   .catch((err)=>{
//     res.json(err);
//   })

// })


router.post('/', (req, res, next)=>{

  Trip.create({
    title: req.body.theTitle,
    items: [],
    owner: req.user._id
  })

  .then((singleTrip)=>{
    res.json(singleTrip);
  })

  .catch((err)=>{
    res.json(err);
  })

})


// router.post('/update/:id', (req, res, next)=>{

//   Trip.findByIdAndUpdate(req.params.id, {
//     title: req.body.theTitle,
//   })

//   .then((singleTrip)=>{
//     res.json(singleTrip);
//   })

//   .catch((err)=>{
//     res.json(err);
//   })

// })


// router.delete('/:id', (req, res, next)=>{

//   Trip.findById(req.params.id)
//   .then((theTrip)=>{

//     theTrip.items.forEach(eachItemID => {
//       Item.findByIdAndRemove(eachItemID)
//     })

//     Trip.findByIdAndRemove(theTrip._id)
//     .then((singleTrip)=>{
//       res.json(singleTrip);
//     })

//     .catch((err)=>{
//       res.json(err);
//     })

//   })
//   .catch((err)=>{
//     res.json(err);
//   })

// })


module.exports = router;
