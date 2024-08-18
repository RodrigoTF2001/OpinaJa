<template>
  <v-container class="main-container" fluid>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <h1 style="margin-left: 120px; margin-bottom: 40px;color: #4c8132;">Panel Enquete</h1>
        <v-btn style="background-color: #79ce4e;color: white;" @click="openModal">Criar Nova Enquete</v-btn>
        <v-btn style="background-color: #79ce4e;color: white;">Enquetes Anteriores</v-btn>
      </v-col>
      <PollResults :polls="polls" />
    </v-row>
    <v-dialog v-model="isModalOpen" max-width="800">
      <CreatePoll @poll-created="addPoll" />
    </v-dialog>
  </v-container>
</template>

<script setup>
const isModalOpen = ref(false);
const polls = ref([]);

const openModal = () => {
  isModalOpen.value = true;
};

const addPoll = (poll) => {
  polls.value.push(poll);
  isModalOpen.value = false;
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #79ce4e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-btn {
  margin: 10px;
}
</style>
