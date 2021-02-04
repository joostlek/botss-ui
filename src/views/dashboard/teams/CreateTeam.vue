<template>
  <div>
    <h2>Maak een team aan</h2>
    <p>Om mee te kunnen doen met de teamcompetitie moet je deelnemen aan een team, je kan er zelf eentje aanmaken maar je kan er ook eentje joinen.</p>
    <v-text-field
        label="Team naam"
        v-model="name"
      ></v-text-field>
    <v-btn
        @click="createTeam"
      color="primary">
      Maak team
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CreateTeam",
  data: () => ({
    name: ""
  }),
  methods: {
    async createTeam() {
      const res = await this.$api.post("/teams", {name: this.name});
      localStorage.setItem("teamId", res.data.id);
    }
  }
}
</script>

<style scoped>

</style>
