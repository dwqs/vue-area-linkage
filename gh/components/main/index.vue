<template>
    <div class="app-main">
        <h3>基本使用</h3>
        <h4>1. 作为选择器</h4>
        <h5>默认形式</h5>
        <basic></basic>
        <h5>返回文本</h5>
        <returns></returns>
        <area-cascader></area-cascader>
    </div>
</template>

<script>
    import './index.less';

    import Basic from './basic.vue';
    import Returns from './returns.vue';

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
            Returns
        }
    };

</script>