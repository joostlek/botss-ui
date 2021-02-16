<template>
<div>
  <h1>Voeg vereniging toe</h1>
  <v-form
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
        >
          <v-text-field
              label="Naam"
              v-model="name"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          lg="6"
      >
        <v-text-field
            label="Slug"
            v-model="associationData.slug"
            disabled
        ></v-text-field>
      </v-col>
        <v-col
            cols="12"
            sm="12"
            lg="6"
        >
          <v-text-field
              label="Logo URL"
              v-model="associationData.logoUrl"
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="12"
            md="3"
            xl="12"
        >
          <v-btn
              color="primary"
              @click="addAssociation"
          >
            Voeg toe
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-form>
</div>
</template>

<script>
export default {
name: "CreateAssociation",
  data: () => ({
    name: '',
    associationData: {
      name: '',
      logoUrl: '',
      slug: ''
    }
  }),
  methods: {
    stripSlug(slug) {
      return slug.replaceAll(' ', '-').replaceAll('.', '').toLowerCase()
    },
    async addAssociation() {
      await this.$api.post('/associations', this.associationData);
      await this.$router.push({name: 'ManageAssociations'})
    }
  },
  watch: {
    name(oldVal) {
      this.associationData.name = oldVal;
      this.associationData.slug = this.stripSlug(oldVal);
    }
  }
}
</script>

<style scoped>

</style>
