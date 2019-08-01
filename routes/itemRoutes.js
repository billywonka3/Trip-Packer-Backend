const express = require('express');
const router = express.Router();

const Item = require('../models/Item');
const Category = require('../models/Category');


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

    let categoryID = req.body.theCategory;

    Item.create({
        subcategory: req.body.theSubcategory,
        name: req.body.theName,
        weight: req.body.theweight,
    })

    .then((theItem)=>{ 

        Category.findByIdAndUpdate(categoryID, {
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
      weight: req.body.theweight,
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