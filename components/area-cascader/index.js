import AreaCascader from './index.vue';

import Bus from '@src/bus.js';

AreaCascader.install = function (Vue) {
    Bus.saveVueRef(Vue);
    Vue.component(AreaCascader.name, AreaCascader);
};

export default AreaCascader;
