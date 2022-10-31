const express = require('express');
const router = express.Router();
const genresController = require('../../controllers/apiControllers/genresController');

router.get('/genres', genresController.list);



module.exports = router;