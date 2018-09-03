<template>
    <div>
        <h3 id="BasicUsage" data-section-title="GettingStarted">
            Basic usage
        </h3>

        <prism language="js" data-language="js">
            import Vue from 'vue'
            import VueTable from '@lossendae/vue-table'

            // install globally...
            Vue.use('vue-table', Vuetable)

            // Or in your Vue component
            export default {
            components: { Vuetable },
            ...
            }
        </prism>
    </div>
</template>

<script>
  import chapterMixin from '@docs/common/mixins/chapterMixin'

  export default {
    name: 'BasicUsage',
    mixins: [chapterMixin],
  }
</script>
