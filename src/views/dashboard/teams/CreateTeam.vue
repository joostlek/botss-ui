<template>
  <div>
    <h2>Maak een team aan</h2>
    <p>Om mee te kunnen doen met de teamcompetitie moet je deelnemen aan een team, je kan er zelf eentje aanmaken maar je kan er ook eentje joinen.</p>
    <v-form
        v-model="valid"
        ref="form"
        lazy-validation
    >
      <v-row>
        <v-col
          cols="12"
          md="6">
          <v-text-field
              label="Team naam"
              v-model="name"
              :rules="validationRule"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
          :disabled="!valid"
          @click="createTeam"
          color="primary">
        Maak team
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "CreateTeam",
  data: () => ({
    name: "",
    valid: true,
    validationRule: [
      v => v.length < 50 || 'De teamnaam moet korter zijn dan 50 tekens.',
      v => v.length !== 0 || 'De teamnaam mag niet leeg zijn.'
    ],
  }),
  methods: {
    async createTeam() {
      this.validate();
      await this.$api.post("/teams", {name: this.name});
      this.$eventBus.$emit('updateUserTeam')
      await this.$router.push({name: "TeamInfo"})
    },
    validate() {
      this.$refs.form.validate();
    }
  }
}
</script>

<style scoped>

</style>
