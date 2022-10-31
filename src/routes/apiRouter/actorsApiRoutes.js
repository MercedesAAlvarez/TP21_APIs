const express = require('express');
const router = express.Router();
const actorsController = require('../../controllers/apiControllers/actorsController');


//Rutas exigidas para la creación del CRUD
router.post('/actors/create', actorsController.create);
router.delete('/actors/delete/:id', actorsController.destroy);



module.exports = router;