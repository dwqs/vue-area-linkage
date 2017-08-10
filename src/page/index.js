import './reset.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMobx from 'vue-mobx';
import {toJS, useStrict} from 'mobx';

Vue.use(VueMobx, {toJS});
useStrict(true);

const env = process.env.NODE_ENV || 'development';

if(env !== 'development'){
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
}


Vue.use(VueRouter);

// dynamic import for on-demand loaded chunk
const Info = () => import(/* webpackChunkName: "info" */ '@components/info/');
const App = () => import(/* webpackChunkName: "main" */ '../general/app/index');

const Outer = { template: '<router-view></router-view>' };

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Outer,
            children: [
                // 嵌套路由 https://github.com/vuejs/vue-router/blob/next-doc/docs/en/advanced-routing/nested.md
                { path: '', component: App },
                { path: 'info', component: Info }
            ]
        }
    ]
});


const app = new Vue({
    router,
    ...Outer
});

app.$mount('#app');
