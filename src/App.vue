<template>
  <div id="app">
    <v-app>

      <v-app-bar
          app
          color="white"
          flat
      >
        <v-avatar
            :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
            size="32"
        ></v-avatar>

        <v-tabs
            centered
            class="ml-n9"
            color="grey darken-1"
        >
          <v-tab
              v-for="link in links"
              :key="link.title"
              :to="link.to"
          >
            {{ link.title }}
          </v-tab>
        </v-tabs>

        <v-avatar
            class="hidden-sm-and-down"
            color="grey darken-1 shrink"
            size="32"
        ></v-avatar>
      </v-app-bar>

      <v-main class="grey lighten-3">
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    links: [    ]
  }),
  mounted() {
    this.links.push({
      title: 'Home',
      to: {
        name: 'Home'
      }
    });
    this.links.push({
      title: 'Over ons',
      to: {
        name: 'AboutUs'
      }
    });
    if (this.$keycloak.authenticated) {
      this.links.push({
        title: 'Dashboard',
        to: {
          name: 'Dashboard'
        }
      });
    } else {
      this.links.push({
        title: 'Meld je aan',
        to: {
          name: 'Login'
        }
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
