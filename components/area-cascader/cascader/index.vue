<template>
    <div class="area-select" :class="{
        'medium': size === 'medium',
        'small': size === 'small',
        'large': size === 'large',
        'is-disabled': disabled
    }">
        <span ref="trigger" class="area-selected-trigger" @click.stop="handleTriggerClick">{{label ? label : placeholder}}</span>
        <i :class="['area-select-icon', { 'active': shown }]"></i>
        <transition name="area-zoom-in-top" @before-enter="handleListEnter">
            <div class="cascader-menu-list-wrap" v-show="shown" ref="wrap">
                <caspanel :data="options"></caspanel>
            </div>
        </transition>
    </div>
</template>

<script>
    import Bus from '@src/bus.js';
    import { contains } from '@src/utils.js';
    import Emitter from '../mixins/emitter';

    import Caspanel from './caspanel.vue';

    export default {
        provide () {
            return {
                'cascader': this
            };
        },
        mixins: [Emitter],
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
                tmpVals: [], // 临时保存选择的值
                vals: [], // 选中的值
                tmpItems: [], // 临时选中的 item对象
                selectedItems: [], // 选中的 item对象
                label: '',
                useTmp: false // 选择时使用临时数据交互
            };
        },

        watch: {
            value (val) {
                val.length && this.initValue();
            }
        },

        methods: {
            initValue () {
                this.broadcast('Caspanel', 'update-selected', {
                    value: this.value,
                    from: 'init'
                });
                this.vals = [].concat(this.value);
            },

            setUseTmp (val) {
                this.useTmp = val;
            },

            resetTmpVal () {
                this.tmpVals = [];
                this.tmpItems = [];
                this.setUseTmp(false);
                if (!this.shown && this.vals.length) {
                    this.broadcast('Caspanel', 'update-selected', {
                        value: this.vals
                    });
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
                    this.resetTmpVal();
                }
            },

            handleMenuItemClick (item, oldItem) {
                let oldVals = [].concat(this.tmpVals);
                let oldSelectedItems = [].concat(this.tmpItems);

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
                this.tmpVals = [].concat(oldVals);
                this.tmpItems = [].concat(oldSelectedItems);
            },

            hiddenMenuWrap (from) {
                this.vals = [].concat(this.tmpVals);
                this.selectedItems = [].concat(this.tmpItems);
                this.shown = false;
                this.label = this.selectedItems.map(item => item.label).join(this.separator);
                if (from === 'init' || from === 'click') {
                    this.$emit('change', this.vals);
                }
            },

            handleListEnter () {
                this.$nextTick(() => this.eventBus.$emit('set-scroll-top'));
            }
        },

        created () {
            if (!Bus._Vue) {
                throw new Error('[area-cascader]: Must be call Vue.use(VueAreaLinkage) before used');
            }
            this.eventBus = Bus.createEventBus();
            this.eventBus.$on('item-click', this.handleMenuItemClick);
            this.eventBus.$on('hide-menu-wrap', this.hiddenMenuWrap);
            this.eventBus.$on('set-use-tmp', this.setUseTmp);
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