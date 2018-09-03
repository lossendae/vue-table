<template>
    <section>
        <ul class="nav" role="tablist" :class="navClasses">
            <slot name="before_navs"/>
            <li class="nav-item"
                v-for="(tab_item, index) of tab_items"
                :key="index"
                v-show="tab_item.visible"
            >
                <a class="nav-link" href=""
                   :class="{ active: active_tab === index, disabled: tab_item.disabled }"
                   @click.prevent="onTabClick(index)"
                >
                    <template v-if="tab_item.$slots.header">
                        <slot-renderer
                                :component="tab_item"
                                name="title"
                                tag="span"
                        />
                    </template>
                    <template v-else>
                        <span>{{ tab_item.title }}</span>
                    </template>
                </a>
            </li>
            <slot name="after_navs"/>
        </ul>
        <div class="tab-content" :class="contentClasses">
            <slot/>

            <slot name="after_content"/>
        </div>
    </section>
</template>

<script>
    import SlotRenderer from '../utils/SlotRenderer'

    export default {
        name: 'Tabs',
        components: {
            [SlotRenderer.name]: SlotRenderer,
        },
        props: {
            value: [String, Number],
            navClasses: {
                type: String,
                default: 'align-items-center nav-tabs nav-tabs-alt'
            },
            contentClasses: {
                type: String,
                default: 'row m-0'
            },
        },
        data() {
            return {
                active_tab: this.value || 0,
                tab_items: [],
                _is_tabs: true // Used internally by TabItem
            }
        },
        methods: {
            /**
             * Change the active tab and emit change event.
             */
            activate(index) {
                if (this.active_tab === index) return
                this.tab_items[this.active_tab].deactivate(this.active_tab, index)
                this.tab_items[index].activate(this.active_tab, index)
                this.active_tab = index
                this.$emit('change', index)
            },
            /**
             * Tab click listener, emit input event and change active tab.
             */
            onTabClick(value) {
                this.$emit('input', value)
                this.activate(value)
            },
        },
        mounted() {
            if (this.tab_items.length) {
                this.tab_items[this.active_tab].is_active = true
            }
        },
        watch: {
            /**
             * When v-model is changed set the new active tab.
             */
            value(value) {
                this.activate(value)
            },
            /**
             * When tab-items are updated, set active one.
             */
            tab_items() {
                if (this.tab_items.length) {
                    this.tab_items[this.active_tab].is_active = true
                }
            },
        },
    }
</script>
