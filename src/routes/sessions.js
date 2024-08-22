const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');
const auth = require('../middleware/auth'); 

router.post('/addSession', auth, sessionsController.addSession); 
router.get('/activeSessions', auth, sessionsController.getActiveSessionsByStudentId);
router.get('/activeSessionsForTeachers', auth, sessionsController.getActiveSessionsByTeacherId);
router.post('/updateCompletedStatus', auth, sessionsController.updateCompletedSessionStatus);
router.get('/completedSessions', auth, sessionsController.getCompletedSessionsByStudentId);
router.get('/completedSessionsForTeachers', auth, sessionsController.getCompletedSessionsByTeacherId);
router.post('/updateCancelledStatus', auth, sessionsController.updateCancelledSessionStatus);
router.get('/cancelledSessions', auth, sessionsController.getCancelledSessionsByStudentId);
router.get('/cancelledSessionsForTeachers', auth, sessionsController.getCancelledSessionsByTeacherId);
router.post('/uploadRecording', auth, sessionsController.uploadRecording);

module.exports = router;