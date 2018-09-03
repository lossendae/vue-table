<template>
    <div class="tab-pane" :class="{ active: is_active }">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'TabItem',
        props: {
            title: String,
            disabled: Boolean,
            visible: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                is_active: false,
            }
        },
        methods: {
            /**
             * Activate tab.
             */
            activate(oldIndex, index) {
                this.is_active = true
            },
            /**
             * Deactivate tab.
             */
            deactivate(oldIndex, index) {
                this.is_active = false
            },
        },
        created() {
            if (!this.$parent.$data._is_tabs) {
                this.$destroy()
                throw new Error('You should wrap TabItem with a Tabs component')
            }
            this.$parent.tab_items.push(this)
        },
        beforeDestroy() {
            const index = this.$parent.tab_items.indexOf(this)
            if (index >= 0) {
                this.$parent.tab_items.splice(index, 1)
            }
        },
    }
</script>
