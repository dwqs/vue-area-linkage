<template>
    <div class="code-area">
        <div class="area-left">
            <area-cascader  :level="1" v-model="selected" :data="$pcaa"></area-cascader >
        </div>
        <div class="area-right">
            <pre><code>{{selected}}</code></pre>
        </div>
        <div class="original-code" ref="original" v-if="shown">
            <pre><code><span>//绑定默认值selected=['440000','440300','440305']，代码对应的区域文本是['广东省', '深圳市', '南山区']</span><br /><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>area-cascader&nbsp;:level="1"&nbsp;v-model='selected'&gt;&lt;/area-cascader&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
        </div>
        <div class="show-code" @click="toggle">
            {{this.shown ? 'Hide Code' : 'Show Code'}}
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selected: ['440000', '440300', '440305'],
                shown: false
            };
        },
        methods: {
            toggle () {
                this.shown = !this.shown;
            }
        }
    };

</script>