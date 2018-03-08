import 'beautify-scrollbar/dist/index.css';
import './index.less';

import AreaSelect from './area-select.vue';
import AreaCascader from './area-cascader.vue';
import Bus from './bus.js';

function install (Vue) {
    // Vue.use(Select);
    // Vue.use(Option);
    // Vue.use(Cascader);
    // Vue.component(AreaSelect.name, AreaSelect);
    // Vue.component(AreaCascader.name, AreaCascader);
    Bus.saveVueRef(Vue);
}
const VueAreaLinkage = {
    install
};

export default VueAreaLinkage;

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueAreaLinkage);
};
