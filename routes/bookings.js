const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/booking');

router.get("/", bookingsController.index);
router.get("/:id", bookingsController.getBooking, bookingsController.getOne);
router.post("/", bookingsController.createOne);
router.patch("/:id", bookingsController.getBooking, bookingsController.updateOne);
router.delete("/:id", bookingsController.getBooking, bookingsController.deleteOne);

module.exports = router;