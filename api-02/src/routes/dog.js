const { Router } = require('express');
const router = Router();

const { getDogsApiDb,
     getApiDbId, 
    createDog, 
    filterByTemperament,
    filterByHeight, 
    filterByYears,
    filterByWeight,
  
} = require('../constrollers/Dogs.js')

router.post('/create', createDog)

router.get('/weight', filterByWeight)
router.get("/years", filterByYears)
router.get("/height", filterByHeight)
router.use('/temp', filterByTemperament)
router.get('/:id', getApiDbId)
router.get('/', getDogsApiDb )

module.exports = router