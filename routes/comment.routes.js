const router = require("express").Router();
const Comment = require("../models/Comment.model");
const mongoose = require("mongoose");
const Item = require("../models/Item.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")

//creating comment
router.post('/item/:itemId/comment', isAuthenticated, (req,res) => {
    const {itemId} = req.params;
    const { message, author } = req.body;
  
    Item.findById(itemId)
    .then(dbItem => {
      let newComment;
      if(!message){
        res.json(`/item/${itemId}`)
        return 
      }
  
      newComment = new Comment({message,author: req.payload.name});
  
      newComment
      .save()
      .then(dbComment => {
        dbItem.comments.push(dbComment._id);
        dbItem
          .save()      
          .then(updatedItem => res.json(updatedItem))
      });
    });
  })
  
  router.delete('/comment/:commentId/delete', (req,res) => {
    const { commentId } = req.params;
    Comment.findByIdAndDelete(commentId)
      .then((response) => {res.json(response)})
      .catch((error) => console.log(`There is a delete error: ${error}`));
  })



module.exports = router;
