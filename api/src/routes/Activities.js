const { Router } = require("express");
const router = Router();

const { newActivity, getActivity } = require("../constrollers/Activities.js");

router.post("/new", newActivity);
router.get("/", getActivity);


module.exports = router;
