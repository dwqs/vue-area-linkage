<template>
    <li :class="['area-select-option', {
        'hover': hover,
        'selected': curSelected === value
    }]" :value="curValue"
        @click.stop="selectOptionClick"
        @mouseleave="leaveItem" 
        @mouseenter="hoverItem">
        {{curLabel}}
    </li>
</template>

<script>
    export default {
        inject: ['select'],
        props: {
            value: {
                type: [String, Number, Boolean],
                required: true
            },
            label: [String, Number]
        },

        data () {
            return {
                hover: false,
                isSelected: false
            };
        },

        computed: {
            curLabel () {
                return typeof this.label !== 'undefined' ? this.label : this.value;
            },

            curValue () {
                return typeof this.value !== 'undefined' ? this.value : this.label;
            },

            curSelected () {
                return this.select.val;
            }
        },

        methods: {
            leaveItem () {
                this.hover = false;
            },

            hoverItem () {
                this.hover = true;
            },

            selectOptionClick () {
                this.select.setSelectedValue(this);
            }
        },

        created () {
            this.select.options.push(this);
        }
    };
</script>