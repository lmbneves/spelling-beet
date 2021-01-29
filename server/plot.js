const express = require('express');
const router = express.Router();
var checkWord = require('check-word'),
    words     = checkWord('en');
const middleware = require('./middleware')

router.get('/', (req, res) => {
  try {
    var game = middleware.initGame();
    var letters = game.letters.split("");
    var required = letters.shift();
    var max_score = game.total_score;
    var word_list = game.word_list;
    var pangram_list = game.pangram_list;

    res.json({
      letters: letters,
      required: required,
      max_score: max_score,
      word_list: word_list,
      pangram_list: pangram_list
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;