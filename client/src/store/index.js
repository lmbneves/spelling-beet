import axios from 'axios'

const state = {
  game: {
    letters: [],
    required: '',
    total_score: '',
    word_list: [],
    pangram_list: [],
    pluckables: ''
  },
  pluckedWords: []
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
          total_score: res.total_score,
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
    state.game.total_score = payload.total_score;
    state.game.word_list = payload.word_list;
    state.game.pangram_list = payload.pangram_list;
    state.game.pluckables = (payload.required).split("").concat(payload.letters);
  },
  addPluckedWord: function (state, word) {
    state.pluckedWords.push(word);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}