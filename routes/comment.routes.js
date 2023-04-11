const router = require("express").Router();
const Comment = require("../models/Comment.model");
const mongoose = require("mongoose");
const Item = require("../models/Item.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")

//creating comment
router.post('/item/:itemId/comments', isAuthenticated, (req,res) => {
    const {itemId} = req.params;
    const { 
      message, 
      author,
      timestamp
    } = req.body;
      
      Comment.create({
        message,
        author,
        timestamp
      })
      .then((newComment) => {
        return Item.findByIdAndUpdate(itemId, {
          $push: { comments: newComment._id }
        })
      })
      .then((response) => res.json(response))
      .catch((err) => console.log("error with comment", err))
    })
  //   Item.findById(itemId)
  //   .then(dbItem => {
  //     let newComment;
  //     if(!message){
  //       res.json(`/item/${itemId}`)
  //       return 
  //     }
  
  //     newComment = new Comment({message, author: req.payload.name, timestamp});
  
  //     newComment
  //     .save()
  //     .then(dbComment => {
  //       dbItem.comments.push(dbComment._id);
  //       dbItem
  //         .save()      
  //         .then(updatedItem => res.json(updatedItem))
  //     })
  //     .catch((err) => res.json(err));
  //   });
  // })

  router.get("comments/:commentsId", (req,res,next) => {
    const { itemId } = req.params;
    const { commentsId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(commentsId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    Comment.findById(req.params.commentsId)
      // .populate('User')
      .then((oneComment) => {
        console.log(oneComment);
        res.status(200).json(oneComment);
      })
  
      .catch((err) => {
        console.log(err);
      });
  });


  
  router.delete('/comments/:commentId/delete', (req,res) => {
    const { commentId } = req.params;
    Comment.findByIdAndDelete(commentId)
      .then((response) => {res.json(response)})
      .catch((error) => console.log(`There is a delete error: ${error}`));
  })



module.exports = router;
