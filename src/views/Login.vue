<template>
  <div></div>
</template>

<script>
export default {
name: "Login",
  created() {
    this.$keycloak.login({redirectUri: 'http://localhost:8081/callback'});
  }
}
</script>

<style scoped>

</style>
