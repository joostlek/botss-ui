<template>
  <v-container>
    <h1>Battle of the student societies</h1>
    <v-row>

      <v-col
          cols="12"
          offset-sm="2"
          sm="8"
      >
        <v-sheet
            min-height="70vh"
            rounded="lg"
            class="sheet"
        >
          {{message}}
          <h4>Om je aanmelding te voltooien moet je nog €1,50 betalen. Je kan dit doen door op de onderstaande iDeal knop te drukken.</h4>
          <v-btn
            color="primary"
            @click="generatePaymentLink"
            class="pay-button"
            >iDeal</v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "Payment",
  async mounted() {

  },
  methods: {
    async generatePaymentLink() {
      const betaling = await this.$api.post(`/participants/${this.$keycloak.subject}/payments`, {redirectUrl: 'http://localhost:8081/betaald'})
      window.location.href = betaling.data.checkoutUrl;
    }
  }
}
</script>

<style lang="scss" scoped>
.sheet {
  padding: 16px;
}

.pay-button {
  margin: 8px;
}
</style>
