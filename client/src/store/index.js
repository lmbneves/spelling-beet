import axios from 'axios'

const state = {
  game: {
    letters: [],
    required: '',
    max_score: '',
    word_list: [],
    pangram_list: [],
    pluckables: ''
  },
  pluckedWords: [],
  total_score: 0
}

const getters = {
  pluckablesList: (state) => {
    return state.game.pluckables;
  },
  creamOfTheCrop: (state) => {
    return state.game.required;
  },
  pangramList: (state) => {
    return state.game.pangram_list;
  },
  wordList: (state) => {
    return state.game.word_list;
  },
  getPluckedWords: (state) => {
    return state.pluckedWords;
  },
  getWordObj: (state) => (word) => {
    console.log(word);
    return state.game.word_list.find(item => item.word === word);
  },
  getTotalScore: (state) => {
    return state.total_score;
  }
}

const actions = {
  initGame: function (context) {
    axios
      .get('http://localhost:3000/plot')
      .then(res => res.data)
      .then((res) => {
        context.commit( "INITGAME", {
          letters: res.letters,
          required: res.required,
          max_score: res.max_score,
          word_list: res.word_list,
          pangram_list: res.pangram_list
        });
      });
  }
}

const mutations = {
  INITGAME: function (state, payload) {
    state.game.letters = payload.letters;
    state.game.required = payload.required;
    state.game.max_score = payload.max_score;
    state.game.word_list = payload.word_list;
    state.game.pangram_list = payload.pangram_list;
    state.game.pluckables = (payload.required).split("").concat(payload.letters);
  },
  addPluckedWord: function (state, word) {
    state.pluckedWords.push(word);
  },
  addToScore: function(state, points) {
    state.total_score += points;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}