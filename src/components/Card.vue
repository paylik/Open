<template>
  <div class="card" @click="isComments = !isComments">
<!--  <div class="card" @click="$router.push(`/comments/${card.id}`)" v-if="card">-->
    <h2>Title: {{ card.title }}</h2>
    <h3>Status: {{ card.state }}</h3>
    <h3>Description: {{ card.bodyText }}</h3>
  </div>
  <div v-if="isComments">
    <div v-for="comment in card.comments.nodes" class="commentItem">
      <div class="date"><time>{{ new Date(comment.createdAt).toLocaleString() }}</time></div>
      <div class="comment">{{ comment.bodyText }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      required: true
    } },
  data() {
    return {
      isComments: false
    }
  }
}
</script>

<style scoped>

.card {
  cursor: pointer;
  border: 1px solid darkgray;
  border-radius: 15px;
  width: 400px;
  margin: 10px auto;
}

.date {
  width: 30%;
}

.comment {
  width: 70%;
  text-align: left;
}

.commentItem {
  border-radius: 15px;
  border: 1px solid gray;
  margin: 5px;
  display: flex;
  flex-direction: row;
  padding: 15px;
}
</style>
