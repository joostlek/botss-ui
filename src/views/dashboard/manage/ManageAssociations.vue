<template>
  <div>
    <h1>Verenigingen</h1>
    <v-btn
        color="primary"
        @click="createAssociation"
        v-if="superAdmin"
    >Voeg vereniging toe</v-btn>
    <v-progress-circular
        v-if="associations == null"
        indeterminate
        color="primary"
    ></v-progress-circular>
    <v-data-table
        v-if="associations != null"
        :headers="headers"
        :items="associations"
        :items-per-page="5"
    ></v-data-table>
  </div>
</template>

<script>
export default {
name: "ManageAssociations",
  data: () => ({
    associations: null,
    headers: [
      {
        text: 'Naam',
        value: 'name'
      },
    ],
    superAdmin: false
  }),
  mounted() {
    this.updateAssociations();
    this.$eventBus.$on("updatedAssociations", this.updateAssociations)
    if (this.$keycloak.resourceAccess.botss.roles.indexOf("manage-participant") !== -1) {
      this.superAdmin = true;
    }
  },
  methods: {
    updateAssociations() {
      this.associations = JSON.parse(localStorage.getItem("associations"));
    },
    async createAssociation() {
      await this.$router.push({name: 'CreateAssociation'})
    }
  }
}
</script>

<style scoped>

</style>
