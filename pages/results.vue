<template>
    <v-container>
      <v-card>
        <v-card-title>{{ poll.question }}</v-card-title>
        <v-card-text>
          <div v-for="option in poll.options" :key="option.id">
            <v-progress-linear
              :value="option.votes / totalVotes * 100"
              color="primary"
            >
              {{ option.text }} - {{ option.votes }} votos
            </v-progress-linear>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        poll: {},
        totalVotes: 0,
      }
    },
    async fetch() {
      const { data, error } = await this.$http.get(`/api/polls/${this.$route.query.id}`);
      if (error) {
        console.error('Erro ao carregar resultados:', error);
      } else {
        this.poll = data;
        this.totalVotes = data.options.reduce((sum, option) => sum + option.votes, 0);
      }
    }
  }
  </script>
  