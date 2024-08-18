<template>
  <v-container>
    <v-row>
      <v-col v-for="(poll, index) in polls" :key="index" cols="12" md="4">
        <v-card>
          <v-card-title
            style="display: flex; justify-content: center; font-weight: bold;color:#79ce4e;"
          >
            {{ poll.question }}
          </v-card-title>
          <v-card-subtitle>
            <v-list dense>
              <v-list-item
                v-for="(option, i) in poll.options.sort((a, b) => b.votes - a.votes)"
                :key="i"
              >
                <v-row align="center">
                  <v-col>
                    <v-list-item-content>
                      <v-list-item-title>{{ option.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-col>
                  <v-col style="display: flex; gap: 10px;" cols="auto">
                    <v-icon @click="increaseVote(index, i)">mdi-plus</v-icon>
                    <span>{{ option.votes }}</span>
                    <v-icon @click="decreaseVote(index, i)">mdi-minus</v-icon>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card-subtitle>

          <v-card-actions>

              <v-btn style="margin-left: 80px;" @click="finalizePoll(index)" color="red"
                >Finalizar Enquete</v-btn
              >
            </v-card-actions>
  
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  polls: {
    type: Array,
    required: true,
  },
});

// Garantir que cada opção tenha votos inicializados como 0
props.polls.forEach((poll) => {
  poll.options.forEach((option) => {
    if (typeof option.votes !== 'number') {
      option.votes = 0;
    }
  });
});

function increaseVote(pollIndex, optionIndex) {
  props.polls[pollIndex].options[optionIndex].votes++;
}

function decreaseVote(pollIndex, optionIndex) {
  const currentVotes = props.polls[pollIndex].options[optionIndex].votes;
  if (currentVotes > 0) {
    props.polls[pollIndex].options[optionIndex].votes--;
  }
}

function finalizePoll(index) {
  props.polls.splice(index, 1);
}
</script>
