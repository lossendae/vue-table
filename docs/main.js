import Vue   from 'vue'
import store from './store'
import 'prismjs'
import 'prismjs/components/prism-bash.min'
import 'prismjs/components/prism-json.min'
import 'prismjs/plugins/autolinker/prism-autolinker.min'
import 'prismjs/plugins/line-highlight/prism-line-highlight.min'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.min'

import Prism from 'vue-prism-component'

Vue.component('prism', Prism)

import Vuebar from 'vuebar'

Vue.use(Vuebar)

import cmps from './common/bootstrap'

Vue.use(cmps)

import VueTable from '@/VueTable'

Vue.component('vue-table', VueTable)

import VueTablePagination from '@/VueTablePagination'

Vue.component('vue-table-pagination', VueTablePagination)

import FetchJson from './common/FetchJson'

Vue.component('fetch-json', FetchJson)

Vue.config.productionTip = false

import App from '@docs/App.vue'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
