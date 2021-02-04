<template>
<div>
  <h2>Neem deel aan een team</h2>
  <p>Om mee te doen met een team moet je hier de 6 cijferige code invullen die je van het team gekregen hebt!</p>
  <v-text-field
    v-model="joinCode"></v-text-field>
  <v-btn
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
    joinCode: ''
  }),
  methods: {
    async joinTeam() {
      await this.$api.post('/teams/join', {joinCode: this.joinCode});
      this.$eventBus.$emit("updateUserTeam");
      await this.$router.push({name: "TeamInfo"})
    }
  }
}
</script>

<style scoped>

</style>
