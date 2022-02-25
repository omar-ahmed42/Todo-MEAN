const express = require("express");
const {login, logout} = require("../controllers/authentication");
const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
