<template>
  <div class="about">
    <h1>This is an Comments page fog card {{ $route.params.id }}</h1>
    <div v-for="node in comments">
      <div v-for="comment in node.comments.nodes">
        <span>{{ comment.createdAt }}</span>
        <span>{{ comment.bodyText }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Comments",
  data() {
    return {
      comments: []
    }
  },
  mounted() {
    console.log("ID", this.id())
    this.loadComments()
  },
  methods: {
    id() { return  this.$route.params.id },
    async loadComments() {
      try {
        const response = await axios.post('https://api.github.com/graphql', {
          query: `{
            search(query: "${this.id}", type: ISSUE, last: 100) {
              nodes {
                ... on Issue {
                  comments(last: 100) {
                    nodes {
                      bodyText
                      createdAt
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
        this.comments = response.data.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}

</script>
<style>

</style>
