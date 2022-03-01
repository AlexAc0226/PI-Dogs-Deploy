const { Router } = require("express");
const router = Router();

const {
  getCountries /*addInfoDb*/,
  getCountriesById
} = require("../constrollers/Countries.js");

router.get("/:id", getCountriesById);
router.get("/", getCountries);

module.exports = router;
