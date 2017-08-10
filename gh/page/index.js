import './reset.css';

import Vue from 'vue';
import VueAreaLinkage from '../../src/index';

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
})