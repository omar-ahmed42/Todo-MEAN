const express = require('express');
const {signup} = require("../controllers/registration");
const router = express.Router();

router.post('/signup', signup);

module.exports = router;
