<template>
    <div id="app" class="app-wrap">
        <v-header />
        <v-main></v-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
    
    import Header from '@components/header/';
    import Main from '@components/main/';
    import Footer from '@components/footer/';

    export default {
        data() {
            return {

            }
        },
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-main': Main
        }
    };

</script>

<style>
    .app-wrap{
        width: 960px;
        height: 200px;
        margin: 0 auto;
        border: 1px solid red;
    }
</style>