<template>
  <v-container
      class="mt-md-10 mb-md-16">
    <v-row>
      <v-col
          cols="12"
          offset-md="2"
          sm="8"
      >
        <h1 class="display-1 font-weight-light mb-4 center">
          Battle of the student societies
        </h1>
        <p class="text-body-1">
          Om je aan te melden kun je inloggen via Facebook of Google, kan of wil je dit niet? Dan kan je in het aanmeldvenster er ook voor kiezen om je te registreren. We gebruiken je gegevens alleen voor de quiz en voor de berichtgeving mocht je in de prijzen zijn gevallen. Na afloop zullen je gegevens verwijderd worden.
        </p>
        <v-btn
            color="primary"
            @click="login"
        >
          Aanmelden
        </v-btn>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
export default {
name: "Login",
  methods: {
    login() {
      const devEnv = process.env.VUE_APP_MODE !== 'live';
      this.$keycloak.login({redirectUri: devEnv ? 'http://localhost:8081/callback' : 'https://botss.indicium.hu/callback'});
    }
  }
}
</script>

<style scoped>

</style>
