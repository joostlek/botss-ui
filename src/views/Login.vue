<template>
  <div></div>
</template>

<script>
export default {
name: "Login",
  created() {
    const devEnv = process.env.VUE_APP_MODE !== 'live';
    this.$keycloak.login({redirectUri: devEnv ? 'http://localhost:8081/callback' : 'https://botss.indicium.hu/callback'});
  }
}
</script>

<style scoped>

</style>
