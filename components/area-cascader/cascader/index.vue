<template>
    <div class="area-select" :class="{
        'medium': size === 'medium',
        'small': size === 'small',
        'large': size === 'large',
        'is-disabled': disabled
    }" ref="area">
        <span ref="trigger" class="area-selected-trigger" @click.stop="handleTriggerClick">{{label ? label : placeholder}}</span>
        <i :class="['area-select-icon', { 'active': shown }]" @click.stop="handleTriggerClick"></i>
        <transition name="area-zoom-in-top" @before-enter="handleListEnter">
            <div class="cascader-menu-list-wrap" v-show="shown" ref="wrap" :style="{top: top + 'px'}">
                <caspanel :data="options"></caspanel>
            </div>
        </transition>
    </div>
</template>

<script>
    import Bus from '@src/bus.js';
    import { contains, setPanelPosition } from '@src/utils.js';
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

            data: {
                type: Object,
                required: true
            },

            defaultsAreaCodes: {
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
                // 计算位置
                areaRect: null,
                top: 32,

                shown: false,
                eventBus: null,
                activeValues: [], // 当前激活项
                values: [], // 当前选择项
                labels: [], // 地区的文本
                label: '',
                isClickOutSide: false
            };
        },

        watch: {
            defaultsAreaCodes (val) {
                val.length && this.initValue();
            }
        },

        methods: {
            initValue () {
                this.broadcast('Caspanel', 'update-selected', {
                    value: this.defaultsAreaCodes
                });
                this.values = [].concat(this.defaultsAreaCodes);
            },

            getActiveLabels (codes) {
                const provinces = this.data['86'];
                const citys = this.data[codes[0]];
                const l = codes.length;

                if (l < 2) {
                    return [];
                }

                let labels = [];

                if (l === 2) {
                    labels = [provinces[codes[0]], citys[codes[1]]];
                } else if (l === 3) {
                    // fix #7
                    const areas = this.data[codes[1]];
                    labels = [provinces[codes[0]], citys[codes[1]], areas ? areas[codes[2]] : citys[codes[2]]];
                }

                return labels;
            },

            resetActiveVal () {
                this.activeValues = [].concat(this.values);
                this.labels = this.getActiveLabels(this.values);
                if (!this.shown && this.values.length) {
                    this.broadcast('Caspanel', 'update-selected', {
                        value: this.values
                    });
                }
            },

            handleTriggerClick () {
                if (this.disabled) {
                    return;
                }
                this.$emit('set-default');
                const tmp = this.shown;
                this.shown = !this.shown;

                if (!tmp) {
                    this.isClickOutSide = false;
                } else {
                    this.isClickOutSide = true;
                    this.resetActiveVal();
                }
            },

            setPosition () {
                const panelHeight = parseInt(window.getComputedStyle(this.$refs.wrap, null).getPropertyValue('height'));
                this.top = setPanelPosition(panelHeight, this.areaRect);
            },

            handleDocClick (e) {
                const target = e.target;
                if (!contains(this.$el, target) && this.shown) {
                    this.shown = false;
                    this.isClickOutSide = true;
                    this.resetActiveVal();
                }
            },

            handleDocResize () {
                this.areaRect = this.$refs.area.getBoundingClientRect();
                this.$nextTick(() => {
                    this.setPosition();
                });
            },

            handleMenuItemClick (item, oldItem) {
                const { label, value, children, panelIndex } = item;

                let activeValues = this.activeValues;
                let labels = this.labels;

                activeValues = activeValues.slice(0, panelIndex + 1);
                activeValues[panelIndex] = value;
                labels = labels.slice(0, panelIndex + 1);
                labels[panelIndex] = label;

                this.activeValues = [].concat(activeValues);
                this.labels = [].concat(labels);
            },

            handleSelectedChange () {
                this.shown = false;
                this.values = [].concat(this.activeValues);
                this.label = this.labels.join(this.separator);
                if (!this.isClickOutSide) {
                    this.$emit('change', this.values, this.labels);
                }
            },

            handleListEnter () {
                this.$nextTick(() => {
                    this.setPosition();
                    this.eventBus.$emit('set-scroll-top');
                });
            }
        },

        created () {
            if (!Bus._Vue) {
                throw new Error('[area-cascader]: Must be call Vue.use(VueAreaLinkage) before used');
            }
            this.eventBus = Bus.createEventBus();
            this.eventBus.$on('selected', this.handleSelectedChange);
        },

        mounted () {
            this.areaRect = this.$refs.area.getBoundingClientRect();
            this.top = this.areaRect.height;

            window.document.addEventListener('scroll', this.handleDocResize, false);
            window.addEventListener('resize', this.handleDocResize, false);
            window.document.addEventListener('click', this.handleDocClick, false);

            if (this.defaultsAreaCodes && this.defaultsAreaCodes.length) {
                this.initValue();
            }
        },

        beforeDestroy () {
            window.document.removeEventListener('scroll', this.handleDocResize, false);
            window.removeEventListener('resize', this.handleDocResize, false);
            window.document.removeEventListener('click', this.handleDocClick, false);
        }
    };
</script>