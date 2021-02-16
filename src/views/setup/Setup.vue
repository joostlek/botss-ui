<template>
  <v-container>
    <h1>Battle of the student societies</h1>
    <v-row>

      <v-col
          cols="12"
          offset-md="2"
          sm="8"
      >
        <v-stepper
            v-model="page"
            alt-labels>
          <v-stepper-header>
            <v-stepper-step
                step="1">
              Vereniging
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                step="2">
              Persoonlijke informatie
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                step="3">
              Betaling
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                step="4">
              Team
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h2>Selecteer jouw vereniging</h2>
              <v-container>
                <v-row>
                  <v-col
                      v-for="association in this.associations"
                      :key="association.slug"
                      @click="() => selectAssociation(association.slug)"
                      class="logo-col"
                      cols="12"
                      md="6"
                      lg="4"
                      xl="3">
                    <div>
                      <img :src="association.logoUrl" class="logo">
                    </div>
                    <p>{{association.name}}</p>

                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="2">
              <h2>Bevestig jouw gegevens</h2>
              <v-form
                  v-model="valid"
                  lazy-validation
                  ref="form"
              >
                <v-container>
                  <v-row
                      class="form"
                  >
                    <v-col
                        cols="12"
                        sm="12"
                        lg="6"
                        xl="3"
                        offset-xl="3"
                    >
                      <v-text-field
                          label="Voornaam"
                          v-model="participantData.firstName"
                          :rules="rules.firstName"
                          autocomplete="given-name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        lg="6"
                        xl="3"
                    >
                      <v-text-field
                          label="Achternaam"
                          v-model="participantData.lastName"
                          :rules="rules.lastName"
                          autocomplete="family-name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        lg="6"
                        xl="3"
                        offset-xl="3"
                    >
                      <v-text-field
                          label="Telefoonnummer"
                          v-model="participantData.phoneNumber"
                          :rules="rules.phoneNumber"
                          autocomplete="tel"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        lg="6"
                        xl="3"
                    >
                      <v-text-field
                          label="Emailadres"
                          v-model="participantData.emailAddress"
                          :rules="rules.emailAddress"
                          autocomplete="email"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="3"
                        offset-md="9"
                    >
                      <v-btn
                          color="primary"
                          @click="submitParticipant"
                      >
                        Volgende
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>

              </v-form>
            </v-stepper-content>
            <v-stepper-content step="3">
              <h2>Betaling</h2>
              <p>Om je aanmelding te voltooien vragen we je om €1,50 te betalen. Je kan dit doen via iDeal. Klik op de knop volgende om verder te gaan.</p>

              <v-row
                  class="form"
              >
                <v-col
                    cols="12"
                    sm="12"
                    md="3"
                    offset-md="9"
                >
                  <v-btn
                      color="primary"
                      @click="generatePaymentLink"
                  >
                    Volgende
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="4">
              <h2>Team</h2>
              <p>Om mee te kunnen doen met de team competitie, kan je hier je eigen team aanmaken of eentje joinen, maar natuurlijk kan je ook individueel meespelen.</p>

              <v-row
                  class="form"
              >
                <v-col
                    cols="12"
                    sm="12"
                    md="4"
                >
                  <v-btn
                      outlined
                      color="primary"
                      @click="() => goTo('Profile')"
                  >
                    Individueel
                  </v-btn>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    md="4"
                >
                  <v-btn
                      color="primary"
                      @click="() => goTo('CreateTeam')"
                  >
                    Maak een team
                  </v-btn>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    md="4"
                >
                  <v-btn
                      color="primary"
                      @click="() => goTo('JoinTeam')"
                  >
                    Join een team
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

      </v-col>


    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Setup",
  data: () => ({
    valid: true,
    page: 1,
    associations: null,
    selectedAssociationSlug: null,
    user: null,
    rules: {
      firstName: [
        v => v.length < 50 || "De voornaam mag niet langer zijn dan 50.",
        v => v.length !== 0 || "De voornaam mag niet leeg zijn.",
      ],
      lastName: [
        v => v.length < 50 || "De achternaam mag niet langer zijn dan 50.",
        v => v.length !== 0 || "De achternaam mag niet leeg zijn.",
      ],
      phoneNumber: [
        v => v.length !== 0 || "Het telefoonnummer mag niet leeg zijn.",
        v => v.match(/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/im) !== null || "Voer een geldig telefoonnummer in.",
      ],
      emailAddress: [
        v => v.length < 50 || "De emailadres mag niet langer zijn dan 50.",
        v => v.length !== 0 || "De emailadres mag niet leeg zijn.",
      ],
    },
    participantData: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: ''
    }
  }),
  methods: {
    async getAssociations() {
      const associations = await this.$api.get("/associations");
      this.associations = associations.data;
    },
    selectAssociation(associationSlug) {
      this.selectedAssociationSlug = associationSlug;
      this.nextPage();
    },
    async submitParticipant() {
      this.validate();
      if (!this.valid) {
        return;
      }
      const data = {
        firstName: this.participantData.firstName,
        lastName: this.participantData.lastName,
        emailAddress: this.participantData.emailAddress,
        phoneNumber: this.participantData.phoneNumber
      };
      await this.$api.post(`/associations/${this.selectedAssociationSlug}/participants`, data);
      this.nextPage();
    },
    validate() {
      this.$refs.form.validate();
    },
    nextPage() {
      this.page++;
    },
    async generatePaymentLink() {
      const devEnv = process.env.VUE_APP_MODE !== 'live';
      const betaling = await this.$api.post(`/participants/${this.$keycloak.subject}/payments`, {redirectUrl: `${devEnv ? 'http://localhost:8081' : 'https://botss.indicium.hu'}/aanmelding?state=after_payment`})
      window.location.href = betaling.data.checkoutUrl;
    },
    async receiveUser() {
      try {
        const userData = await this.$api.get(`/participants/${this.$keycloak.subject}`);
        this.user = userData.data
        if (this.user.hasPaid) {
          if (this.$route.query.state === 'after_payment') {
            this.page = 4;
          } else {
            await this.$router.push({name: 'Dashboard'})
          }
        } else {
          this.page = 3
        }
      } catch (e) {
        if (e.response.status === 404) {
          this.page = 1;
        }
      }
    },
    async goTo(name) {
      await this.$router.push({name: name})
    }
  },
  async mounted() {
    await this.getAssociations();
    await this.receiveUser();
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  float: left;
  width: 100%;
  padding: 16px;
}

.logo-col {
  text-align: center;
  cursor: pointer;
}
</style>
