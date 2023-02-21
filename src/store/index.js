import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    cards: [],
    owner: "octocat"
  },
  getters: {
    sortedCards(state) {
      return [...state.cards].sort((card1, card2) => card1.title.localeCompare(card2.title))
    },
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards;
    },
  },
  actions: {
    async loadCards({state, commit}) {
      try {
        const response = await axios.post('https://api.github.com/graphql', {
          query: `{
            user(login: "${state.owner}") {
              issues(last: 100) {
                nodes {
                  state
                  title
                  bodyText
                  id
                  comments(last: 100) {
                    nodes {
                      createdAt
                      bodyText
                    }
                  }
                }
              }
            }
          }`
        },
          {headers: {
              "Authorization": "bearer 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"
            }});
        commit('setCards', [...response.data.data.user.issues.nodes]);
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
