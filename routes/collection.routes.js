const router = require("express").Router();
const Collection = require('../models/Collection.model')
const Item = require('../models/Item.model')

router.post('/collection',(req,res,next)=>{
    const {title,
        creator,
        user, 
        comments} = req.body


    Collection.create({title,
        creator,
        user, 
        comments})
    .then(newCollection=>{
        console.log(newCollection)
        res.json(newCollection)})
    .catch(error=>console.log(error))
})

router.get('/collection',(req,res,next)=>{
    Collection.find()
    .then(allCollections=>{
        res.json(allCollections)
    })
    .catch((error)=>{
        console.log(error)
    })
})

router.get('/collection/:itemId',(req,res,next)=>{
    console.log(req.params.itemId)
    Collection.findById(req.params.itemId)
    .then(oneItem=>{
        res.json(oneItem)
    })
})

module.exports = router;