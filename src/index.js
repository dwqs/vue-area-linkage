import {
    Select, Option, Cascader
} from 'element-ui';

import AreaSelect from './area-select.vue';
import AreaCascader from './area-cascader.vue';

export default function install(Vue) {
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Cascader);

    Vue.component(AreaSelect.name, AreaSelect);
    Vue.component(AreaCascader.name, AreaCascader);
}