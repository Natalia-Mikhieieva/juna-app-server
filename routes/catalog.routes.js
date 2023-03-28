const router = require("express").Router();
const Catalog = require("../models/Catalog.model");
const Item = require("../models/Item.model");

//  POST /api/collections  -  Creates a new collection
router.post("/catalog", (req, res, next) => {
  const { title, description, user, imageUrl } = req.body;

  Catalog.create({ title, description, user, imageUrl })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/catalog", (req, res, next) => {
  Catalog.find()
    .then((allCollections) => {
      res.json(allCollections);
    })
    .catch((error) => {
      console.log(error);
    });
});




module.exports = router;
