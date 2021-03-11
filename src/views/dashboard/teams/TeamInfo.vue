<template>
  <div>
    <h2>{{team.name}}</h2>
    <div v-if="teamMembers !== null">
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          Om mensen mee te laten ga je naar <router-link :to="{name: 'InviteTeamMembers'}">deze pagina</router-link> en deel je de code!
          <v-list>
            <v-subheader>Leden</v-subheader>
            <v-list-item
                v-for="(teamMember, i) in teamMembers"
                :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="getFullName(teamMember)"></v-list-item-title>
                <v-list-item-subtitle v-text="teamMember.associationSlug"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon v-if="team.teamCaptain === teamMember.id">
                <v-icon color="yellow lighten-1">mdi-crown</v-icon>
              </v-list-item-icon>
              <v-list-item-action v-if="team.teamCaptain === $keycloak.subject && team.teamCaptain !== teamMember.id">
                <v-btn
                    icon
                    @click="() => kickTeamMember(teamMember.id)"
                >
                  <v-icon color="red lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>
export default {
  name: "TeamInfo",
  data: () => ({
    team: null,
    teamMembers: null,
  }),
  async mounted() {
    this.team = JSON.parse(localStorage.getItem("team"))
    this.$eventBus.$on('updatedTeam', (team) => this.team = team)
    this.$eventBus.$on('updatedTeamMembers', await this.getTeamMembers)
    await this.getTeamMembers();
  },
  methods: {
    async getTeamMembers() {
      const teamMemberResponse = await this.$api.get(`/teams/${this.team.id}/participants`)
      this.teamMembers = teamMemberResponse.data;
    },
    getFullName(member) {
      return `${member.firstName} ${member.lastName}`
    },
    async kickTeamMember(id) {
      await this.$api.delete(`/teams/${this.team.id}/participants/${id}`);
      this.$eventBus.$emit('updatedTeamMembers')
    }
  }
}
</script>

<style scoped>

</style>
