<template>
    <v-container>
      <v-form v-model="valid">
        <v-text-field
          label="Pergunta da Enquete"
          v-model="question"
          :rules="[rules.required]"
        ></v-text-field>
  
        <v-text-field
          label="Opção 1"
          v-model="option1"
          :rules="[rules.required]"
        ></v-text-field>
  
        <v-text-field
          label="Opção 2"
          v-model="option2"
          :rules="[rules.required]"
        ></v-text-field>
  
        <v-btn :disabled="!valid" @click="submitPoll">Criar Enquete</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: false,
        question: '',
        option1: '',
        option2: '',
        rules: {
          required: value => !!value || 'Obrigatório.',
        }
      }
    },
    methods: {
      async submitPoll() {
        const { data, error } = await this.$http.post('/api/polls', {
          question: this.question,
          options: [this.option1, this.option2],
        });
  
        if (error) {
          console.error('Erro ao criar enquete:', error);
        } else {
          this.$router.push(`/results?id=${data.id}`);
        }
      }
    }
  }
  </script>
  