<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card min-width="500">
          <v-card-title style="color: green"> Criar Enquete </v-card-title>

          <v-form @submit.prevent="createPoll">
            <v-text-field
              v-model="newPoll.question"
              label="Pergunta"
              required
              class="mb-4"
            />
            <div v-for="(option, index) in newPoll.options" :key="index">
              <v-text-field
                type="text"
                :label="'Opção ' + (index + 1)"
                v-model="option.text"
                required
                class="mb-2"
              />
            </div>
            <v-card-actions>
              <v-btn type="submit" color="green">Criar</v-btn>
              <v-btn @click="addOption" color="green"> Adicionar Opção </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const emit = defineEmits();

const createEmptyOptions = (count) => {
  return Array.from({ length: count }, () => ({ text: "", votes: 0 }));
};

const newPoll = ref({
  question: "",
  options: createEmptyOptions(3), 
});

function createPoll() {
  const isPollValid =
    newPoll.value.question.trim() &&
    newPoll.value.options.every((option) => option.text.trim());

  if (!isPollValid) {
    alert("Por favor, preencha todos os campos da pergunta e das opções.");
  } else{

    emit("poll-created", { ...newPoll.value });
    newPoll.value = {
      question: "",
      options: createEmptyOptions(3),
    };
  }

}

function addOption() {
  newPoll.value.options.push({ text: "", votes: 0 });
}
</script>

<style scoped></style>
