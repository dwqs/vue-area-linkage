<template>
    <div id="app" class="app-wrap">
        <!-- <area-select :level='2' v-model="selected"></area-select> -->
        <!-- <area-cascader :level='1' v-model="selected"></area-cascader > -->
        <v-header />
        <v-start></v-start>
        <v-main></v-main>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Select from '../../../components/area-select/select/index.vue';
    import Option from '../../../components/area-select/select/option.vue';

    import Cascader from '../../../components/area-cascader/cascader/index.vue';

    import Header from '@components/header/';
    import Main from '@components/main/';
    import Start from '@components/start/';
    import Footer from '@components/footer/';

    export default {
        data () {
            return {
                // ['广东省', '深圳市', '南山区'], ['440000', '440300', '440305']
                selected: [],
                t: ['1', '3', '7'],
                list: [{
                    value: 1,
                    label: 'text1'
                }, {
                    value: 2,
                    label: 'text2'
                }],
                options: [{
                    value: '21111',
                    label: '222'
                }, {
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
                        value: '22',
                        label: '22'
                    }, {
                        value: '23',
                        label: '23'
                    }, {
                        value: '24',
                        label: '24'
                    }, {
                        value: '25',
                        label: '25'
                    }, {
                        value: '26',
                        label: '26'
                    }, {
                        value: '27',
                        label: '27'
                    }, {
                        value: '21',
                        label: '21',
                        children: [{
                            value: '28',
                            label: '28'
                        }]
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

        watch: {
            selected (val) {
                console.log('vvvv', val);
            }
        },

        methods: {
            selectChange (val) {
                console.log('val', val);
            }
        },

        mounted () {
            setTimeout(() => {
                // this.t = ['1', '21', '28'];
                // this.selected = ['440000', '440300', '440305'];
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