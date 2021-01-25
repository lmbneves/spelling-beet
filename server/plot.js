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
    var total_score = game.total_score;
    var word_list = game.word_list;

    res.json({
      letters: letters,
      required: required,
      total_score: total_score,
      word_list: word_list
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.put('/', (req, res) => {
//   try {
//     var word = (req.body.wordToCheck).toLowerCase();
//     var check = words.check(word);

//     res.json({
//       word: word,
//       isWord: check
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;