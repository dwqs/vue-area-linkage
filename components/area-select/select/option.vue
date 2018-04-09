<template>
    <li :class="['area-select-option', {
        'hover': hover,
        'selected': curSelected === value
    }]" :value="value"
        @click.stop="selectOptionClick"
        @mouseleave="leaveItem" 
        @mouseenter="hoverItem">
        {{label}}
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