<template>
    <section class="chapter">
        <h3 id="ColumnDefinitions" data-section-title="Examples">
            Column definitions
        </h3>

        <h5 id="#DefiningColumnsWithObject">Defining columns with Object</h5>

        <p>
            In the previous example, we were using an array to define the available columns.<br>
            Internally, vue-table uses
            <a href="https://lodash.com/docs/4.17.10#startCase">lodash</a> to format the keys displayed on each columns.
        </p>
        <p>
            While it's the simplest way of defining columns, using an array of objects gives you more flexibility and options.
            <br>
            You can define the following keys :
        </p>
        <ul>
            <li><code>name</code> for the column mapping</li>
            <li><code>title</code> if you need a custom title for the column (which will not be formatted with lodash)
            </li>
        </ul>

        <div class="example">
            <div class="result">
                <vue-table :columns="columns.as_objects" :rows="default_items"></vue-table>
            </div>

            <tabs v-model="active_tab_0" class="p-0 m-0">
                <tab-item class="col p-0"
                          :title="tab.title"
                          v-for="tab in tabs_0"
                          :key="tab.language"
                >
                    <prism
                            :language="tab.language"
                            :data-language="tab.language"
                            :data-line="tab.language === 'js' ? '4-11' : null"
                    >
                        {{ tab.content }}
                    </prism>
                </tab-item>
            </tabs>
        </div>

        <h5 id="#DefiningSortableColumns">Defining sortable columns</h5>

        <p>
            Vue-table component does not process the sortable behaviour internally. <br>
            Instead, an event is emitted and let the parent do the work as it please. Whether it's handled locally or server side is up to the developer.
        </p>
        <p>
            To define a column key as sortable, add the <code>sortable</code> key to your column definition. <br>
            This sortable key can be either set to the boolean
            <code>true</code> to use the name as the column, or a string indicating the name the key you want to use when the event is emitted.
        </p>
        <p>Each column defined as sortable will be displayed as a link with a direction icon for the currently sorted column.</p>
        <p>
            Once clicked, the vue-table emit the event <code>column:sort</code> containing the <code>sortBy</code> and
            <code>sortDirection</code> keys. <br>
        </p>
        <p>
            Additionally, you can use the <code>sort-by</code> and
            <code>sort-direction</code> props to indicate which field is sorted.
        </p>

        <div class="example">
            <div class="result">
                <vue-table
                        :columns="columns.sortable"
                        :rows="sorted_rows"
                        :sort-by="sort.by"
                        :sort-direction="sort.direction"
                        @column:sort="onSort"
                ></vue-table>
            </div>

            <tabs v-model="active_tab_1" class="p-0 m-0">
                <tab-item class="col p-0"
                          :title="tab.title"
                          v-for="tab in tabs_1"
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
  import sample_0     from './samples/basic_column_object.js'
  import sample_1     from './samples/columns_sortable.js'

  export default {
    name: 'ColumnDefinitions',
    mixins: [chapterMixin],
    data() {
      return {
        active_tab_0: 0,
        active_tab_1: 0,
        columns: {
          as_objects: [{
            name: 'name',
          }, {
            name: 'nickname',
            title: 'Pseudonym',
          }, {
            name: 'company_name',
          }],
          sortable: [{
            name: 'name',
            sortable: true,
          }, {
            name: 'nickname',
            title: 'Pseudonym',
            sortable: true,
          }, {
            name: 'formatted_age',
            title: 'Age',
            sortable: 'age',
          }],
        },
        default_items: [{
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
        sortable_items: [{
          name: 'Robert Duvak',
          nickname: 'jose26',
          age: 46,
          formatted_age: 'He\'s 46 years old',
        }, {
          name: 'Isabelle Champion',
          nickname: 'isa',
          age: 22,
          formatted_age: 'She\'s 22 years old',
        }, {
          name: 'Alberto Tulador',
          nickname: 'beber',
          age: 33,
          formatted_age: 'He\'s 33 years old',
        }],
        sort: {
          by: "name",
          direction: "asc",
        },
      }
    },
    computed: {
      tabs_0() {
        return Object.keys(sample_0).map(key => this.formatSample(key, sample_0))
      },
      tabs_1() {
        return Object.keys(sample_1).map(key => this.formatSample(key, sample_1))
      },
      // This could also be done server side
      sorted_rows() {
        return this.sortable_items.sort((a, b) => {
          if (this.sort.direction === "asc") {
            if (a[this.sort.by] < b[this.sort.by]) return -1
            if (a[this.sort.by] > b[this.sort.by]) return 1
            return 0
          }

          if (b[this.sort.by] < a[this.sort.by]) return -1
          if (b[this.sort.by] > a[this.sort.by]) return 1
          return 0
        })
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
      onSort({ sortBy, sortDirection }) {
        this.sort.by = sortBy
        this.sort.direction = sortDirection
      },
    },
  }
</script>
