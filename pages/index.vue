<template>
  <div v-if="pending">Carregando..</div>
  <div v-else-if="error">{{ error.message }}</div>
  <v-container v-else class="main-container" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" class="text-center">
        <h1 style="margin-bottom: 20px;color: #4c8132;">Panel Enquete</h1>
        <v-btn style="background-color: #79ce4e;color: white;" @click="openModal">Criar Nova Enquete</v-btn>
      </v-col>
      <PollResults :polls="polls" />
    </v-row>
    <v-dialog v-model="isModalOpen" max-width="800">
      <CreatePoll @poll-created="addPoll" @close-modal="closeModal" @update-polls="updatePolls"/>
    </v-dialog>
  </v-container>
</template>

<script setup>
const isModalOpen = ref(false);
const polls = ref([]);

const { data:enquetes, error,pending } = await useLazyFetch('/api/poll');
 polls.value = enquetes.value;

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const addPoll = (poll) => {
  polls.value.push(poll);
  isModalOpen.value = false;
};

function updatePolls(updatedPolls) {
  polls.value = updatedPolls;
}
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #79ce4e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
