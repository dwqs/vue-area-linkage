<template lang="html">
    <div class="desc">
        <p>{{desc}}</p>
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
