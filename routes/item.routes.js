const router = require("express").Router();
const Item = require("../models/Item.model");
const Catalog = require("../models/Catalog.model");
const mongoose = require("mongoose");

const fileUploader = require("../config/cloudinary.config");

//  POST /api/items  -  Creates a new item
router.post(
  "/items/create-item",
  fileUploader.single("itemImage"),
  (req, res, next) => {
    const {
      title,
      brand,
      description,
      price,
      stock,
      user,
      imageUrl,
      category,
      comments,
      catalogId,
    } = req.body;

    Item.create({
      title,
      brand,
      description,
      price,
      stock,
      user,
      imageUrl,
      category,
      comments,
      catalogId,
    })
      .then((newItem) => {
        return Catalog.findByIdAndUpdate(catalogId, {
          $push: { items: newItem._id },
        });
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
    .then((oneItem) => {
      console.log(oneItem);
      res.status(200).json(oneItem);
    })

    .catch((err) => {
      console.log(err);
    });
});

// POST route to actually make updates on a specific ITEM
router.put("/item/:itemId/edit", (req, res) => {
  const {
    title,
    brand,
    description,
    price,
    stock,
    user,
    imageUrl,
    category,
    comments,
    catalog,
  } = req.body;

  let itemImageNew;
  if (req.file) {
    itemImageNew = req.file.path;
  } else {
    itemImageNew = imageUrl;
  }

  Item.findByIdAndUpdate(
    req.params.itemId,
    {
      title: title,
      brand: brand,
      description: description,
      price: price,
      stock: stock,
      user: user,
      category:  category,
      imageUrl: imageUrl,
      owner: owner,
      comments: comments,
      catalog: catalog,
    },
    { new: true }
  )

    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

//router for the DELETE one ITEM button =>
router.delete("/item/:itemId/delete", (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
