<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card min-width="500">
          <v-container>
            <v-row align="center" justify="space-between" class="mb-5">
              <v-card-title style="color: green"> Criar Enquete </v-card-title>

              <v-icon @click="closeModal" style="cursor: pointer"
                >mdi-close</v-icon
              >
            </v-row>
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
                <v-btn @click="addOption" color="green">
                  Adicionar Opção
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const emit = defineEmits();

const { $toast } = useNuxtApp();

const createEmptyOptions = (count) => {
  return Array.from({ length: count }, () => ({ text: "", votes: 0 }));
};

const newPoll = ref({
  question: "",
  options: createEmptyOptions(3),
});

async function createPoll() {
  const isPollValid =
    newPoll.value.question.trim() &&
    newPoll.value.options.every((option) => option.text.trim());

  if (!isPollValid) {
    $toast.error("Por favor, preencha todos os campos da pergunta e das opções.");
  } else {
    const { data, error,status } = await useFetch("/api/poll", {
      method: "POST",
      body: { ...newPoll.value },
    });

    if (status.value === 'error' && error.value.statusCode === 500) {
      $toast.error("Erro ao criar enquete.");
    }else{
      emit("poll-created", { id: data.value.id,...data.value});
      newPoll.value = {
        question: "",
        options: createEmptyOptions(3),
      };
      $toast.success("Enquete criada com sucesso!");
    }
  }
}

function closeModal() {
  emit("close-modal");
}

function addOption() {
  newPoll.value.options.push({ text: "", votes: 0 });
}
</script>

<style scoped></style>
