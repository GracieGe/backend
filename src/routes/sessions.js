const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');
const auth = require('../middleware/auth'); 

router.post('/addSession', auth, sessionsController.addSession); 

module.exports = router;