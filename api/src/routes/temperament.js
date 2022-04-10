const { Router } = require("express");
const router = Router();

const { addTemperaments, getTemperaments } = require("../constrollers/Temperament.js");

router.get("/", addTemperaments);

module.exports = router;