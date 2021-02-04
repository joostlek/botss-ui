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
          Om mee te kunnen doen met de battle of student societies moet je je gegevens hier invullen. We zullen niet worden gedeeld met derde partijen.

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
                  autocomplete="email"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="12"
                lg="6"
                xl="6"
                offset-xl="3"

            >
              <v-combobox
                  label="Vereniging"
                  :items="getAssociationList()"
                  v-model="participantData.association"
              ></v-combobox>
            </v-col>
          </v-row>
          <v-btn
              color="primary"
              @click="submitData"
          >
            Meld je aan
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ParticipantInfoForm",
  data: () => ({
    associations: [],
    participantData: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      association: ""
    },
  }),
  methods: {
    async getAssociations() {
      const associations = await this.$api.get("/associations");
      this.associations = associations.data;
    },
    getAssociationList() {
      const ass = [];
      this.associations.forEach(association => {
        ass.push({text: association.name, value: association.slug})
      })
      return ass;
    },
    async autoFillFromToken() {
      const info = await this.$keycloak.loadUserInfo();
      this.participantData.firstName = info.given_name;
      this.participantData.lastName = info.family_name;
      this.participantData.emailAddress = info.email;
    },
    async submitData() {
      const associationSlug = this.participantData.association.value;
      const data = {
        firstName: this.participantData.firstName,
        lastName: this.participantData.lastName,
        emailAddress: this.participantData.emailAddress,
        phoneNumber: this.participantData.phoneNumber
      };
      const res = await this.$api.post(`/associations/${associationSlug}/participants`, data);
      console.log(res);
    }
  },
  async mounted() {
    await this.getAssociations();
    await this.autoFillFromToken();
  },
}
</script>

<style lang="scss" scoped>
.sheet {
  padding: 16px;
}

.form {
  margin-top: 16px;
}
</style>
