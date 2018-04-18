<template>
    <div class="app-main">
        <h3>基本使用</h3>
        <h4>1. 作为选择器</h4>
        <h5>默认形式</h5>
        <basic></basic>
        <h5>改变大小</h5>
        <size></size>
        <h5>返回区域文本</h5>
        <returns></returns>
        <h5>返回区域代码和文本</h5>
        <area-code></area-code>
        <h5>设置 placeholders</h5>
        <placeholders></placeholders>
        <p class='desc'>
            <code>placeholders</code>&nbsp;是一个数组, 数组项顺序分别对应省/市/区.
        </p>
        <h5>设置默认值</h5>
        <default-value></default-value>
        <p class='desc'>
            <code>selected</code>&nbsp;是一个数组, 数组项顺序分别对应省/市/区, 且类型(区域代码/区域文本)必须统一. 以第一个元素类型为基准. 类型不统一将报错.
        </p>
        <h5>只选省份</h5>
        <province></province>
        <h5>省市区联动</h5>
        <v-area></v-area>
        <h4>2. 作为级联器(只支持2/3级联动)</h4>
        <h5>默认形式</h5>
        <cas-basic></cas-basic>
        <h5>返回区域文本</h5>
        <cas-returns></cas-returns>
        <h5>返回区域文本和代码</h5>
        <cas-area-code></cas-area-code>
        <h5>设置 placeholder</h5>
        <cas-placeholder></cas-placeholder>
        <h5>设置默认值</h5>
        <cas-default-val></cas-default-val>
        <h5>省市区联动</h5>
        <cas-area></cas-area>
    </div>
</template>

<script>
    import './index.less';

    import Basic from './basic.vue';
    import Size from './size.vue';
    import Returns from './returns.vue';
    import Province from './province.vue';
    import Area from './area.vue';
    import AreaCode from './area-code.vue';
    import Placeholders from './placeholders.vue';
    import DefaultValue from './default-value.vue';
    import CasBasic from './cas-basic.vue';
    import CasReturns from './cas-returns.vue';
    import CasAreaCode from './cas-area-code.vue';
    import CasPlaceholder from './cas-placeholder.vue';
    import CasDefaultVal from './cas-default-value.vue';
    import CasArea from './cas-area.vue';

    export default {
        data() {
            return {
                selected: [],
                shown: false
            }
        },
        methods: {
            toggle(){
                this.shown = !this.shown;
            }
        },

        components: {
            Basic,
            Returns,
            Province,
            'v-area': Area,
            AreaCode,
            Placeholders,
            DefaultValue,
            CasBasic,
            CasReturns,
            CasAreaCode,
            CasPlaceholder,
            CasArea,
            Size,
            CasDefaultVal
        }
    };

</script>