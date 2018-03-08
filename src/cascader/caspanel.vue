<template>
    <span>
        <ul class="cascader-menu-list" ref="list">
            <li v-for="(item, index) in data"
                :key="index" 
                :class="{
                    'cascader-menu-option': true,
                    'cascader-menu-extensible': item['children'],
                    'selected': cascader.vals.includes(item.value)
                }" 
                @click.stop="handleClickItem(item)">
                {{item.label}}
            </li>
        </ul>
        <caspanel v-if="sublist && sublist.length" :data="sublist"></caspanel>
    </span>
</template>

<script>
    import BeautifyScrollbar from 'beautify-scrollbar';

    import { isArray, scrollIntoView } from '../utils';

    let key = 0;

    export default {
        name: 'Caspanel',
        inject: ['cascader'],

        props: {
            data: {
                type: Array,
                default: () => []
            }
        },

        data () {
            return {
                sublist: [],
                scrollbar: null,
                // 记录上一次点击的 item
                oldItem: {},
                val: '',
                initialized: false // 是否是根据 vals 初始化过，避免初始化滚动条时的 getBoundingClientRect 获取的值不正确
            };
        },

        watch: {
            data () {
                this.sublist = [];
            }
        },

        methods: {
            getUniqueKey () {
                return key++;
            },

            getBaseItem (item) {
                const backItem = Object.assign({}, item);
                if (backItem.children) {
                    delete backItem.children;
                }
                return backItem;
            },

            handleClickItem (item) {
                if (this.cascader.vals.includes(item.value)) {
                    return;
                }
                this.triggerItem(item);
            },

            triggerItem (item) {
                const base = this.getBaseItem(item);
                this.cascader.eventBus.$emit('item-click', base, this.oldItem);
                this.oldItem = Object.assign({}, base);
                if (item.children && isArray(item.children) && item.children.length > 0) {
                    this.sublist = [].concat(item.children);
                } else {
                    this.sublist = [];
                    this.cascader.eventBus.$emit('hide-menu-wrap');
                }
            },

            createScrollbar () {
                const dom = this.$el.querySelector('.cascader-menu-list');
                if (!dom) {
                    return;
                }
    
                // this.scrollbar.element：修复根据 vals 初始化数据 element 可能为 null 的情况
                if (!this.scrollbar || !this.scrollbar.element) {
                    this.scrollbar = new BeautifyScrollbar(dom);
                    this.initialized && this.scrollToSelectedOption();
                } else {
                    if (this.scrollbar.contentHeight !== dom.scrollHeight) {
                        this.scrollbar.update({
                            contentHeight: dom.scrollHeight
                        });
                    }
                }
            },

            initCaspanel (vals) {
                for (let i = 0; i < vals.length; i++) {
                    for (let j = 0; j < this.data.length; j++) {
                        if (vals[i] === this.data[j].value) {
                            this.triggerItem(this.data[j]);
                            this.val = vals[i];
                            vals.splice(0, 1);
                            this.initialized = true;
                            this.$nextTick(() => {
                                this.cascader.eventBus.$emit('init-value', vals);
                            });
                            break;
                        }
                    }
                }
            },

            scrollToSelectedOption (fromInit = false) {
                const dom = this.$el.querySelector('.cascader-menu-list');
                const seletedOption = this.data.filter(item => item.value === this.val);
    
                if (seletedOption.length && dom) {
                    const target = dom.querySelector('.selected');
                    scrollIntoView(dom, target);
                }
            }
        },

        mounted () {
            // 根据 value 初始化数据
            this.cascader.eventBus.$on('init-value', this.initCaspanel);
            this.cascader.eventBus.$on('set-scroll-top', this.scrollToSelectedOption);

            if (!this.cascader.initTransition) {
                this.cascader.eventBus.$on('transition-complete', this.createScrollbar);
            } else {
                !this.initialized && this.$nextTick(() => {
                    this.createScrollbar();
                });
            }
        },

        updated () {
            // 更新 contentHeight
            !this.initialized && this.createScrollbar();
        },

        beforeDestroy () {
            this.scrollbar && this.scrollbar.destroy();
        }
    };
</script>
