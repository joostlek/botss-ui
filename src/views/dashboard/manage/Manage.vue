<template>
<router-view></router-view>
</template>

<script>
export default {
  name: "Manage",
  data: () => ({
    teams: null,
    associations: null,
    participants: null,
    user: null
  }),
  mounted() {
    this.getUser();
    this.getTeams();
    this.getParticipants();
    this.getAssociations();
    this.$eventBus.$on('updatedUser', this.getUser);
    this.$eventBus.$on("updateTeams", this.getTeams)
    this.$eventBus.$on("updateParticipants", this.getParticipants)
    this.$eventBus.$on("updateAssociations", this.getAssociations)
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    getTeams() {
      this.$api.get("/teams").then(
          (data) => {
            localStorage.setItem("teams", JSON.stringify(data.data));
            this.$eventBus.$emit("updatedTeams")
          }
      )
    },
    getParticipants() {
      if (this.$keycloak.resourceAccess.botss.roles.indexOf("manage-participant") === -1) {
        this.$api.get(`/associations/${this.user.associationSlug}/participants`).then(
            (data) => {
              localStorage.setItem("participants", JSON.stringify(data.data));
              this.$eventBus.$emit("updatedParticipants")
            }
        )
      } else {
        this.$api.get("/participants").then(
            (data) => {
              localStorage.setItem("participants", JSON.stringify(data.data));
              this.$eventBus.$emit("updatedParticipants")
            }
        )
      }
    },
    getAssociations() {
      this.$api.get("/associations").then(
          (data) => {
            localStorage.setItem("associations", JSON.stringify(data.data));
            this.$eventBus.$emit("updatedAssociations")
          }
      )
    },
  }
}
</script>

<style scoped>

</style>
