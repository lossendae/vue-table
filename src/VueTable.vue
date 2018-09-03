<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="(column, index) in columns" :key="`column_${index}`" :class="getColumnClasses(column)">
                    <slot :name="`header__${column.name}`" :column="column">
                        <a href="" :class="opts.css.sortLink"
                           @click.prevent="sort(column)"
                           v-if="(column.sortable || false) && rows.length > 0">
                            {{ column.title || getColumnName(column) }}
                            <i :class="[ sortDirection === 'desc' ? opts.css.sortIconDesc : opts.css.sortIconAsc ]"
                               v-if="isSorted(column)"></i>
                        </a>
                        <template v-else>{{ column.title || getColumnName(column) }}</template>
                    </slot>
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(row, rowIndex) in rows">
                <tr :key="getRowId(row, rowIndex)" :class="getRowClass(row)">
                    <td v-for="(name, index) in column_names" :key="`${row[name]}_${getRowNumber(rowIndex)}_${index}`" :class="getColumnClasses({ name })">
                        <slot :name="name" :row="row" :row_number="getRowNumber(rowIndex)">
                            {{ getDataFromRowWithColumnName(row, name) }}
                        </slot>
                    </td>
                </tr>
                <slot name="row_expander" :row="row" :column_names="column_names"></slot>
            </template>
            <tr v-if="rows.length === 0">
                <slot name="no_result" :columns="columns">
                    <td :class="opts.css.noResult" :colspan="columns.length">
                        <slot name="empty_row">{{ opts.text.noResult }}</slot>
                    </td>
                </slot>
            </tr>
        </tbody>
    </table>
</template>

<script>
  import vueTableMixin from './mixins/vueTableMixin'

  export default {
    name: 'vue-table',
    mixins: [vueTableMixin],
  }
</script>
