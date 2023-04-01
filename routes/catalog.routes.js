const router = require("express").Router();
const Catalog = require("../models/Catalog.model");
const Item = require("../models/Item.model");

//  POST /api/catalogs  -  Creates a new catalog
router.post("/catalogs", (req, res, next) => {
  const { title, description } = req.body;

  Catalog.create({
    title,
    description,
    items: [],
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// GET /api/catalogs -  Retrieves all of the catalogs
router.get("/catalogs", (req, res, next) => {
  Catalog.find()
    .populate("items")
    .then((allCatalogs) => res.json(allCatalogs))
    .catch((err) => res.json(err));
});

//  GET /api/catalogs/:catalogId -  Retrieves a specific catalog by id
router.get("/catalogs/:catalogId", (req, res, next) => {
  const { catalogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(catalogId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Catalog document has `items` array holding `_id`s of Item documents
  // We use .populate() method to get swap the `_id`s for the actual Item documents
  Catalog.findById(catalogId)
    .populate("items")
    .then((catalog) => res.status(200).json(catalog))
    .catch((error) => res.json(error));
});

// PUT  /api/catalogs/:catalogId  -  Updates a specific catalogs by id
router.put("/catalogs/:catalogId", (req, res, next) => {
  const { catalogsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(catalogsId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Catalog.findByIdAndUpdate(catalogId, req.body, { new: true })
    .then((updatedCatalog) => res.json(updatedCatalog))
    .catch((error) => res.json(error));
});

// DELETE  /api/catalogs/:catalogId  -  Deletes a specific catalog by id
router.delete("/catalogs/:catalogId", (req, res, next) => {
  const { catalogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(catalogId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Catalog.findByIdAndRemove(catalogId)
    .then(() =>
      res.json({
        message: `Catalog with ${catalogId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
