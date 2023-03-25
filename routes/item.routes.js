const router = require("express").Router();
const Item = require("../models/Item.model");
const mongoose = require("mongoose");

//  POST Create new product

router.post("/item", (req, res, next) => {
  const { title, brand, description, price, stock, user, owner, comments } =
    req.body;

  Product.create({
    title,
    brand,
    description,
    price,
    stock,
    user,
    owner,
    comments,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
