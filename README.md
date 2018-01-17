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
<area-cascader type='all' v-model="selected2" :level='1'></area-cascader>
```

More demo to visit [here](https://dwqs.github.io/vue-area-linkage/).

## 属性
### area-select 组件
|  参数  |  类型  |  可选值  |  默认值  |  说明  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| type | String |  all/code/text | code | 设置返回的数据格式 |
| placeholders | Array | - | [] | 设置 placeholder text |
| level | Number | 0/1/2/3 | 1 | 设置联动层级(0-只选省份/1-省市联动/2-省市区联动/3-省市区街联动) |
| size | String | small/medium/large | medium | 设置输入框的大小 |

### area-cascader 组件
|  参数  |  类型  |  可选值  |  默认值  |  说明  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| type | String |  all/code/text | code | 设置返回的数据格式 |
| placeholder | String | - | '' | 设置 placeholder text |
| level | Number | 0/1 | 0 | 设置联动层级(0-省市联动/1-省市区联动) |
| size | String | small/medium/large | medium | 设置输入框的大小 |

## 事件

|  事件名  |  说明  |  参数 |
|  :--:  |  :--:  |  :--: |
| change | 选中值发生变化时触发 | 目前选择的值 |

> change 事件在 1.2.5 之后提供
## License
MIT.
