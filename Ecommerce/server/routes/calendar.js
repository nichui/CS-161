const express = require('express');

const router = express.Router();

// middlewares
const{authCheck, adminCheck} = require('../middlewares/auth');

// controllers
const { create, read, update, remove, list } = require('../controllers/calendar');

//routes
router.post('/calendar', authCheck, adminCheck, create);
router.get('/calendars', list);
router.get('/calendar/:slug', read);
router.put('/calendar/:slug', authCheck, adminCheck, update);
router.delete('/calendar/:slug', authCheck, adminCheck, remove);
module.exports = router;

