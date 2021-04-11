<template>
  <div>
    <h2>{{team.name}}</h2>
    <v-dialog
        v-model="dialog"
        width="500"
        v-if="team.teamCaptain === $keycloak.subject"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Groepsnaam aanpassen
        </v-card-title>

        <v-card-text>
          Pas hier je groepsnaam aan
          <v-text-field
              v-model="newName"
          >
          </v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="secondary"
              text
              @click="dialog = false"
          >
            Annuleren
          </v-btn>
          <v-btn
              color="primary"
              text
              :disabled="newName === team.name"
              @click="updateTeamName"
          >
            Aanpassen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    <v-container v-if="team.teamCaptain === $keycloak.subject">
      Om dit team te verwijderen moet de teamcaptain als enige overblijven en op de onderstaande knop drukken<br>
      <v-btn color="red" :disabled="teamMembers !== null && teamMembers.size === 1" @click="deleteTeam">Verwijder team</v-btn>
    </v-container>

  </div>
</template>

<script>
export default {
  name: "TeamInfo",
  data: () => ({
    dialog: false,
    newName: '',
    team: null,
    teamMembers: null,
  }),
  async mounted() {
    this.team = JSON.parse(localStorage.getItem("team"))
    this.newName = this.team.name;
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
    },
    async deleteTeam() {
      await this.$api.delete(`/teams/${this.team.id}`);
      this.$eventBus.$emit('updateUserTeam')
      await this.$router.push({name: "Profile"})
    },
    async updateTeamName() {
      await this.$api.put(`/teams/${this.team.id}`, {name: this.newName});
      this.$eventBus.$emit('updateUserTeam');
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
