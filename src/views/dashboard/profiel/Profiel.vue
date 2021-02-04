<template>
<div>
  <div v-if="!!user">
    <h1>{{this.getFullName(user)}}</h1>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Telefoonnummer</v-list-item-subtitle>
          <v-list-item-title>{{user.phoneNumber}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Emailadres</v-list-item-subtitle>
          <v-list-item-title>{{user.emailAddress}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Aanmeldingsstatus</v-list-item-subtitle>
          <v-list-item-title>{{user.hasPaid ? 'Betaald' : 'Nog niet betaald'}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Vereniging</v-list-item-subtitle>
          <v-list-item-title>{{user.associationSlug}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</div>
</template>

<script>
export default {
  name: "Profiel",
  data: () => ({
    user: null
  }),
  mounted() {
    this.getUser();
    this.$eventBus.$on('updatedUser', this.getUser);
  },
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    getFullName(member) {
      return `${member.firstName} ${member.lastName}`
    },
  }
}
</script>

<style scoped>

</style>
