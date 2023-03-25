const router = require("express").Router();
const Collection = require("../models/Collection.model");
const Item = require("../models/Item.model");

//  POST /api/collections  -  Creates a new collection
router.post("/collection", (req, res, next) => {
  const { title, description, user, imageUrl } = req.body;

  Collection.create({ title, description, user, imageUrl })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/collection", (req, res, next) => {
  Collection.find()
    .then((allCollections) => {
      res.json(allCollections);
    })
    .catch((error) => {
      console.log(error);
    });
});




module.exports = router;
