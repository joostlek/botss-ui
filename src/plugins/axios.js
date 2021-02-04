import axios from 'axios';
import { Service } from 'axios-middleware';
import DataMiddleware from '../middleware/DataMiddleware';
import AuthMiddleware from "@/middleware/AuthMiddleware";

const api = {}
api.install = function (Vue) {

    const devEnv = process.env.VUE_APP_MODE !== 'live';

    const baseURL = devEnv ? 'http://localhost:8080/api/v1' : 'https://api.botss.indicium.hu/api/v1';

    const apiInstance = axios.create({ baseURL: baseURL });

    const service = new Service(apiInstance);

    service.register([
        new DataMiddleware(),
        new AuthMiddleware(Vue.prototype.$keycloak, apiInstance),
    ]);
    Vue.prototype.$api = apiInstance;
};

export default api;
