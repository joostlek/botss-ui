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
          <div v-if="waiting">
            <h4>We zijn nu je betaling aan het ontvangen. Je wordt automatisch doorgestuurd als we hem hebben!</h4>
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PaymentDone",
  data: () => ({
    payments: null,
    waiting: false,
  }),
  async mounted() {
    await this.getPayments();
  },
  methods: {
    async getPayments() {
      const betalingen = await this.$api.get(`/participants/${this.$keycloak.subject}/payments`);
      this.payments = betalingen.data
      this.payments.sort((a, b) => {
        return a.updatedAt === null ? 1 :
            b.updatedAt === null ? -1 :
                new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      });
      if (this.getLastStatus === "OPEN") {
        this.waiting = true;
        setTimeout(async () => {
          await this.getPayments();
        }, 10000)
      } else {
        this.waiting = false;
        if (this.getLastStatus !== "PAID") {
          await this.$router.push({name: "Payment", query: {message: this.getStatusMessage}});
        } else {
          await this.$router.push({name: "Profile"});
        }
      }
    }
  },
  computed: {
    getLastStatus() {
      if (this.payments.length === 0) {
        return null;
      }
      return this.payments[this.payments.length - 1].status;
    },
    getStatusMessage() {
      switch (this.getLastStatus) {
        case "EXPIRED":
          return "De betaling is verlopen, probeer opnieuw.";
        case "FAILED":
          return "De betaling is mislukt, probeer opnieuw.";
        case "CANCELLED":
          return "De betaling is geannuleerd, probeer opnieuw";
        default:
          return "Er is iets misgegaan."
      }
    }
  }
}
</script>

<style scoped>

</style>
