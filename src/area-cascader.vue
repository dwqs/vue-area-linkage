<template>
    <div class="area-cascader">
        <el-cascader 
            :options="options" 
            @change="handleChange">
        </el-cascader>
    </div>
</template>

<script>
    import AreaData from 'area-data';

    import { assert } from './utils';

    export default {
        name: 'area-cascader',
        props: {
            value: {
                required: true
            },
            type: {
                type: String,
                default: 'code',  //  code-返回行政区域代码 text-返回文本 all-返回 code 和 text
                validator: (val) => ['all', 'code', 'text'].indexOf(val) > -1
            },
            level: {
                type: Number,
                default: 0, // 0->二联 1->三联 
                validator: (val) => [0, 1].indexOf(val) > -1
            }
        },

        data () {
            return {
                // only array
                options: []
            };
        },

        methods: {
            getAreaText(selected) {
                let texts = [];
                let provinces = AreaData['86'];

                for(let i = 0, l = selected.length; i < l; i++) {
                    switch(i) {
                        case 0:
                            texts.push(provinces[selected[i]]);
                            break;
                        case 1: 
                            let city = AreaData[selected[0]][selected[i]];
                            texts.push(city);
                            break;
                        case 2: 
                            let area = AreaData[selected[1]][selected[i]]; 
                            texts.push(area);
                            break;          
                    }
                }

                return texts;
            },

            getAll(selected) {
                let all = [];
                let texts = this.getAreaText(selected);

                assert(texts.length === selected.length, '获取数据出错了');

                for(let i = 0, l = texts.length; i < l; i++) {
                    let item = {
                        [selected[i]]: texts[i]
                    };
                    all.push(item);
                }

                return all;
            },

            handleChange (selected) {
                console.log('handlechange', selected);
                if(this.type === 'code') {
                    this.$emit('input', selected);
                } else if(this.type === 'text') {
                    this.$emit('input', this.getAreaText(selected));
                } else {
                    this.$emit('input', this.getAll(selected));
                }
            },

            iterate (obj) {
                const temp = [];
                for (const key in obj) {
                    temp.push({
                        label: obj[key],
                        value: key
                    });
                }
                return temp;
            },

            iterateCities () {
                const temp = [];
                const provinces = this.iterate(AreaData['86']);

                for (let i = 0, l = provinces.length; i < l; i++) {
                    const item = {};
                    item['label'] = provinces[i].label;
                    item['value'] = provinces[i].value;

                    item['children'] = this.iterate(AreaData[provinces[i].value]);
                    temp.push(item);
                }

                return temp;
            },

            iterateAreas () {
                const temp = [];
                const cities = this.iterateCities();

                for (let i = 0, c = cities.length; i < c; i++) {
                    const city = cities[i];
                    for (let j = 0, l = cities[i].children.length; j < l; j++) {
                        const item = cities[i].children[j];
                        item['children'] = this.iterate(AreaData[cities[i].children[j].value]);
                    }
                    temp.push(city);
                }

                return temp;
            }
    
        },

        created () {
            // if (this.level === 0) {
            //     this.options = this.iterate(AreaData['86']);
            //     return;
            // }

            if (this.level === 0) {
                this.options = this.iterateCities();
                return;
            }

            if (this.level === 1) {
                this.options = this.iterateAreas();
                return;
            }
        }
    };

</script>