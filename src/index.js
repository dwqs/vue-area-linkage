import {
    Select, Option, Cascader
} from 'element-ui';
import 'beautify-scrollbar/dist/index.css';

import AreaSelect from './area-select.vue';
import AreaCascader from './area-cascader.vue';

import './icon.css';

import './index.less';

function install (Vue) {
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Cascader);
    Vue.component(AreaSelect.name, AreaSelect);
    Vue.component(AreaCascader.name, AreaCascader);
}
const VueAreaLinkage = {
    install
};

export default VueAreaLinkage;

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueAreaLinkage);
};
