<template>
  <v-container
      :fluid="true"
  >
    <v-parallax
        src="/show.jpg"
        height="250"
    >
      <v-row
          align="center"
          justify="center"
      >
        <v-col
            class="text-center"
            cols="12"
        >
          <h1 class="display-1 font-weight-light mb-4">
            Battle of the student societies
          </h1>
          <h4 class="subheading">
            Help jij jouw vereniging naar de overwinning?
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row
        class="white pt-16 pb-16"
    >
      <v-col
          cols="12"
          offset-md="3"
          md="6"
          sm="12"
      >
        <h1 class="text-h3 pb-4">
          De strijd tussen de verenigingen is begonnen!
        </h1>
        <p class="text-body-1">
          Word jij de student met de meeste algemene kennis van de gehele hu? Schrijf je nu in, en wie weet win jij een leuke prijs. Strijd tegen andere verenigingen en win de wisselbokaal voor jouw vereniging. Druk nu snel op de knop hieronder en doe mee voor maar €1,50! Stel je eigen team samen of join een bestaand team met vrienden of andere mensen van je vereniging. Je laat jouw vereniging toch niet in zijn/haar hempie staan?
        </p>
        <v-btn
            color="primary"
            :to="{name: 'Login'}"
        >
          Aanmelden
        </v-btn>
      </v-col>


    </v-row>
    <v-parallax
        src="/show.jpg"
        height="250"
    >
    </v-parallax>
    <v-row
        class="white pt-16 pb-16"
    >
      <v-col
          cols="12"
          offset-md="3"
          md="6"
          sm="12"
      >
        <h1 class="text-h3 pb-4">
          Hoe werkt het?
        </h1>
        <p class="text-body-1">
          Tijdens de quiz zijn er op 2 gebieden prijzen te winnen, zowel voor de vereniging als voor jou en je team. Hieronder staat beschreven hoe je kans maakt.
        </p>
        <v-row>
          <v-col
              cols="12"
              md="6"
              sm="12"
          >
            <v-sheet
                color="grey lighten-2"
                rounded="lg"
                class="pb-2 pl-2 pr-2 text-center"
            >
              <v-icon
                  size="200"
              >
                mdi-trophy-award
              </v-icon><br>
              <p class="text-h6">
                Verenigingscompetitie
              </p>
              <p class="text-body-1">
                De punten worden ook per vereniging bijgehouden en de vereniging die gemiddeld de meeste punten heeft zal de velbegeerde wisselbeker winnen! Dit is dan het bewijs dat jouw vereniging de slimste vereniging is van de Hogeschool Utrecht!
              </p>
            </v-sheet>
          </v-col>
          <v-col
              cols="12"
              md="6"
              sm="12"
          >
            <v-sheet
                color="grey lighten-2"
                rounded="lg"
                class="pb-2 pl-2 pr-2 text-center"
            >
              <v-icon
                  size="200"
              >
                mdi-account-group
              </v-icon>
              <p class="text-h6">
                Teamscompetitie
              </p>
              <p class="text-body-1">
                Vorm een team met maximaal 5 personen en doe mee met de teamscompetitie! De teams die het het best gedaan hebben tijdens de quiz maken kans op leuke prijzen.
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style lang="scss" scoped>

</style>
