import Tabs from './components/tabs/Tabs'
import TabItem from './components/tabs/TabItem'

export default {
    install(Vue) {
        Vue.component('tabs', Tabs)
        Vue.component('tab-item', TabItem)
    }
}
