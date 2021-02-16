<template>
  <div>
    <h1 v-if="superAdmin">Alle deelnemers</h1>
    <h1 v-else>De deelnemers van {{associations[user.associationSlug]}}</h1>
    <v-progress-circular
        v-if="participants == null"
        indeterminate
        color="primary"
    ></v-progress-circular>
    <v-data-table
        v-if="participants != null"
        :headers="headers"
        :items="participants"
        :items-per-page="5"
    >
      <template v-slot:item.hasPaid="{ item }">
        <v-chip
            :color="getColor(item)"
            dark
        >
          {{ item.hasPaid ? 'Betaald' : 'Niet betaald' }}
        </v-chip>
      </template>
    </v-data-table>
  </div>

</template>

<script>
export default {
name: "ManageParticipants",
  data: () => ({
    participants: null,
    associations: null,
    user: null,
    headers: [
      {
        text: 'Voornaam',
        value: 'firstName'
      },
      {
        text: 'Achternaam',
        value: 'lastName'
      },
      {
        text: 'Emailadres',
        value: 'emailAddress'
      },
      {
        text: 'Betaalstatus',
        value: 'hasPaid'
      },
      {
        text: 'Vereniging',
        value: 'association'
      },
    ],
    superAdmin: false,
  }),
  mounted() {
    if (this.$keycloak.resourceAccess.botss.roles.indexOf("manage-participant") !== -1) {
      this.superAdmin = true;
    }
    this.updateAssociations();
    this.$eventBus.$on("updatedAssociations", this.updateAssociations)
    this.updateParticipants()
    this.$eventBus.$on("updatedParticipants", this.updateParticipants)
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    updateParticipants() {
      const participantData = JSON.parse(localStorage.getItem("participants"));
      const participants = [];
      participantData.forEach((participant) => {
        participant['association'] = this.associations[participant.associationSlug]
        participants.push(participant)
      })
      this.participants = participants;
    },
    updateAssociations() {
      const associations = JSON.parse(localStorage.getItem("associations"));
      const res = {}
      associations.forEach((association) => {
        res[association.slug] = association.name
      })
      this.associations = res;
    },
    getColor(participant) {
      return participant.hasPaid ? 'green' : 'red';
    }
  }
}
</script>

<style scoped>

</style>
