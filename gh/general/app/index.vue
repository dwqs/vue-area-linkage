<template>
    <div id="app" class="app-wrap">
        <div class="test">
            <test-select>
                <test-option v-for="(item, index) in list" :key="index" :value="item.value" :label="item.label"></test-option>
            </test-select>
        </div>
        <v-header />
        <v-start></v-start>
        <v-main></v-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Select from '../../../src/components/select.vue';
    import Option from '../../../src/components/option.vue';

    import Header from '@components/header/';
    import Main from '@components/main/';
    import Start from '@components/start/';
    import Footer from '@components/footer/';

    export default {
        data () {
            return {
                list: [{
                    value: 1,
                    label: 'text1'
                }, {
                    value: 2,
                    label: 'text2'
                }]
            };
        },
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-main': Main,
            'v-start': Start,
            'test-select': Select,
            'test-option': Option
        },
    };

</script>

<style>
    .app-wrap{
        width: 960px;
        height: 200px;
        margin: 0 auto;
    }
    .test {
        margin-top: 100px
    }
</style>