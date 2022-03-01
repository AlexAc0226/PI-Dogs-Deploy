const { Router } = require('express');

const countriesRouter = require('./Countries.js');
const activityRouter = require('./Activities.js');

const router = Router();


router.use('/countries', countriesRouter);
router.use('/activity', activityRouter);

module.exports = router;
