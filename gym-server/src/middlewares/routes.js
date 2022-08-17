const express = require('express');
const router = express.Router();

router.use('/members', require('../routes/members'));

router.use('/gym-machines', require('../routes/gym-machines'));

router.use('/employees', require('../routes/employees'));

router.use('/classes', require('../routes/classes'));

router.use('/attendance', require('../routes/attendance'));

module.exports = router;