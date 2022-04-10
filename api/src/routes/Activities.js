const { Router } = require("express");
const router = Router();

const { newActivity, getActivity, getNameActivities, deleteActivity, updateActivity, filterActivities, allActivities } = require("../constrollers/Activities.js");

router.put("/:name", updateActivity)

router.delete("/delete", deleteActivity)

router.post("/new", newActivity);

router.get("/all", allActivities)
router.get("/filteredActivity", filterActivities)
router.get("/", getActivity);

module.exports = router;
