const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dog.js')
const temperamentRouter = require('./temperament.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter)
router.use('/temperament', temperamentRouter)

module.exports = router;