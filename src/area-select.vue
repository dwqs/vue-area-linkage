<template>
    <div class="area-select">
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

    export default {
        name: 'area-select',
        props: {
            value: {
                required: true
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
            'default-value': {
                type: Array,
                default: () => []
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
                curArea: '',
                curStreet: ''
            };
        },

        computed: {
            province () {
                console.log('default curProvince', this['default-value']);
                return '';
            }
        },

        watch: {
            curProvince (val, oldVal) {
                console.log('watch curProvince', AreaData[val]);
                if (this.level === 0) {
                    this.selectChange();
                    return;
                }
                if (this.level >= 1) {
                    this.citys = AreaData[val];
                    this.curCity = Object.keys(this.citys)[0];
                }
            },

            curCity (val, oldVal) {
                console.log('watch curCity', val, AreaData[val]);
                if (this.level === 1) {
                    this.selectChange();
                    return;
                }
                if (this.level >= 2) {
                    this.areas = AreaData[val];
                    this.curArea = Object.keys(this.areas)[0];
                }
            },
    
            curArea (val, oldVal) {
                console.log('watch curArea', val);
                if (this.level === 2) {
                    this.selectChange();
                    return;
                }
                if (this.level >= 3) {
                    this.streets = AreaData[val];
                    this.curStreet = Object.keys(this.streets)[0];
                }
            },

            curStreet (val, oldVal) {
                console.log('watch curStreet', this.curStreet);
                this.selectChange();
            }
        },

        methods: {
            selectChange () {
                let selected = [];
                switch (this.level) {
                case 0:
                    selected = [this.curProvince];
                    break;
                case 1:
                    selected = [this.curProvince, this.curCity];
                    break;
                case 2:
                    selected = [this.curProvince, this.curCity, this.curArea];
                    break;
                case 3:
                    selected = [this.curProvince, this.curCity, this.curArea, this.curStreet];
                    break;
                }
                this.$emit('input', selected);
            }
        },

        created () {
            console.log('66666666 created', this.defaultValue, this.provinces);
        }
    };

</script>

<style>
    .area-select .el-select{
        width: 160px;
        margin-left: 10px;
    }
</style>