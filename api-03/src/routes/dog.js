const { Router } = require('express');
const router = Router();

const { getDogsApiDb, getApiDbId, createDog, filterByTemperament } = require('../constrollers/Dogs.js')

router.post('/create', createDog)

router.use('/temp', filterByTemperament)
router.get('/:id', getApiDbId)
router.get('/', getDogsApiDb )

module.exports = router