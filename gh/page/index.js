import './reset.css';

import Vue from 'vue';
import { pca, pcaa } from 'area-data';
import VueAreaLinkage from '../../src/index.js';

Vue.prototype.$pca = pca;
Vue.prototype.$pcaa = pcaa;

Vue.use(VueAreaLinkage);

const env = process.env.NODE_ENV || 'development';

if (env !== 'development') {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
}

import App from '../general/app/index';

new Vue({
    el: '#app',
    render: (h) => h(App)
});
