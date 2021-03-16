<template>
  <v-container
      class="mt-md-10 mb-md-16"
  >
    <v-row>

      <v-col
          cols="12"
          offset-md="2"
          sm="8"
      >
        <v-row>
          <v-container>
            <h1 class="display-1 font-weight-light mb-4 center">
              Battle of the student societies
            </h1>
            <p class="body-1">
              Hieronder staan de verenigingen die met dit evenement meedoen! Normaal zouden er feesten worden georganiseerd, maar vanwege de huidige situatie is deze quiz tot stand gekomen.
            </p>
          </v-container>
          <v-col
              v-for="society in societies"
              :key="society.name"
              cols="12"
              md="4"
              sm="12">
            <v-card
                class="mx-auto"
                max-width="400"
            >
              <v-container>
                <v-img
                    class="white--text align-end"
                    max-width="400px"
                    max-height="200px"
                    contain
                    :src="society.logoUrl"
                >
                </v-img>
              </v-container>
              <v-card-title>
                {{society.name}}
              </v-card-title>

              <v-card-text class="text--primary">
                {{society.description}}
              </v-card-text>

              <v-card-actions v-if="!!society.websiteUrl">
                <v-btn
                    color="primary"
                    text
                    @click="() => openWebpage(society.websiteUrl)"
                >
                  Website
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutUs",
  data: () => ({
    societies: [
      {
        name: 'Avanti',
        logoUrl: '/avanti.png',
        description: 'Avanti is de studievereniging voor het Instituut voor Social Work.',
        websiteUrl: 'https://www.instagram.com/sv.avanti/'
      },
      {
        name: 'S.V. Codex',
        logoUrl: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s1c843e1eba75abe6/image/i470a3bbeefdaeda7/version/1615394045/image.png',
        description: '',
        websiteUrl: 'https://www.svcodex.nl/'
      },
      {
        name: 'Educa',
        logoUrl: 'https://t.eu1.jwwb.nl/W967316/KtxrIifN0_4CRU00JB8Z4Vm0RFg=/135x0/f.eu1.jwwb.nl%2Fpublic%2Fg%2Fa%2Fq%2Ftemp-xwknlwdxgsxujtgfbejy%2Fe78y3q%2FEducalogoblauwklein-4.png',
        description: '',
        websiteUrl: 'https://www.studieverenigingeduca.nl/'
      },
      {
        name: 'S.V. Forum',
        logoUrl: 'https://www.svforum.nl/wp-content/uploads/2020/09/cropped-SV-FORUM-logo-2020-CMYK-Full-Color-The-Brandstones-01.png',
        description: '',
        websiteUrl: 'https://www.svforum.nl/'
      },
      {
        name: 'Indicium',
        logoUrl: 'https://indicium.hu/logo/indicium-logo-top.svg',
        description: 'Indicium is de studievereniging voor de opleiding HBO-ICT en alle richtingen die daar bij horen.',
        websiteUrl: 'https://indicium.hu/?utm_source=botss&utm_medium=botss&utm_campaign=botss'
      },
      {
        name: 'Ingenium Cabo Bianci',
        logoUrl: 'https://ingeniumcabobianci.nl/wp-content/uploads/2020/03/cabo-logo-2.png',
        description: '',
        websiteUrl: 'https://www.ingeniumcabobianci.nl/'
      },
      {
        name: 'Utrechtse Technische Vereniging',
        logoUrl: 'http://www.utvweb.nl/wp-content/uploads/2017/11/UTVlogo_def-1-e1511267812986.png',
        description: '',
        websiteUrl: 'http://www.utvweb.nl/'
      },
      {
        name: 'S.V. Vesta',
        logoUrl: 'https://www.sv-vesta.nl/images/Vesta/logo_kleur_300.png',
        description: 'Vesta is de studievereniging voor de studie Integrale Veiligheidskunde.',
        websiteUrl: 'https://www.sv-vesta.nl/'
      },
    ]
  }),
  methods: {
    openWebpage(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>

</style>
