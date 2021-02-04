<template>
<div>
  <h2>Nodig mensen uit bij {{team.name}}.</h2>
  <p>Deel de volgende code met hun:</p>
  <h1>{{team.joinCode}}</h1>
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
  }
}
</script>

<style scoped>

</style>
