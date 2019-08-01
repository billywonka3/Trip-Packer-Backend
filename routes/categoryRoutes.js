const express = require('express');
const router  = express.Router();

const Category = require('../models/Category');
const Item    = require('../models/Item');


/* GET home page */
router.get('/', (req, res, next) => {
  // this route is actualy localhost:3000/api/categories 
  //  because of the preface i put on this routes file in app.js

  Category.find().populate('items')
  .then((allTheCategories)=>{
    res.json(allTheCategories);
  })

  .catch((err)=>{
    res.json(err);
  })

});


// router.get('/details/:id', (req, res, next)=>{

//   Category.findById(req.params.id).populate('items')

//   .then((singleCategory)=>{
//     res.json(singleCategory);
//   })

//   .catch((err)=>{
//     res.json(err);
//   })

// })


router.post('/', (req, res, next)=>{

  Category.create({
    title: req.body.theTitle,
    items: [],
    owner: req.user._id
  })

  .then((singleCategory)=>{
    res.json(singleCategory);
  })

  .catch((err)=>{
    res.json(err);
  })

})


// router.post('/update/:id', (req, res, next)=>{

//   Category.findByIdAndUpdate(req.params.id, {
//     title: req.body.theTitle,
//   })

//   .then((singleCategory)=>{
//     res.json(singleCategory);
//   })

//   .catch((err)=>{
//     res.json(err);
//   })

// })


// router.delete('/:id', (req, res, next)=>{

//   Category.findById(req.params.id)
//   .then((theCategory)=>{

//     theCategory.items.forEach(eachItemID => {
//       Item.findByIdAndRemove(eachItemID)
//     })

//     Category.findByIdAndRemove(theCategory._id)
//     .then((singleCategory)=>{
//       res.json(singleCategory);
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
