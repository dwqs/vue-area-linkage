<template>
    <div class="code-area">
        <div class="area-left">
            <area-cascader placeholder="请选择地区" v-model="selected" :data="$pca"></area-cascader>
        </div>
        <div class="area-right">
            <pre><code>{{selected}}</code></pre>
        </div>
        <div class="original-code" ref="original" v-if="shown">
            <pre><code><span>//返回值是一个数组，分别是省市的行政区域代码</span><br /><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>area-cascader&nbsp;placeholder="请选择地区"&nbsp;v-model='selected'&gt;&lt;/area-cascader&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
        </div>
        <div class="show-code" @click="toggle">
            {{this.shown ? 'Hide Code' : 'Show Code'}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: [],
                shown: false
            }
        },
        methods: {
            toggle() {
                this.shown = !this.shown;
            }
        }
    };
</script>