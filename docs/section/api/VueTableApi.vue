<template>
    <div>
        <h3 id="VueTableApi" data-section-title="Api">
            VueTable
        </h3>

        <blockquote class="blockquote">
            <p class="mb-0">
                This component scripts is available as a mixin.
            </p>
        </blockquote>

        <h5>Props</h5>

        <vue-table class="table-bordered table-striped"
                :columns="available_props_columns"
                :rows="available_props">
            <template slot="name" slot-scope="{ row }">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot="type" slot-scope="{ row }">
                <em>{{ row.type }}</em>
            </template>
            <template slot="required" slot-scope="{ row }">
                <code>{{ row.required }}</code>
            </template>
            <template slot="default" slot-scope="{ row }">
                <code>{{ row.default }}</code>
            </template>
        </vue-table>
    </div>
</template>

<script>
  import chapterMixin from '@docs/common/mixins/chapterMixin'

  export default {
    name: 'VueTableApi',
    mixins: [chapterMixin],
    data() {
      return {
        available_props_columns: ['name', 'type', 'required', 'default', 'description'],
        available_props: [{
          name: 'columns',
          type: 'Array',
          required: 'true',
          default: null,
          description: 'Array of column definition',
        },{
          name: 'rows',
          type: 'Array',
          required: 'true',
          default: null,
          description: 'Array of rows to show in table',
        },{
          name: 'sortBy',
          type: 'Array',
          required: 'false',
          default: null,
          description: 'Name of the column currently sorted',
        },{
          name: 'sortDirection',
          type: 'Array',
          required: 'false',
          default: 'asc',
          description: 'Direction in which the column is sorted. Can be either `asc` or `desc`',
        }],
      }
    },
  }
</script>
