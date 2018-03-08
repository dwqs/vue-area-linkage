<template>
    <div class="area-select" :class="{
        'medium': size === 'medium',
        'small': size === 'small',
        'large': size === 'large',
        'is-disabled': disabled
    }">
        <span ref="trigger" class="area-selected-trigger" @click.stop="handleTriggerClick">{{label ? label : placeholder}}</span>
        <i :class="['area-select-icon', { 'active': shown }]"></i>
        <transition name="area-zoom-in-top" @before-enter="handleListEnter" @after-enter="handleAfterEnter">
            <div class="cascader-menu-list-wrap" v-show="shown" ref="wrap">
                <caspanel :data="options"></caspanel>
            </div>
        </transition>
    </div>
</template>

<script>
    import Bus from '../bus.js';
    import { contains } from '../utils.js';

    import Caspanel from './caspanel.vue';

    export default {
        provide () {
            return {
                'cascader': this
            };
        },
        props: {
            options: {
                type: Array,
                required: true
            },

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

            separator: {
                type: String,
                default: '/'
            }
        },

        components: {
            'caspanel': Caspanel
        },

        data () {
            return {
                shown: false,
                eventBus: null,
                vals: [], // 选中的值
                selectedItems: [], // 选中的 item对象
                label: '',
                initTransition: false
            };
        },

        watch: {
            value (val) {
                val.length && this.initValue();
            }
        },

        methods: {
            initValue () {
                this.eventBus.$emit('init-value', this.value);
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
                    this.initTransition = false;
                }
            },

            handleMenuItemClick (item, oldItem) {
                let oldVals = [].concat(this.vals);
                let oldSelectedItems = [].concat(this.selectedItems);

                if (!oldItem.value) {
                    oldVals.push(item.value);
                    oldSelectedItems.push(item);
                } else {
                    const index = oldVals.indexOf(oldItem.value);
                    if (index < 0) {
                        // 不存在直接添加
                        oldVals.push(item.value);
                        oldSelectedItems.push(item);
                    } else {
                        // 存在则截取前一段，后一段全去掉(后一段对应其子元素的选择项)
                        oldVals = oldVals.slice(0, index);
                        oldVals.push(item.value);
                        oldSelectedItems = oldSelectedItems.slice(0, index);
                        oldSelectedItems.push(item);
                    }
                }
                this.vals = [].concat(oldVals);
                this.selectedItems = [].concat(oldSelectedItems);
            },

            hiddenMenuWrap () {
                this.initTransition = false;
                this.shown = false;
                this.label = this.selectedItems.map(item => item.label).join(this.separator);
                this.$emit('change', this.vals);
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
                this.$nextTick(() => this.eventBus.$emit('set-scroll-top'));
            },

            handleAfterEnter () {
                this.initTransition = true;
                this.eventBus.$emit('transition-complete');
            }
        },

        created () {
            if (!Bus._Vue) {
                throw new Error('[area-cascader]: Must be call Vue.use(VueAreaLinkage) before used');
            }
            this.eventBus = Bus.createEventBus();
            this.eventBus.$on('item-click', this.handleMenuItemClick);
            this.eventBus.$on('hide-menu-wrap', this.hiddenMenuWrap);
        },

        mounted () {
            window.document.addEventListener('click', this.handleDocClick, false);

            if (this.value && this.value.length) {
                this.initValue();
            }
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick, false);
        }
    };
</script>