![npm-version](https://img.shields.io/npm/v/vue-area-linkage.svg) ![license](https://img.shields.io/npm/l/vue-area-linkage.svg)
# vue-area-linkage
省市区联动选择. 组合数据来源：[area-data](https://github.com/dwqs/area-data)

## Installation
Install the pkg with npm:
```
// v5之前的版本
npm i --save vue-area-linkage

// v5及之后的版本
npm i --save vue-area-linkage area-data
```
or yarn
```
// v5之前的版本
yarn add vue-area-linkage

// v5及之后的版本
yarn add vue-area-linkage area-data
```

## Usage
```
import Vue from 'vue';
import { pca, pcaa } from 'area-data'; // v5 or higher
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage)
```

```
// v5之前的版本
<area-select v-model="selected"></area-select>
<area-cascader v-model="selected2"></area-cascader>

// v5及之后的版本
<area-select v-model="selected" :data="pca"></area-select> // 省市
// 省市区：<area-select v-model="selected" :data="pcaa"></area-select>
<area-cascader v-model="selected2" :data="pca"></area-cascader> // 省市
// 省市区：<area-cascader v-model="selected2" :data="pcaa"></area-cascader>

//setting
<area-select type='all' :level='2' v-model="selected" :data="pcaa"></area-select>
<area-cascader type='all' v-model="selected2" :level='1' :data="pcaa"></area-cascader>
```

More demo to visit [here](https://dwqs.github.io/vue-area-linkage/).

## On Demand Import
> version >= 2.1.2

安装 [babel-plugin-on-demand-import](https://github.com/dwqs/babel-plugin-on-demand-import):

```
npm i babel-plugin-on-demand-import -D
```

修改 `.babelrc`:

```
{
    // ...
    "plugins": [
        ["on-demand-import" {
            "libraryName": "vue-area-linkage",
            "libraryPath": "dist/lib"
        }]
    ]
}
```

```
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import pcaa from 'area-data/pcaa';
// Only import AreaCascader component
import { AreaCascader } from 'vue-area-linkage';
Vue.use(AreaCascader);

<area-cascader v-model="val" level={1} :data="pcaa"></area-cascader>

// Only import AreaSelect component
import { AreaSelect } from 'vue-area-linkage';
Vue.use(AreaSelect);

<area-select v-model="val2" level={2} :data="pcaa"></area-select>
```

## 属性
### area-select 组件
|  参数  |  类型  |  可选值  |  默认值  |  说明  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| type | String |  all/code/text | code | 设置返回的数据格式 |
| placeholders | Array | - | [] | 设置 placeholder text |
| level | Number | 0/1/2 | 1 | 设置联动层级(0-只选省份/1-省市联动/2-省市区联动) |
| size | String | small/medium/large | medium | 设置输入框的大小 |
| disabled | Boolean | - | false | 是否禁用 |
| data | Object | - | - | 地区数据(v5需要传入) |
| icon | String | - | area-select-icon | 自定义下拉小图标 |
| disableLinkage | Boolean | - | true | 地区选择是否进行联动 |

>v4 仅支持省市区联动，即 v4 不再支持 level 的值为 3(省市区街联动)

### area-cascader 组件
|  参数  |  类型  |  可选值  |  默认值  |  说明  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| type | String |  all/code/text | code | 设置返回的数据格式 |
| placeholder | String | - | '' | 设置 placeholder text |
| level | Number | 0/1 | 0 | 设置联动层级(0-省市联动/1-省市区联动) |
| size | String | small/medium/large | medium | 设置输入框的大小 |
| separator | String | - | '-' | 显示选中文本的分隔符 |
| disabled | Boolean | - | false | 是否禁用 |
| data | Object | - | - | 地区数据(v5需要传入) |

## 事件

|  事件名  |  说明  |  参数 |
|  :--:  |  :--:  |  :--: |
| change | 选中值发生变化时触发 | 目前选择的值 |

> change 事件在 1.2.5 之后提供

## Related Project
* [react-area-linkage](https://github.com/dwqs/react-area-linkage)
## License
MIT.
