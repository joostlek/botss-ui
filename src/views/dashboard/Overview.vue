<template>
  <v-container>
    <h1>Battle of the student societies</h1>
    <v-row>

      <v-col
          cols="12"
          md="3"
      >
        <v-sheet
            rounded="lg"
        >
          <v-list
              :rounded="true"
          >
            <v-subheader>MENU</v-subheader>
            <v-list-item-group
                color="primary">

              <v-list-item
                  :to="{name: 'Profile'}"
              >
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Profiel</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-group
                  prepend-icon="mdi-account-group">
                <template v-slot:activator>
                  <v-list-item-title>Teams</v-list-item-title>
                </template>

                <v-list-item
                    v-if="team === null"
                    :to="{name: 'CreateTeam'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Maak een team</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                    v-if="team === null"
                    :to="{name: 'JoinTeam'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Join een team</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                    v-if="team !== null"
                    :to="{name: 'TeamInfo'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Teaminformatie</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                    v-if="team !== null"
                    :to="{name: 'InviteTeamMembers'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Mensen uitnodigen</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

              </v-list-group>

              <v-list-group
                  v-if="hasManageAccess"
                  prepend-icon="mdi-wrench">
                <template v-slot:activator>
                  <v-list-item-title>Beheer</v-list-item-title>
                </template>

                <v-list-item
                    :to="{name: 'ManageDashboard'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                    :to="{name: 'ManageTeams'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Teams</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                    :to="{name: 'ManageParticipants'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Deelnemers</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                    :to="{name: 'ManageAssociations'}"
                >
                  <v-list-item-content>
                    <v-list-item-title>Verenigingen</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

              </v-list-group>
              <v-divider></v-divider>
              <v-list-item
              @click="logout"
              >
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Log uit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-sheet>
      </v-col>
      <v-col
          cols="12"
          md="8"
      >
        <v-sheet
            rounded="lg"
            class="sheet"
        >
          <router-view></router-view>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Overview",
  data: () => ({
    user: null,
    team: null,
  }),
  async mounted() {

    console.log(this.$keycloak.resourceAccess);
    await this.getUser();
    await this.getTeam();
    this.$eventBus.$on("updateTeam", await this.getTeam);
    this.$eventBus.$on("updateUser", await this.getUser);
    this.$eventBus.$on("updateUserTeam", await this.updateUserAndTeam);
  },
  methods: {
    async logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("team");
      const devEnv = process.env.VUE_APP_MODE !== 'live';
      this.$keycloak.logout({redirectUri: devEnv ? 'http://localhost:8081/' : 'https://botss.indicium.hu/'});
    },
    async updateUserAndTeam() {
      this.getUser().then(async () => {
        await this.getTeam();
      }
      )
    },
    async getUser() {
      const userResponse = await this.$api.get(`/participants/${this.$keycloak.subject}`)
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      this.user = userResponse.data;
      this.$eventBus.$emit('updatedUser', userResponse.data);
    },
    async getTeam() {
      if (this.user.teamId) {
        const teamResponse = await this.$api.get(`/teams/${this.user.teamId}`);
        localStorage.setItem("team", JSON.stringify(teamResponse.data));
        this.team = teamResponse.data;
        this.$eventBus.$emit('updatedTeam', teamResponse.data);
      }
    },
  },
  computed: {
    hasManageAccess() {
      return this.$keycloak.resourceAccess['botss']?.roles.indexOf("manage-association") !== -1;
    }
  }
}
</script>

<style lang="scss" scoped>
.sheet {
  padding: 16px;
}
</style>
