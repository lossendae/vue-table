import { shallowMount }   from '@vue/test-utils'
import './utils/console/'
import VueTablePagination from '@/VueTablePagination.vue'

describe('VueTablePagination.vue', () => {
  describe('initialize', () => {
    it('should work with minimum required configuration options', () => {
      const props = {
        totalItems: 0,
        currentPage: 1,
      }
      const wrapper = shallowMount(VueTablePagination, {
        propsData: props,
      })
      expect(wrapper.text()).toMatch('No results')
    })
  })
  describe('computed property', () => {
    it('"is_last_page" gives the correct information', () => {
      const props = {
        totalItems: 50,
        currentPage: 1,
      }
      const wrapper = shallowMount(VueTablePagination, {
        propsData: props,
      })

      expect(wrapper.vm.is_last_page).toEqual(false)

      wrapper.setProps({ currentPage: 2 })
      expect(wrapper.vm.is_last_page).toEqual(false)

      wrapper.setProps({ currentPage: 4 })
      expect(wrapper.vm.is_last_page).toEqual(true)
    })
    it('"is_first_page" gives the correct information', () => {
      const props = {
        totalItems: 50,
        currentPage: 1,
      }
      const wrapper = shallowMount(VueTablePagination, {
        propsData: props,
      })

      expect(wrapper.vm.is_first_page).toEqual(true)

      wrapper.setProps({ currentPage: 2 })
      expect(wrapper.vm.is_first_page).toEqual(false)

      wrapper.setProps({ currentPage: 4 })
      expect(wrapper.vm.is_first_page).toEqual(false)
    })
    it('"from" gives the correct information', () => {
      const props = {
        totalItems: 50,
        currentPage: 1,
      }
      const wrapper = shallowMount(VueTablePagination, {
        propsData: props,
      })

      expect(wrapper.vm.from).toEqual(1)

      wrapper.setProps({ currentPage: 2 })
      expect(wrapper.vm.from).toEqual(16)

      wrapper.setProps({ currentPage: 4 })
      expect(wrapper.vm.from).toEqual(46)
    })
    it('"to" gives the correct information', () => {
      const props = {
        totalItems: 50,
        currentPage: 1,
      }
      const wrapper = shallowMount(VueTablePagination, {
        propsData: props,
      })

      expect(wrapper.vm.to).toEqual(15)

      wrapper.setProps({ currentPage: 2 })
      expect(wrapper.vm.to).toEqual(30)

      wrapper.setProps({ currentPage: 4 })
      expect(wrapper.vm.to).toEqual(50)
    })
    it('"pages" gives the correct array of pages', () => {
      const props = {
        totalItems: 5,
        itemsPerPage: 2,
        currentPage: 1,
      }
      const wrapper = shallowMount(VueTablePagination, {
        propsData: props,
      })

      expect(wrapper.vm.pages).toEqual([
        { "active": true, "label": 1, "number": 1 },
        { "active": false, "label": 2, "number": 2 },
        { "active": false, "label": 3, "number": 3 },
      ])
    })
  })
  describe('an event', () => {
    it('should be emitted on page change', () => {
      const props = {
        totalItems: 50,
        currentPage: 1,
      }
      const wrapper = shallowMount(VueTablePagination, {
        propsData: props,
      })
      wrapper.vm.selectPage(2)
      expect(wrapper.emitted()['pagination:change']).toEqual([[2]])
    })
  })

})
