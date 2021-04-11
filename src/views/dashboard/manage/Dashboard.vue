<template>
  <v-container>

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
    <v-card
        class="mt-4 mx-auto"
        max-width="400"
    >
      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">
          Aanmeldingen
        </div>
        <div class="subheading font-weight-light grey--text">
          <template v-for="association in Object.entries(stats.registrationsByAssociations)">
            {{association[0]}} {{association[1]}}<br :key="association[0]">
          </template>
        </div>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    stats: {
      registrationsByDay: null,
      registrationsByAssociations: null
    }
  }),
  async mounted() {
    await this.getStatistics();
  },
  methods: {
    async getStatistics() {
      const { data } = await this.$api.get('/statistics');
      this.stats.registrationsByDay = data;
      const { data: sizeData } = await this.$api.get('/statistics/size');
      this.stats.registrationsByAssociations = sizeData;
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
