import './index.less';

import AreaSelect from '../components/area-select/index';
import AreaCascader from '../components/area-cascader/index';

import Bus from './bus.js';

const components = [
    AreaSelect,
    AreaCascader
];

function install (Vue) {
    Bus.saveVueRef(Vue);
    components.map(component => {
        Vue.component(component.name, component);
    });
}

export {
    AreaSelect,
    AreaCascader
};

const VueAreaLinkage = {
    install,
    AreaSelect,
    AreaCascader
};

export default VueAreaLinkage;

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
