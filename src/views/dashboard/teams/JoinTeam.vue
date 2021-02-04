<template>
<div>
  <h2>Neem deel aan een team</h2>
  <p>Om mee te doen met een team moet je hier de 6 cijferige code invullen die je van het team gekregen hebt!</p>
  <v-alert
      v-if="!!error"
    type="error">
    {{error}}
  </v-alert>
  <v-row>
    <v-col
      cols="12"
      md="6">
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            :rules="validationRule"
            v-model="joinCode"></v-text-field>
      </v-form>
    </v-col>
  </v-row>
  <v-btn
      :disabled="!valid"
    color="primary"
    @click="joinTeam"
    >
    Verzend
  </v-btn>
</div>
</template>

<script>
export default {
  name: "JoinTeam",
  data: () => ({
    joinCode: '',
    error: null,
    validationRule: [
        v => v.length === 6 || 'De code moet 6 tekens lang zijn.'
    ],
    valid: true
  }),
  methods: {
    async joinTeam() {
      this.validate();
      try {
        await this.$api.post('/teams/join', {joinCode: this.joinCode});
        this.$eventBus.$emit("updateUserTeam");
        await this.$router.push({name: "TeamInfo"})
      } catch (e) {
        if (e.response.status === 404) {
          this.error = "Team niet gevonden."
        } else {
          this.error = "Er is iets misgegaan, probeer het opnieuw."
        }
      }
    },
    validate() {
      this.$refs.form.validate();
    }
  }
}
</script>

<style scoped>

</style>
