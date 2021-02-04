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
    const participant = await this.$keycloak.loadUserInfo();
    const participantId = participant.sub;
    try {
      const participant = await this.$api.get(`/participants/${participantId}`);
      if (participant.data.hasPaid) {
        await this.$router.push({'name': 'Dashboard'})
      } else {
        await this.$router.push({'name': 'Payment'})
      }
    } catch (err) {
      await this.$router.push({'name': 'ParticipantInfoForm'})
    }
  }
}
</script>

<style scoped>

</style>
