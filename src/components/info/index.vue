<template lang="html">
    <div class="info">
        <h2>{{info}}</h2>
        <h3>Project Name: vue-area-linkage</h3>
        <h3>Project Version: 0.0.1</h3>
        <h3>Author: dwqs</h3>
        <h3>Desc: Vue area linkage</h3>
    </div>
</template>

<script>
export default {
    name: 'info',
    data () {
        return {
            info: 'project info:'
        };
    }
};
</script>

<style>
    h2{
        margin: 10px;
        font-size: 20px;
    }
</style>
