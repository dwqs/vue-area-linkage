# vue-area-linkage
省市区联动选择，基于 Element UI. 组合数据来源：[area-data](https://github.com/dwqs/area-data)

## Installation
Install the pkg with npm:
```
npm i --save vue-area-linkage
```
or yarn
```
yarn add  vue-area-linkage
```

## Usage
```
import Vue from 'vue';
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage)
```

```
// basic
<area-select v-model="selected"></area-select>
<area-cascader v-model="selected2"></area-cascader>

//setting
<area-select type='all' :level='2' v-model="selected"></area-select>
<area-cascader type='all' v-model="selected2" :level='2'></area-cascader>
```

More demo to visit [here](https://dwqs.github.io/vue-area-linkage/).

## License
MIT.
