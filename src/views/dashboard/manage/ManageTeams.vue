<template>
<div>
  <h1>Alle teams</h1>
  <v-progress-circular
      v-if="teams == null"
      indeterminate
      color="primary"
  ></v-progress-circular>
  <v-data-table
      v-if="teams != null"
      :headers="headers"
      :items="teams"
      :items-per-page="5"
  ></v-data-table>
</div>
</template>

<script>
export default {
  name: "ManageTeams",
  data: () => ({
    teams: null,
    headers: [
      {
        text: 'Naam',
        value: 'name'
      },
      {
        text: 'Grootte',
        value: 'teamSize'
      },
    ]
  }),
  mounted() {
    this.updateTeams();
    this.$eventBus.$on("updatedTeams", this.updateTeams)
  },
  methods: {
    updateTeams() {
      this.teams = JSON.parse(localStorage.getItem("teams"));
    }
  }
}
</script>

<style scoped>

</style>
