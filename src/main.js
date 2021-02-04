import Vue from 'vue'
import App from './App.vue'
import Keycloak from "keycloak-js";
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import axios from "@/plugins/axios";
import './plugins/busje';

Vue.config.productionTip = false

let initOptions = {
  url: 'https://auth.indicium.hu/auth', realm: 'botss', clientId: 'botss-management'
}

let keycloak = Keycloak(initOptions);

function getKey(key) {
  const value = localStorage.getItem(key);
  if (value === undefined || value === null || value === "undefined") {
    return undefined;
  }
  return value;
}

const initialOptions = {
  onLoad: initOptions.onLoad,
  token: getKey("accessToken"),
  idToken: getKey("idToken"),
  refreshToken: getKey("refreshToken")
};

keycloak.init(initialOptions).then((auth) => {
  console.log(auth);
  localStorage.setItem("accessToken", keycloak.token);
  localStorage.setItem("idToken", keycloak.idToken);
  localStorage.setItem("refreshToken", keycloak.refreshToken);

  Vue.prototype.$keycloak = keycloak;

  Vue.use(axios);


  new Vue({
    router,
    vuetify,
    render: h => h(App, { props: { keycloak: keycloak } })
  }).$mount('#app')

}).catch(() => {
  console.error("Authenticated Failed");
});
