<template>
    <div class="area-select" :class="classes">
        <el-select v-model="curProvince" :placeholder="placeholders[0] ? placeholders[0] : '请选择'">
            <el-option v-for="(key, val) in provinces" 
                :key="key" 
                :label="key" 
                :value="val">
            </el-option>
        </el-select>

         <el-select v-model="curCity" :placeholder="placeholders[1] ? placeholders[1] : '请选择'" v-if="level>=1">
            <el-option v-for="(key, val) in citys" 
                :key="key" 
                :label="key" 
                :value="val">
            </el-option>
        </el-select>

        <el-select v-model="curArea" :placeholder="placeholders[2] ? placeholders[2] : '请选择'" v-if="level>=2">
            <el-option v-for="(key, val) in areas" 
                :key="key" 
                :label="key" 
                :value="val">
            </el-option>
        </el-select>

        <el-select v-model="curStreet" :placeholder="placeholders[3] ? placeholders[3] : '请选择'" v-if="level>=3">
            <el-option v-for="(key, val) in streets" 
                :key="key" 
                :label="key" 
                :value="val">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import AreaData from 'area-data';
    import find from 'lodash.find';

    import { assert, isArray } from './utils';

    export default {
        name: 'area-select',
        props: {
            value: {
                type: Array,
                required: true
            },
            type: {
                type: String,
                default: 'code', //  code-返回行政区域代码 text-返回文本 all-返回 code 和 text
                validator: (val) => ['all', 'code', 'text'].indexOf(val) > -1
            },
            placeholders: {
                type: Array,
                default: () => []
            },
            level: {
                type: Number,
                default: 1, // 0-->一联 1->二联 2->三联 3->四联
                validator: (val) => [0, 1, 2, 3].indexOf(val) > -1
            },
            size: {
                type: String,
                default: 'medium',
                validator: (val) => ['small', 'medium', 'large'].indexOf(val) > -1
            }
        },

        data () {
            return {
                provinces: AreaData['86'],
                citys: {},
                areas: {},
                streets: {},
                curProvince: '',
                curCity: '',
                curArea: '', // code/text
                curAreaCode: '', // only code
                curStreet: '',
                curStreetCode: '',
                defaults: [],
                isCode: false,
                isSetDefault: false
            };
        },

        computed: {
            classes () {
                return this.size === 'medium' ? 'medium' : this.size === 'small' ? 'small' : 'large';
            }
        },

        watch: {
            curProvince (val, oldVal) {
                this.isSetDefault = true;
                if (this.level === 0) {
                    this.selectChange();
                    return;
                }
                if (this.level >= 1) {
                    this.citys = AreaData[val];
                    if (this.defaults[1]) {
                        if (this.isCode) {
                            const curCity = find(Object.keys(this.citys), (item) => item === this.defaults[1]);
                            assert(curCity, `城市 ${this.defaults[1]} 不存在于省份 ${this.defaults[0]} 中`);
                            this.curCity = curCity;
                        } else {
                            const city = find(this.citys, (item) => item === this.defaults[1]);
                            assert(city, `城市 ${this.defaults[1]} 不存在于省份 ${this.defaults[0]} 中`);
                            this.curCity = find(Object.keys(this.citys), (item) => this.citys[item] === this.defaults[1]);
                        }
                    } else {
                        this.curCity = Object.keys(this.citys)[0];
                    }
                }
            },

            curCity (val, oldVal) {
                if (this.level === 1) {
                    this.selectChange();
                    return;
                }
                this.areas = AreaData[val];
                if (this.level >= 2) {
                    if (this.defaults[2] && this.areas) {
                        if (this.isCode) {
                            const curArea = find(Object.keys(this.areas), (item) => item === this.defaults[2]);
                            assert(curArea, `县区 ${this.defaults[2]} 不存在于城市 ${this.defaults[1]} 中`);
                            this.curArea = curArea;
                        } else {
                            const area = find(this.areas, (item) => item === this.defaults[2]);
                            assert(area, `县区 ${this.defaults[2]} 不存在于城市 ${this.defaults[1]} 中`);
                            this.curArea = find(Object.keys(this.areas), (item) => this.areas[item] === this.defaults[2]);
                        }
                    } else {
                        // fix 市级下不存在城区(#7)
                        this.curArea = this.areas ? Object.keys(this.areas)[0] : val;
                    }
                }
            },
    
            curArea (val, oldVal) {
                if (!/^\d+$/.test(String(val))) {
                    return;
                }
                this.curAreaCode = val;
                if (this.level === 2) {
                    this.selectChange();
                    return;
                }
                this.streets = AreaData[val];
                if (this.level >= 3) {
                    if (this.defaults[3] && this.streets) {
                        if (this.isCode) {
                            const curStreet = find(Object.keys(this.streets), (item) => item === this.defaults[3]);
                            assert(curStreet, `街道 ${this.defaults[3]} 不存在于县区 ${this.defaults[2]} 中`);
                            this.curStreet = curStreet;
                        } else {
                            const street = find(this.streets, (item) => item === this.defaults[3]);
                            assert(street, `街道 ${this.defaults[3]} 不存在于县区 ${this.defaults[2]} 中`);
                            this.curStreet = find(Object.keys(this.streets), (item) => this.streets[item] === this.defaults[3]);
                        }
                    } else {
                        this.curStreet = this.streets ? Object.keys(this.streets)[0] : val;
                    }
                }
            },

            curStreet (val, oldVal) {
                if (!/^\d+$/.test(String(val))) {
                    return;
                }
                this.curStreetCode = val;
                this.selectChange();
            },

            value () {
                if (isArray(this.value) && this.value.length && !this.isSetDefault) {
                    this.beforeSetDefault();
                    this.setDefaultValue();
                }
            }
        },

        methods: {
            getAreaText (selected) {
                const texts = [];
                let city = '';
                let area = '';
                let street = '';
    
                for (let i = 0, l = selected.length; i < l; i++) {
                    switch (i) {
                        case 0:
                            texts.push(this.provinces[this.curProvince]);
                            break;
                        case 1:
                            city = AreaData[this.curProvince][this.curCity];
                            texts.push(city);
                            break;
                        case 2:
                            area = AreaData[this.curCity] ? AreaData[this.curCity][this.curArea] : city;
                            if (!AreaData[this.curCity]) {
                                this.curArea = city;
                            }
                            texts.push(area);
                            break;
                        case 3:
                            street = AreaData[this.curArea] ? AreaData[this.curArea][this.curStreet] : area;
                            if (!AreaData[this.curArea]) {
                                this.curStreet = area;
                            }
                            texts.push(street);
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

            beforeSetDefault () {
                const chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]{3,}$/;
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
                this.defaults = this.value;
                this.isCode = isCode;
                this.isSetDefault = true;
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
                this.curProvince = provinceCode;
                // 还原默认值，避免用户选择出错
                this.$nextTick(() => {
                    this.defaults = [];
                    this.isCode = false;
                });
            },

            selectChange () {
                let selected = [];
                let res = [];

                switch (this.level) {
                    case 0:
                        selected = [this.curProvince];
                        break;
                    case 1:
                        selected = [this.curProvince, this.curCity];
                        break;
                    case 2:
                        selected = [this.curProvince, this.curCity, this.curAreaCode];
                        break;
                    case 3:
                        selected = [this.curProvince, this.curCity, this.curAreaCode, this.curStreetCode];
                        break;
                }

                if (this.type === 'code') {
                    this.getAreaText(selected);
                    res = selected;
                } else if (this.type === 'text') {
                    res = this.getAreaText(selected);
                } else {
                    res = this.getAll(selected);
                }
                this.$emit('input', res);
            }
        },

        created () {
            if (isArray(this.value) && this.value.length) {
                this.beforeSetDefault();
                this.setDefaultValue();
            }
        }
    };

</script>

<style>
    .area-select .el-select{
        width: 160px;
        margin-left: 10px;
    }
</style>