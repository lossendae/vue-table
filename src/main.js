import VueTable from './VueTable'
import VueTableMixin from './mixins/VueTableMixin'
import VueTablePagination from './VueTablePagination'
import VueTablePaginationMixin from './mixins/VueTablePaginationMixin'

export default {
    install(Vue) {
        Vue.component('vue-table', VueTable)
        Vue.component('vue-table-pagination', VueTablePagination)
    }
}

export { VueTable, VueTableMixin, VueTablePagination, VueTablePaginationMixin }
