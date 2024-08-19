<template>
  <v-container>
    <v-row>
      <v-col v-for="(poll, index) in polls" :key="index" cols="12" md="4">
        <v-card>
          <v-card-title
            style="
              display: flex;
              justify-content: center;
              font-weight: bold;
              color: #79ce4e;
            "
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
                    <v-list-item>
                      <v-list-item-title>{{ option.text }}</v-list-item-title>
                    </v-list-item>
                  </v-col>
                  <v-col style="display: flex; gap: 10px" cols="auto">
                    <v-icon @click="increaseVote(index, i)">mdi-plus</v-icon>
                    <span>{{ option.votes }}</span>
                    <v-icon @click="decreaseVote(index, i)">mdi-minus</v-icon>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              style="margin-left: 80px"
              @click="finalizePoll(poll.id, index)"
              color="red"
              >Finalizar Enquete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const emit = defineEmits();

const { $toast } = useNuxtApp();

const props = defineProps({
  polls: {
    type: Array,
    required: true,
  },
});

async function updatePollVotes(pollId, options) {
  try {
    await $fetch(`/api/poll`, {
      method: "PUT",
      body: { id: pollId, options },
    });
  } catch (error) {
    console.error("Erro ao atualizar votos:", error);
  }
}

function increaseVote(pollIndex, optionIndex) {
  props.polls[pollIndex].options[optionIndex].votes++;
  updatePollVotes(props.polls[pollIndex].id, props.polls[pollIndex].options);
}

function decreaseVote(pollIndex, optionIndex) {
  const currentVotes = props.polls[pollIndex].options[optionIndex].votes;
  if (currentVotes > 0) {
    props.polls[pollIndex].options[optionIndex].votes--;
    updatePollVotes(props.polls[pollIndex].id, props.polls[pollIndex].options);
  }
}

async function finalizePoll(pollId, index) {
  await $fetch("/api/poll", {
    method: "DELETE",
    body: { id: pollId },
  });
  props.polls.splice(index, 1);
  $toast.error("Enquete encerrada/deletada! ");
}
</script>
