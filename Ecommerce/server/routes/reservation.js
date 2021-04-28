const express = require('express');

const router = express.Router();

// middlewares
const{authCheck, adminCheck} = require('../middlewares/auth');

// controllers
const { create, update, remove, list, listByProduct } = require('../controllers/reservation');

//routes
router.post('/resercation', authCheck, adminCheck, create);
router.get('/reservations', list);
router.get('/reservations/:productId', listByProduct);
// router.put('/calendar/:slug', authCheck, adminCheck, update);
// router.delete('/calendar/:slug', authCheck, adminCheck, remove);
module.exports = router;

