<template>
    <table class="table table-hover">
        <thead>
            <tr>
                <th v-for="(column, index) in columns" :key="`${column}_${index}`">
                    <slot :name="`header__${column.name}`" :column="column">
                        <a href="" class="d-flex align-items-center sortable-link"
                           @click.prevent="sort(column)"
                           v-if="(column.sortable || false) && rows.length > 0">
                            {{ column.title || column.name }}
                            <i class="fa ml-2"
                               :class="{'fa-caret-up': sortDirection === 'asc', 'fa-caret-down': sortDirection === 'desc'}"
                               v-if="isSorted(column)"></i>
                        </a>
                        <template v-else>{{ column.title || column.name }}</template>
                    </slot>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <td v-for="(name, index) in column_names" :key="`${row[name]}_${index}`">
                    <template v-if="fieldExistsInRow(row, name)">
                        <slot :name="name" :row="row">{{ row[name] }}</slot>
                    </template>
                    <template v-else>
                        <slot :name="name" :row="row">[slot: {{ name }}]</slot>
                    </template>
                </td>
            </tr>
            <tr v-if="rows.length === 0">
                <slot name="no_result" :columns="columns">
                    <td class="text-center pt-4 p-3" :colspan="columns.length">
                        <slot name="empty">No results found</slot>
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
