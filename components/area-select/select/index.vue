<template>
    <div class="area-select" :class="{
        'medium': size === 'medium',
        'small': size === 'small',
        'large': size === 'large',
        'is-disabled': disabled
    }" ref="area">
        <span ref="trigger" class="area-selected-trigger" @click="handleTriggerClick">{{label ? label : placeholder}}</span>
        <i :class="['area-select-icon', { 'active': shown }]" @click.stop="handleTriggerClick"></i>
        <transition name="area-zoom-in-top" @before-enter="handleListEnter">
            <div class="area-selectable-list-wrap" v-show="shown" ref="wrap" :style="{top: top + 'px'}">
                <ul class="area-selectable-list">
                    <slot></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import { contains, scrollIntoView, setPanelPosition } from '@src/utils.js';

    export default {
        provide () {
            return {
                'select': this
            };
        },
        props: {
            value: {
                type: [String, Number, Boolean]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            size: {
                type: String,
                default: 'medium',
                validator: (val) => ['small', 'medium', 'large'].indexOf(val) > -1
            }
        },

        data () {
            return {
                shown: false,
                options: [],
                label: '',
                val: '',

                areaRect: null,
                top: 32
            };
        },

        watch: {
            value (val) {
                this.setDef();
            },

            options (val) {
                this.setDef();
            }
        },

        methods: {
            setDef () {
                if (this.value) {
                    const option = this.options.filter(opt => opt.value === this.value);
                    this.label = option[0] ? option[0].label : '';
                    this.val = option[0] ? option[0].value : '';
                } else {
                    this.label = '';
                    this.val = '';
                }
            },

            handleTriggerClick () {
                if (this.disabled) {
                    return;
                }
                this.shown = !this.shown;
            },

            setPosition () {
                const panelHeight = parseInt(window.getComputedStyle(this.$refs.wrap, null).getPropertyValue('height'));
                this.top = setPanelPosition(panelHeight, this.areaRect);
            },

            handleDocClick (e) {
                const target = e.target;
                if (!contains(this.$el, target) && this.shown) {
                    this.shown = false;
                }
            },

            handleDocResize () {
                this.areaRect = this.$refs.area.getBoundingClientRect();
                this.$nextTick(() => {
                    this.setPosition();
                });
            },

            setSelectedValue (option) {
                this.label = option.label;
                this.val = option.value;
                this.$emit('input', option.value);
                this.shown = false;
                this.$emit('change', option.value);
            },

            scrollToSelectedOption () {
                this.setPosition();
                const seletedOption = this.options.filter(option => option.value === this.val);
                if (seletedOption.length) {
                    const target = seletedOption[0].$el;
                    const container = this.$el.querySelector('.area-selectable-list-wrap');

                    scrollIntoView(container, target);
                }
            },

            handleListEnter () {
                this.$nextTick(() => this.scrollToSelectedOption());
            }
        },

        mounted () {
            this.areaRect = this.$refs.area.getBoundingClientRect();
            this.top = this.areaRect.height;
            window.document.addEventListener('scroll', this.handleDocResize, false);
            window.addEventListener('resize', this.handleDocResize, false);

            window.document.addEventListener('click', this.handleDocClick, false);
            this.$nextTick(() => {
                this.setDef();
            });
        },

        beforeDestroy () {
            window.document.removeEventListener('scroll', this.handleDocResize, false);
            window.removeEventListener('resize', this.handleDocResize, false);

            window.document.removeEventListener('click', this.handleDocClick, false);
        }
    };
</script>
