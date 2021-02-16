<template>

  <v-card
      class="mt-4 mx-auto"
      max-width="400"
  >
    <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
    >
      <v-sparkline
          :labels="Object.keys(stats.registrationsByDay)"
          :value="Object.values(stats.registrationsByDay)"
          color="white"
          line-width="2"
          padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        Aanmeldingen
      </div>
      <div class="subheading font-weight-light grey--text">
        Aantal vandaag: {{registrationsToday}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    stats: {
      registrationsByDay: null
    }
  }),
  async mounted() {
    await this.getStatistics();
  },
  methods: {
    async getStatistics() {
      const { data } = await this.$api.get('/statistics');
      this.stats.registrationsByDay = data;
    }
  },
  computed: {
    registrationsToday() {
      const date = new Date();
      const today = `${date.getDate()}-0${date.getMonth() + 1}-${date.getFullYear()}`
      return this.stats.registrationsByDay[today];
    }
  }
}
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
