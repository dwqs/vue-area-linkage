<template>
    <div class="code-area size-example">
        <div class="area-left">
            <area-select v-model="selected" size="large" :data="$pca"></area-select>
        </div>
        <div class="area-right">
            <pre><code>{{selected}}</code></pre>
        </div>
        <div class="original-code" ref="original" v-if="shown">
            <pre><code><span>//size:['small','medium','large'], 默认值是 medium</span><br /><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>area-select&nbsp;v-model='selected'&nbsp;size="large"&gt;&lt;/area-select&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
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

<style scoped>
    
</style>