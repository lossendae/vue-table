import VueTable from './VueTable'
import vueTableMixin from './mixins/vueTableMixin'
import VueTablePagination from './VueTablePagination'
import vueTablePaginationMixin from './mixins/vueTablePaginationMixin'

export default {
    install(Vue) {
        Vue.component('vue-table', VueTable)
        Vue.component('vue-table-pagination', VueTablePagination)
    }
}

export { VueTable, vueTableMixin, VueTablePagination, vueTablePaginationMixin }
