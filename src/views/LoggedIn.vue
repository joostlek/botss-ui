<template>
  <div></div>
</template>

<script>
export default {
name: "LoggedIn",
  data: () => ({
    user: null
  }),
  async mounted() {
    const participantId = this.$keycloak.subject;
    try {
      const participant = await this.$api.get(`/participants/${participantId}`);
      if (participant.data.hasPaid) {
        await this.$router.push({'name': 'Profile'})
      } else {
        await this.$router.push({'name': 'Setup'})
      }
    } catch (err) {
      if (err.response.status === 404) {
        await this.$router.push({'name': 'Setup'})
      }
    }
  }
}
</script>

<style scoped>

</style>
