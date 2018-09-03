<template>
    <div>
        <h3 id="VueTablePaginationApi" data-section-title="Api">
            VueTablePagination
        </h3>

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
    name: 'VueTablePaginationApi',
    mixins: [chapterMixin],
    data() {
      return {
        available_props_columns: ['name', 'type', 'required', 'default', 'description'],
        available_props: [{
          name: 'showRefreshButton',
          type: 'Boolean',
          required: false,
          default: true,
          description: 'If true, will show a button which emits the `pagination:change` event on click',
        }, {
          name: 'useFirstLastLinks',
          type: 'Boolean',
          required: false,
          default: true,
          description: 'Whether the pagination should show the first and last links',
        }, {
          name: 'useBoundariesNumbersLinks',
          type: 'Boolean',
          required: false,
          default: false,
          description: 'Whether the pagination should show the boundaries links which can be either numbers or ellipses',
        }, {
          name: 'useNextPrevLinks',
          type: 'Boolean',
          required: false,
          default: false,
          description: 'Whether the pagination should show the next and previous page links',
        }, {
          name: 'firstText',
          type: 'String',
          required: false,
          default: '«',
          description: 'Text of the first page link',
        }, {
          name: 'lastText',
          type: 'String',
          required: false,
          default: '»',
          description: 'Text of the last page link',
        }, {
          name: 'nextText',
          type: 'String',
          required: false,
          default: '<',
          description: 'Text of the next page link',
        }, {
          name: 'previousText',
          type: 'String',
          required: false,
          default: '>',
          description: 'Text of the previous page link',
        }, {
          name: 'useEllipses',
          type: 'Boolean',
          required: false,
          default: true,
          description: 'Whether the table should use ellipses',
        }, {
          name: 'rotate',
          type: 'Boolan',
          required: false,
          default: true,
          description: 'Whether the page should be kept in the middle when possible',
        }, {
          name: 'maxPageItems',
          type: 'Number',
          required: false,
          default: 5,
          description: 'When using ellipses, this is the maximum number of page items that will be shown',
        }, {
          name: 'itemsPerPage',
          type: 'Number',
          required: false,
          default: 15,
          description: 'Amount of items per page',
        }, {
          name: 'totalItems',
          type: 'Number',
          required: true,
          default: null,
          description: 'Total amount of items',
        }, {
          name: 'currentPage',
          type: 'Number',
          required: true,
          default: null,
          description: 'Current page number',
        },
        ],
      }
    },
  }
</script>




































































