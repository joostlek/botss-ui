<template>
<div>
  <h2>Nodig mensen uit bij {{team.name}}.</h2>
  <p>Deel de volgende code met hun:</p>
  <h1>{{team.joinCode}}</h1>
  Er kunnen maximaal 5 personen in een team zitten.
  <h2>Deel deze code:</h2>
  <v-btn icon color="green" dark @click="sendWhatsapp">
    <v-icon>mdi-whatsapp</v-icon>
  </v-btn>
</div>
</template>

<script>
export default {
name: "InviteMembers",
  data: () => ({
    team: null
  }),
  mounted() {
    this.team = JSON.parse(localStorage.getItem('team'));
  },
  methods: {
    sendWhatsapp() {
      window.open(this.whatsAppLink, '_blank');
    }
  },
  computed: {
    whatsAppLink() {
      return `https://wa.me/?text=Wil jij in mijn groepje bij de Battle of Student Societies? Mijn code is ${this.team.joinCode}.`;
    }
  }
}
</script>

<style scoped>

</style>
