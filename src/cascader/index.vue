<template>
    <div class="area-select" :class="{'is-disabled': disabled}">
        <span ref="trigger" class="area-selected-trigger" @click.stop="handleTriggerClick">{{placeholder}}</span>
        <i :class="['area-select-icon', { 'active': shown }]"></i>
        <transition name="area-zoom-in-top" @before-enter="handleListEnter" @after-enter="handleAfterEnter">
            <div class="cascader-menu-list-wrap" v-show="shown" ref="wrap">
                <ul class="cascader-menu-list">
                    <li class="cascader-menu-option cascader-menu-extensible">aaa</li>
                </ul>
                <!-- <ul class="cascader-selectable-list">
                    <li class="cascader-select-option">aaa</li>
                </ul>
                <ul class="cascader-selectable-list">
                    <li class="cascader-select-option">aaa</li>
                </ul> -->
            </div>
        </transition>
    </div>
</template>

<script>
    import BeautifyScrollbar from 'beautify-scrollbar';

    import { contains } from '../utils.js';

    export default {
        provide () {
            return {
                'cascader': this
            };
        },
        props: {
            value: {
                type: Array,
                default: () => []
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
            },

            options: {
                type: Array
                // required: true
            },

            separator: {
                type: String,
                default: '/'
            }
        },

        data () {
            return {
                shown: false,
                scrollbar: null
            };
        },

        methods: {
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

            flattenOptions (options, ancestor = []) {
                let flatOptions = [];
                options.forEach((option) => {
                    const optionsStack = ancestor.concat(option);
                    if (!option['children']) {
                        flatOptions.push(optionsStack);
                    } else {
                        if (this.changeOnSelect) {
                            flatOptions.push(optionsStack);
                        }
                        flatOptions = flatOptions.concat(this.flattenOptions(option['children'], optionsStack));
                    }
                });
                return flatOptions;
            },

            scrollToSelectedOption () {
                // const seletedOption = this.options.filter(option => option.curValue === this.val);
                // if (seletedOption.length) {
                //     const target = seletedOption[0].$el;
                //     const container = this.$el.querySelector('.area-selectable-list');

                //     // refrence: https://github.com/ElemeFE/element/blob/dev/src/utils/scroll-into-view.js
                //     const top = target.offsetTop;
                //     const bottom = target.offsetTop + target.offsetHeight;
                //     const viewRectTop = container.scrollTop;
                //     const viewRectBottom = viewRectTop + container.clientHeight;

                //     if (top < viewRectTop) {
                //         container.scrollTop = top;
                //     } else if (bottom > viewRectBottom) {
                //         container.scrollTop = bottom - container.clientHeight;
                //     }
                // }
            },

            handleListEnter () {
                this.$nextTick(() => this.scrollToSelectedOption());
            },

            handleAfterEnter () {
                if (!this.scrollbar) {
                    // this.scrollbar = new BeautifyScrollbar(this.$refs.wrap);
                }
            }
        },

        mounted () {
            window.document.addEventListener('click', this.handleDocClick, false);
            // this.$nextTick(() => {
            //     this.setDef();
            // });
            console.log('sssss', this.flattenOptions([{
                value: '1',
                label: '2',
                children: [{
                    value: '3',
                    label: '4'
                }, {
                    value: '5',
                    label: '6'
                }]
            }, {
                value: '21',
                label: '22',
                children: [{
                    value: '23',
                    label: '24'
                }]
            }]));
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick, false);
            // this.scrollbar && this.scrollbar.destroy();
        }
    };
</script>