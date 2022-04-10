const { Router } = require("express");
const router = Router();

const { addTemperaments, getTemperaments } = require("../constrollers/Temperament.js");

router.get("/", getTemperaments);

module.exports = router;