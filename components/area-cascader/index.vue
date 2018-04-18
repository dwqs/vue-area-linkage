<template>
    <div class="area-cascader-wrap">
        <v-cascader
            :placeholder="placeholder" 
            :options="options"
            :defaultsAreaCodes="defaultsAreaCodes"
            :size="size"
            :disabled="disabled"
            :separator="separator"
            :data="data"
            @setDefault="isSetDefault = true"
            @change="handleChange">
        </v-cascader>
    </div>
</template>

<script>
    import find from 'lodash.find';

    import Cascader from './cascader/index.vue';

    import { assert, isArray } from '@src/utils';

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
            },
            separator: {
                type: String,
                default: '/'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                required: true
            }
        },

        data () {
            if (!this.data['86']) {
                throw new Error('[vue-area-linkage]: 需要提供地区数据：https://github.com/dwqs/area-data');
            }
            return {
                provinces: this.data['86'],
                citys: {},
                areas: {},
                // only array
                options: [],

                curProvince: '', // text
                curProvinceCode: '', // code
                curCity: '',
                curCityCode: '',
                curArea: '',
                curAreaCode: '',

                // 设置默认值的判断
                defaultsAreaCodes: [], // 默认值对应的 code
                defaults: [],
                isCode: false,
                isSetDefault: false
            };
        },

        watch: {
            value (val) {
                if (!this.isSetDefault && isArray(val) && val.length === this.level + 2) {
                    this.beforeSetDefault();
                    this.setDefaultValue();
                }

                if (!this.isSetDefault && isArray(val) && val.length && val.length !== this.level + 2) {
                    assert(false, `设置的默认值和 level 值不匹配`);
                }
            },

            curProvinceCode (val) {
                this.curProvince = this.provinces[val];
                this.citys = this.data[val];

                if (!this.citys) {
                    this.citys = {
                        [this.curProvinceCode]: this.curProvince
                    };
                    this.curCity = this.curProvince;
                    this.curCityCode = this.curCityCode;
                    return;
                }

                let curCity = Object.values(this.citys)[0];
                let curCityCode = Object.keys(this.citys)[0];

                if (this.defaults[1]) {
                    if (this.isCode) {
                        curCityCode = find(Object.keys(this.citys), (item) => item === this.defaults[1]);
                        assert(curCityCode, `城市 ${this.defaults[1]} 不存在于省份 ${this.defaults[0]} 中`);
                        curCity = this.citys[curCityCode];
                    } else {
                        curCity = find(this.citys, (item) => item === this.defaults[1]);
                        assert(curCity, `城市 ${this.defaults[1]} 不存在于省份 ${this.defaults[0]} 中`);
                        curCityCode = find(Object.keys(this.citys), (item) => this.citys[item] === this.defaults[1]);
                    }
                }

                this.curCity = curCity;
                this.curCityCode = curCityCode;
            },

            curCityCode (val) {
                this.curCity = this.citys[val];
                if (this.level === 0) {
                    this.setDefaultsCodes();
                } else if (this.level === 1) {
                    this.areas = this.data[val];
                    if (!this.areas) {
                        this.areas = {
                            [this.curCityCode]: this.curCity
                        };
                        this.curArea = this.curCity;
                        this.curAreaCode = this.curCityCode;
                        return;
                    }

                    let curArea = Object.values(this.areas)[0];
                    let curAreaCode = Object.keys(this.areas)[0];

                    if (this.defaults[2]) {
                        if (this.isCode) {
                            curAreaCode = find(Object.keys(this.areas), (item) => item === this.defaults[2]);
                            assert(curAreaCode, `县区 ${this.defaults[2]} 不存在于城市 ${this.defaults[1]} 中`);
                            curArea = this.areas[curAreaCode];
                        } else {
                            curArea = find(this.areas, (item) => item === this.defaults[2]);
                            assert(curArea, `县区 ${this.defaults[2]} 不存在于城市 ${this.defaults[1]} 中`);
                            curAreaCode = find(Object.keys(this.areas), (item) => this.areas[item] === this.defaults[2]);
                        }
                    }

                    this.curArea = curArea;
                    this.curAreaCode = curAreaCode;
                }
            },

            curAreaCode (val) {
                this.curArea = this.areas[val];
                this.curAreaCode = val;
                this.setDefaultsCodes();
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
                this.defaults = [].concat(this.value);
                this.isCode = isCode;
            },

            setDefaultValue () {
                let provinceCode = '';

                if (this.isCode) {
                    provinceCode = this.defaults[0];
                } else {
                    const province = find(this.provinces, (item) => item === this.defaults[0]);
                    assert(province, `省份 ${this.defaults[0]} 不存在`);
                    provinceCode = find(Object.keys(this.provinces), (item) => this.provinces[item] === this.defaults[0]);
                }
                this.curProvinceCode = provinceCode;

                // 还原默认值，避免用户选择出错
                this.$nextTick(() => {
                    this.defaults = [];
                    // this.isCode = false;
                });
            },

            handleChange (codes, labels) {
                let res = [];
                if (this.isSetDefault) {
                    // this.emitter.emit('set-def-values', codes, labels);
                }
                this.isSetDefault = true;

                if (labels[0] === labels[1]) {
                    // 纠正台湾省的 code 返回
                    codes[1] = codes[0];
                }

                if (this.type === 'code') {
                    res = [].concat(codes);
                } else if (this.type === 'text') {
                    res = [].concat(labels);
                } else if (this.type === 'all') {
                    res = codes.map((code, index) => {
                        return {
                            [code]: labels[index]
                        };
                    });
                }
                this.$emit('input', res);
                this.$emit('change', res);
            },

            iterate (obj, panelIndex) {
                // panelIndex 表示所在 panel 的索引
                const temp = [];
                for (const key in obj) {
                    temp.push({
                        label: obj[key],
                        value: key,
                        panelIndex: panelIndex
                    });
                }
                return temp;
            },

            iterateCities () {
                const temp = [];
                const provinces = this.iterate(this.data['86'], 0);

                for (let i = 0, l = provinces.length; i < l; i++) {
                    const item = {};
                    item['label'] = provinces[i].label;
                    item['value'] = provinces[i].value;
                    item['panelIndex'] = provinces[i].panelIndex;

                    item['children'] = this.iterate(this.data[provinces[i].value], 1);
                    temp.push(item);
                }

                return temp;
            },

            iterateAreas () {
                const temp = [];
                const cities = this.iterateCities();

                for (let i = 0, c = cities.length; i < c; i++) {
                    const city = cities[i];
                    for (let j = 0, l = city.children.length; j < l; j++) {
                        const item = city.children[j];
                        const areas = this.iterate(this.data[city.children[j].value], 2);
                        // fix #7
                        if (areas.length) {
                            item['children'] = areas;
                        } else {
                            item['children'] = [{
                                label: item.label,
                                value: item.value,
                                panelIndex: 2
                            }];
                        }
                    }
                    temp.push(city);
                }
                return temp;
            },

            setDefaultsCodes () {
                if (this.isSetDefault) {
                    return;
                }
                this.isSetDefault = true;

                let codes = [];
                switch (this.level) {
                    case 0:
                        codes = [this.curProvinceCode, this.curCityCode];
                        break;
                    case 1:
                        codes = [this.curProvinceCode, this.curCityCode, this.curAreaCode];
                        break;
                }
                this.defaultsAreaCodes = [].concat(codes);
            }
        },

        created () {
            if (this.level === 0) {
                this.options = this.iterateCities();
            } else if (this.level === 1) {
                this.options = this.iterateAreas();
            } else {
                assert(false, `设置的 level 值只支持 0/1`);
            }

            if (isArray(this.value) && this.value.length === this.level + 2) {
                this.beforeSetDefault();
                this.setDefaultValue();
            }

            if (isArray(this.value) && this.value.length && this.value.length !== this.level + 2) {
                assert(false, `设置的默认值和 level 值不匹配`);
            }
        }
    };

</script>