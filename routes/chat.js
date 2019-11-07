const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const chat_con = require('../controllers/chat')
const mongoose = require('mongoose');

router.post('/loadHistory',chat_con.loadHistory)
router.post('/saveMsg',chat_con.saveMsg)

module.exports = router;


