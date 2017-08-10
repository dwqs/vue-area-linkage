<template>
    <div class="area-cascader">
        <el-cascader 
            :options="options" 
            v-model="selectedOptions" 
            @change="handleChange">
        </el-cascader>
    </div>
</template>

<script>
    import AreaData from 'area-data';

    export default {
        name: 'area-cascader',
        props: {
            level: {
                type: Number,
                default: 2, // 0-->一联 1->二联 2->三联 
                validator: (val) => [0, 1, 2].indexOf(val) > -1
            }
        },

        data () {
            return {
                // only array
                selectedOptions: [],
                options: []
            };
        },

        methods: {
            handleChange (val) {
                console.log('handlechange', val);
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
            if (this.level === 0) {
                this.options = this.iterate(AreaData['86']);
                return;
            }

            if (this.level === 1) {
                this.options = this.iterateCities();
                return;
            }

            if (this.level === 2) {
                this.options = this.iterateAreas();
                return;
            }
        }
    };

</script>