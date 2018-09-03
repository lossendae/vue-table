<template>
    <section class="chapter">
        <h3 id="BasicTable" data-section-title="Examples">
            Basic table
        </h3>

        <blockquote class="blockquote">
            <p class="mb-0">
                By default, <strong>Vue-table</strong> uses Bootstrap 4.x with Fontawesome 4.7.<br>
                There are other examples using other CSS framework and/or icon sets.
            </p>
        </blockquote>

        <p>Vue-table needs 2 parameters to show a basic table.</p>

        <ul>
            <li>An array of column definition, which list the column keys to use in the result set</li>
            <li>An array of items to use as the table rows</li>
        </ul>

        <div class="example">
            <div class="result">
                <vue-table :columns="columns" :rows="items"></vue-table>
            </div>

            <tabs v-model="active_tab" class="p-0 m-0">
                <tab-item class="col p-0"
                          :title="tab.title"
                          v-for="tab in tabs"
                          :key="tab.language"
                >
                    <prism
                            :language="tab.language"
                            :data-language="tab.language"
                    >
                        {{ tab.content }}
                    </prism>
                </tab-item>
            </tabs>
        </div>
    </section>
</template>

<script>
  import chapterMixin from '@docs/common/mixins/chapterMixin'
  import sample from './samples/basic.js'

  export default {
    name: 'BasicTable',
    mixins: [chapterMixin],
    data() {
      return {
        active_tab: 0,
        active_tab2: 0,
        columns: ['name', 'nickname', 'company_name'],
        items: [{
          name: 'Robert Duvak',
          nickname: 'jose26',
          company_name: 'Apple Inc.',
        }, {
          name: 'Isabelle Champion',
          nickname: 'isa',
          company_name: 'EDF',
        }, {
          name: 'Alberto Tulador',
          nickname: 'beber',
          company_name: 'Matla',
        }],
        columns_objects:[{
          name: 'name',
        },{
          name: 'nickname',
          title: 'Pseudonym'
        },{
          name: 'company_name',
        }]
      }
    },
    computed: {
      tabs() {
        return Object.keys(sample).map(key => this.formatSample(key, sample))
      },
      tabs2() {
        return Object.keys(sample2).map(key => this.formatSample(key, sample2))
      },
    },
    methods: {
      formatSample(key, sample) {
        return {
          title: this.formatTabTitle(key),
          language: key.toLowerCase(),
          content: sample[key],
        }
      },
      formatTabTitle(key) {
        if (key === 'js') {
          return 'Code'
        }
        if (key === 'html') {
          return 'Template'
        }
        return key[0].toUpperCase() + key.toLocaleLowerCase().slice(1)
      },
    },
  }
</script>
