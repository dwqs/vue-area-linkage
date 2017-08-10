<template>
    <div class="app-main">
        <h3>基本使用</h3>
        <h4>1. 作为选择器</h4>
        <h5>默认形式</h5>
        <div class="code-area">
            <div class="area-left">
                <area-select @change='selecteChange' v-model="seleted"></area-select>
            </div>
            <div class="area-right">
                <pre><code>{{selected}}</code></pre>
            </div>
            <div class="original-code" ref="original" v-if="shown">
                <pre><code><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>area-select&nbsp;@change='selecteChange'&gt;&lt;/area-select&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
            </div>
            <div class="show-code" @click="toggle">
                {{this.shown ? 'Hide Code' : 'Show Code'}}
            </div>
        </div>
        <area-cascader></area-cascader>
    </div>
</template>

<script>
    import './index.less';

    export default {
        data() {
            return {
                selected: [],
                shown: false
            }
        },
        methods: {
            selecteChange(data) {
                console.log('selecteChange', data);
                this.selected = {
                    province: data[0],
                    city: data[1]
                };
            },
            toggle(){
                this.shown = !this.shown;
            }
        }
    };

</script>