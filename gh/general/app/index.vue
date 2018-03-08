<template>
    <div id="app" class="app-wrap">
        <div class="test">
            <test-select>
                <test-option v-for="(item, index) in list" :key="index" :value="item.value" :label="item.label"></test-option>
            </test-select>
            <br />
            <br />
            <br />
            <br />
            <cascader :options="options" v-model="t" @change="selectChange"></cascader>
        </div>
        <v-header />
        <v-start></v-start>
        <!-- <v-main></v-main> -->
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Select from '../../../src/select/index.vue';
    import Option from '../../../src/select/option.vue';

    import Cascader from '../../../src/cascader/index.vue';

    import Header from '@components/header/';
    import Main from '@components/main/';
    import Start from '@components/start/';
    import Footer from '@components/footer/';

    export default {
        data () {
            return {
                t: ['1', '31'],
                list: [{
                    value: 1,
                    label: 'text1'
                }, {
                    value: 2,
                    label: 'text2'
                }],
                options: [{
                    value: '1',
                    label: '1',
                    children: [{
                        value: '2',
                        label: '2'
                    }, {
                        value: '3',
                        label: '3',
                        children: [{
                            value: '6',
                            label: '6'
                        }, {
                            value: '7',
                            label: '7'
                        }, {
                            value: '8',
                            label: '8'
                        }, {
                            value: '9',
                            label: '9'
                        }, {
                            value: '10',
                            label: '10'
                        }, {
                            value: '11',
                            label: '11'
                        }, {
                            value: '12',
                            label: '12'
                        }]
                    }, {
                        value: '21',
                        label: '22'
                    }, {
                        value: '23',
                        label: '24'
                    }, {
                        value: '25',
                        label: '26'
                    }, {
                        value: '27',
                        label: '28'
                    }, {
                        value: '30',
                        label: '30'
                    }, {
                        value: '31',
                        label: '31'
                    }, {
                        value: '32',
                        label: '32'
                    }]
                }, {
                    value: '4',
                    label: '4',
                    children: [{
                        value: '5',
                        label: '5'
                    }]
                }]
            };
        },

        methods: {
            selectChange (val) {
                console.log('val', val);
            }
        },

        mounted () {
            setTimeout(() => {
                // this.t = 1
            }, 2000);
        },
 
        components: {
            'v-header': Header,
            'v-footer': Footer,
            'v-main': Main,
            'v-start': Start,
            'test-select': Select,
            'test-option': Option,
            Cascader
        }
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