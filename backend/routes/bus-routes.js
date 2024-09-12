const express = require("express");
const { body } = require("express-validator");
const {
  addBus,
  getAllBuses,
  getBus,
  updateBus,
  deleteBus,
} = require("../controllers/busController");

const router = express.Router();

router.post(
  "/",
  [
    body("licenceNo")
      .notEmpty()
      .withMessage("Licence number cannot be empty")
      .trim()
      .escape(),
    body("capacity")
      .isNumeric()
      .withMessage("Capacity must be numeric")
      .toInt(),
    body("plateNo")
      .notEmpty()
      .withMessage("Plate number cannot be empty")
      .trim()
      .escape(),
  ],
  addBus
);
router.get("/", getAllBuses);
router.get("/:id", getBus);
router.put("/:id", updateBus);
router.delete("/:id", deleteBus);

module.exports = {
  routes: router,
};
