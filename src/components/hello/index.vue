<template lang="html">
    <div class="desc">
        <p>{{desc}}</p>
        <img src="/assets/logo.png" alt="logo">
    </div>
</template>

<script>
    import './hello.less';

    export default {
        name: 'hello',
        data () {
            return {
                desc: 'A simple template webpack + vuejs setup for projects'
            };
        }
    };
</script>

<style></style>
