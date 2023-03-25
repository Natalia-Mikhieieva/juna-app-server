const router = require("express").Router();
const Item = require("../models/Item.model");
const mongoose = require("mongoose");

const fileUploader = require("../config/cloudinary.config");

//  POST Create new item
router.post(
  "/item/create",
  fileUploader.single("itemImage"),
  (req, res, next) => {
    const {
      title,
      brand,
      description,
      price,
      stock,
      user,
      owner,
      imageUrl,
      comments,
    } = req.body;

    Item.create({
      title,
      brand,
      description,
      price,
      stock,
      user,
      owner,
      imageUrl,
      comments,
    })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }
);

//GET route for an item
router.get("/item/:itemId", (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.findById(req.params.itemId)
    // .populate('User')
    .then((oneItem) => res.status(200).json(oneItem))
    .catch((err) => {
      console.log(err);
    });
});

//router for the DELETE one ITEM button =>
router.post("/item/:itemId/delete", (req, res) => {
  const { itemId } = req.params;

  Pets.findByIdAndDelete(itemId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// GET route to display the form to update an ITEM
router.get("/item/:itemId/edit", (req, res, next) => {
  Item.findById(req.params.itemId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// POST route to actually make updates on a specific ITEM
router.post(
  "/item/:itemId/edit",
  fileUploader.single("itemImage"),
  (req, res) => {
    const { title, brand, description, price, stock, user, owner, comments } =
      req.body;

    let itemImageNew;
    if (req.file) {
      itemImageNew = req.file.path;
    } else {
      itemImageNew = itemImage;
    }

    Pets.findByIdAndUpdate(
      req.params.itemId,
      {
        title: title,
        brand: brand,
        description: description,
        price: price,
        stock: stock,
        user: user,
        imageUrl: imageUrl,
        owner: owner,
        comments: comments,
      },
      { new: true }
    )

      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }
);

module.exports = router;
