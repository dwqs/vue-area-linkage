<template>
    <div class="area-cascader-wrap">
        <v-cascader
            :placeholder="placeholder" 
            :options="options"
            v-model="defaultValCode" 
            :size="size"
            @change="handleChange">
        </v-cascader>
    </div>
</template>

<script>
    import AreaData from 'area-data';
    import find from 'lodash.find';

    import Cascader from './cascader/index.vue';

    import { assert, isArray } from './utils';

    export default {
        name: 'area-cascader',
        components: {
            'v-cascader': Cascader
        },
        props: {
            value: {
                required: true
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            type: {
                type: String,
                default: 'code', //  code-返回行政区域代码 text-返回文本 all-返回 code 和 text
                validator: (val) => ['all', 'code', 'text'].indexOf(val) > -1
            },
            level: {
                type: Number,
                default: 0, // 0->二联 1->三联 
                validator: (val) => [0, 1].indexOf(val) > -1
            },
            size: {
                type: String,
                default: 'large',
                validator: (val) => ['small', 'medium', 'large'].indexOf(val) > -1
            }
        },

        data () {
            return {
                provinces: AreaData['86'],
                citys: {},
                areas: {},
                // only array
                options: [],
                curDefaultVal: [],
                defaultValCode: [],
                curProvince: '',
                curCity: '',
                curArea: '',
                curAreaCode: '',
                isSetDefault: false,
                isCode: false
            };
        },

        watch: {
            value () {
                if (isArray(this.value) && this.value.length >= 2 && !this.isSetDefault) {
                    this.beforeSetDefault();
                    this.setDefaultValue();
                }
            },

            curProvince (val, oldVal) {
                this.isSetDefault = true;
                this.citys = AreaData[val];
                if (this.curDefaultVal[1]) {
                    if (this.isCode) {
                        const curCity = find(Object.keys(this.citys), (item) => item === this.curDefaultVal[1]);
                        assert(curCity, `城市 ${this.curDefaultVal[1]} 不存在于省份 ${this.curDefaultVal[0]} 中`);
                        this.curCity = curCity;
                    } else {
                        const city = find(this.citys, (item) => item === this.curDefaultVal[1]);
                        assert(city, `城市 ${this.curDefaultVal[1]} 不存在于省份 ${this.curDefaultVal[0]} 中`);
                        this.curCity = find(Object.keys(this.citys), (item) => this.citys[item] === this.curDefaultVal[1]);
                    }
                } else {
                    this.curCity = Object.keys(this.citys)[0];
                }
            },

            curCity (val, oldVal) {
                if (this.level === 0) {
                    this.selectChange();
                    return;
                }
                this.areas = AreaData[val];
                if (this.curDefaultVal[2] && this.areas) {
                    if (this.isCode) {
                        const curArea = find(Object.keys(this.areas), (item) => item === this.curDefaultVal[2]);
                        assert(curArea, `县区 ${this.curDefaultVal[2]} 不存在于城市 ${this.curDefaultVal[1]} 中`);
                        this.curArea = curArea;
                    } else {
                        const area = find(this.areas, (item) => item === this.curDefaultVal[2]);
                        assert(area, `县区 ${this.curDefaultVal[2]} 不存在于城市 ${this.curDefaultVal[1]} 中`);
                        this.curArea = find(Object.keys(this.areas), (item) => this.areas[item] === this.curDefaultVal[2]);
                    }
                } else {
                    // fix 市级下不存在城区(#7)
                    this.curArea = this.areas ? Object.keys(this.areas)[0] : val;
                }
                this.curAreaCode = this.curArea;
                this.selectChange();
            }
        },

        methods: {
            beforeSetDefault () {
                const chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,}$/;
                const num = /^\d{6,}$/;
                const isCode = num.test(this.value[0]);
                let isValid;

                if (!isCode) {
                    isValid = this.value.every((item) => chinese.test(item));
                } else {
                    isValid = this.value.every((item) => num.test(item));
                }
                assert(isValid, '传入的默认值参数有误');
                // 映射默认值，避免直接更改props
                this.curDefaultVal = this.level ? this.value.slice(0, 3) : this.value.slice(0, 2);
                this.isCode = isCode;
                this.isSetDefault = true;
            },

            setDefaultValue () {
                let provinceCode = '';

                if (this.isCode) {
                    provinceCode = this.curDefaultVal[0];
                } else {
                    const province = find(this.provinces, (item) => item === this.curDefaultVal[0]);
                    assert(province, `省份 ${this.curDefaultVal[0]} 不存在`);
                    provinceCode = find(Object.keys(this.provinces), (item) => this.provinces[item] === this.curDefaultVal[0]);
                }
                this.curProvince = provinceCode;

                // 还原默认值，避免用户选择出错
                this.$nextTick(() => {
                    this.curDefaultVal = [];
                    this.isCode = false;
                });
            },

            getAreaText (selected) {
                const texts = [];
                const provinces = this.provinces;
                let city = '';
                let area = '';

                for (let i = 0, l = selected.length; i < l; i++) {
                    switch (i) {
                        case 0:
                            texts.push(provinces[selected[i]]);
                            break;
                        case 1:
                            city = AreaData[selected[0]][selected[i]];
                            texts.push(city);
                            break;
                        case 2:
                            area = AreaData[selected[1]] ? AreaData[selected[1]][selected[i]] : city;
                            texts.push(area);
                            break;
                    }
                }

                return texts;
            },

            getAll (selected) {
                const all = [];
                const texts = this.getAreaText(selected);

                assert(texts.length === selected.length, '获取数据出错了');

                for (let i = 0, l = texts.length; i < l; i++) {
                    const item = {
                        [selected[i]]: texts[i]
                    };
                    all.push(item);
                }

                return all;
            },

            handleChange (selected) {
                this.isSetDefault = true;
                let res = [];
                if (this.type === 'code') {
                    res = selected;
                } else if (this.type === 'text') {
                    res = this.getAreaText(selected);
                } else {
                    res = this.getAll(selected);
                }
                this.$emit('input', res);
                this.$emit('change', res);
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
                        const areas = this.iterate(AreaData[cities[i].children[j].value]);
                        if (areas.length) {
                            item['children'] = areas;
                        } else {
                            item['children'] = [{
                                label: item.label,
                                value: item.value
                            }];
                        }
                        // item['children'] = this.iterate(AreaData[cities[i].children[j].value]);
                    }
                    temp.push(city);
                }
                return temp;
            },

            selectChange () {
                let selected = [];

                switch (this.level) {
                    case 0:
                        selected = [this.curProvince, this.curCity];
                        break;
                    case 1:
                        selected = [this.curProvince, this.curCity, this.curAreaCode];
                        break;
                }
                this.defaultValCode = selected;
            }
        },

        created () {
            // if (this.level === 0) {
            //     this.options = this.iterate(AreaData['86']);
            //     return;
            // }
            if (isArray(this.value) && this.value.length >= 2) {
                this.beforeSetDefault();
                this.setDefaultValue();
            }

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