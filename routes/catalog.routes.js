const router = require("express").Router();
const Catalog = require("../models/Catalog.model");
const Item = require("../models/Item.model");

//  POST /api/catalog  -  Creates a new Catalog
router.post("/catalog", (req, res, next) => {
  const { title, description, user, imageUrl } = req.body;

  Catalog.create({ title, description, user, imageUrl })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/catalog", (req, res, next) => {
  Catalog.find()
    .then((allCatalog) => {
      res.json(allCatalog);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
