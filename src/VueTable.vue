<template>
    <table class="vue-table">
        <thead>
            <tr>
                <th v-for="(column, index) in fields" :key="`${column}_${index}`">
                    <slot :name="`header__${column.name}`" :column="column">
                        <a href=""
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
                <td v-for="(name, index) in field_names" :key="`${row[name]}_${index}`">
                    <template v-if="fieldExistsInRow(row, name)">
                        <slot :name="name" :row="row">{{ row[name] }}</slot>
                    </template>
                    <template v-else>
                        <slot :name="name" :row="row">[slot: {{ name }}]</slot>
                    </template>
                </td>
            </tr>
            <tr v-if="rows.length === 0">
                <slot name="no_result" :fields="fields">
                    <td :colspan="fields.length">
                        No results found
                    </td>
                </slot>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import VueTableMixin from './mixins/VueTableMixin'

    export default {
        name: 'vue-table',
        mixins: [VueTableMixin],
    }
</script>
