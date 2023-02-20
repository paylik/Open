<template>
  <div class="home">
    <div>
      <label>Sort by title</label>
      <input
        type="checkbox"
        v-model="isSorted"
        @change="changeCards"
      >
    </div>
    <select v-model="selectedCard">
      <option v-for="card in visibleCards" :value="card"> {{ card.title }} </option>
    </select>
    <Card v-if="selectedCard" :card="selectedCard"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: 'HomeView',
  components: {
    Card
  },
  data() {
    return {
      selectedCard: null,
      isSorted: false,
      visibleCards: []
    }
  },
  methods: {
    ...mapActions({ loadCards: "loadCards" }),
  },
  mounted() {
    this.loadCards().then(() => this.changeCards);

  },
  computed: {
    ...mapState({ cards: state => state.cards }),
    ...mapGetters({ sortedCards: 'sortedCards' }),
    changeCards() { this.visibleCards = this.isSorted ? this.sortedCards : this.cards }
  }
}
</script>
