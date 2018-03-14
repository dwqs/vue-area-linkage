<template>
    <div class="area-select" :class="{
        'medium': size === 'medium',
        'small': size === 'small',
        'large': size === 'large',
        'is-disabled': disabled
    }">
        <span ref="trigger" class="area-selected-trigger" @click="handleTriggerClick">{{label ? label : placeholder}}</span>
        <i :class="['area-select-icon', { 'active': shown }]" @click.stop="handleTriggerClick"></i>
        <transition name="area-zoom-in-top" @before-enter="handleListEnter" @after-enter="handleAfterEnter">
            <div class="area-selectable-list-wrap" v-show="shown" ref="wrap">
                <ul class="area-selectable-list">
                    <slot></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import BeautifyScrollbar from 'beautify-scrollbar';

    import { contains, scrollIntoView } from '@src/utils.js';

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

                scrollbar: null
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
                }
            },

            handleTriggerClick () {
                if (this.disabled) {
                    return;
                }
                this.shown = !this.shown;
            },

            handleDocClick (e) {
                const target = e.target;
                if (!contains(this.$el, target) && this.shown) {
                    this.shown = false;
                }
            },

            setSelectedValue (option) {
                this.label = option.label;
                this.val = option.curValue;
                this.$emit('input', option.curValue);
                this.shown = false;
                this.$emit('change', option.curValue);
            },

            scrollToSelectedOption () {
                const seletedOption = this.options.filter(option => option.curValue === this.val);
                if (seletedOption.length) {
                    const target = seletedOption[0].$el;
                    const container = this.$el.querySelector('.area-selectable-list');

                    scrollIntoView(container, target);
                }
            },

            handleListEnter () {
                this.$nextTick(() => this.scrollToSelectedOption());
            },

            handleAfterEnter () {
                if (!this.scrollbar) {
                    this.scrollbar = new BeautifyScrollbar(this.$refs.wrap);
                }
            }
        },

        mounted () {
            window.document.addEventListener('click', this.handleDocClick, false);
            this.$nextTick(() => {
                this.setDef();
            });
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick, false);
            this.scrollbar && this.scrollbar.destroy();
        }
    };
</script>
