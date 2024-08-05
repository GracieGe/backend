const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');
const auth = require('../middleware/auth'); 

router.post('/addSession', auth, sessionsController.addSession); 
router.get('/activeSessions', auth, sessionsController.getActiveSessionsByStudentId);
router.post('/updateCompletedStatus', auth, sessionsController.updateCompletedSessionStatus);
router.get('/completedSessions', auth, sessionsController.getCompletedSessionsByStudentId);
router.post('/updateCancelledStatus', auth, sessionsController.updateCancelledSessionStatus);
router.get('/cancelledSessions', auth, sessionsController.getCancelledSessionsByStudentId);
router.post('/uploadRecording', auth, sessionsController.uploadRecording);

module.exports = router;