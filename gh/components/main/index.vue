<template>
    <div class="app-main">
        <h3>基本使用</h3>
        <h4>1. 作为选择器</h4>
        <h5>默认形式</h5>
        <basic></basic>
        <h5>返回文本</h5>
        <returns></returns>
        <h5>返回区域代码和文本</h5>
        <area-code></area-code>
        <h5>只选省份</h5>
        <province></province>
        <h5>省市区联动</h5>
        <v-area></v-area>
        <h5>省市区街联动</h5>
        <street></street>
        <area-cascader></area-cascader>
    </div>
</template>

<script>
    import './index.less';

    import Basic from './basic.vue';
    import Returns from './returns.vue';
    import Province from './province.vue';
    import Area from './area.vue';
    import Street from './street.vue';
    import AreaCode from './area-code.vue';

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
            Street,
            AreaCode
        }
    };

</script>