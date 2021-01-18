const express = require('express');
const router = express.Router();
var checkWord = require('check-word'),
    words     = checkWord('en');
const middleware = require('./middleware')

router.get('/', (req, res) => {
  try {
    res.json({
      letters: middleware.initDailyWord(),
      required: "n"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', (req, res) => {
  try {
    var check = words.check((req.body.wordToCheck).toLowerCase());

    res.json({
      word: req.body.wordToCheck,
      isWord: check
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;