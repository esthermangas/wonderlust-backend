const express = require('express');
const router = express.Router();
const placesController = require("../controllers/places");

router.get("/", placesController.index);
router.get("/:id", placesController.getPlace, placesController.getOne);
router.post("/", placesController.createOne);
router.patch("/:id", placesController.getPlace, placesController.updateOne);
router.delete("/:id", placesController.getPlace, placesController.deleteOne);


module.exports = router;