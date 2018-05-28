import { shallowMount } from '@vue/test-utils'
import './utils/console/'
import VueTable from '@/VueTable.vue'

describe('VueTable.vue', () => {
    describe('initalize', () => {
        it('should work with no columns and no rows', () => {
            const props = {
                fields: [],
                rows: [],
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })
            expect(wrapper.text()).toMatch('No results found')
        })
    })

    describe('column definition', () => {
        it('should map field names correctly', () => {
            const props = {
                fields: [{
                    name: 'column_1',
                }, {
                    name: 'column_2',
                    title: 'Second column',
                }],
                rows: [],
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })

            expect(wrapper.vm.$data.field_names).toEqual(['column_1', 'column_2'])
        })

        it('should set the currently sorted column correctly', () => {
            const props = {
                fields: [{
                    name: 'column_1',
                    sortable: true,
                }, {
                    name: 'column_2',
                    sortable: 'with_another_key',
                }, {
                    name: 'column_3',
                }],
                rows: [{
                    column_1: 'value',
                    column_2: 'value',
                    column_3: 'value',
                }],
                sortBy: 'column_1',
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })

            expect(wrapper.vm.isSorted(props.fields[0])).toEqual(true)
            expect(wrapper.vm.isSorted(props.fields[1])).toEqual(false)
            expect(wrapper.vm.isSorted(props.fields[2])).toEqual(false)
        })

        it('should get column sort key correctly', () => {
            const props = {
                fields: [{
                    name: 'column_1',
                    sortable: true,
                }, {
                    name: 'column_2',
                    sortable: 'with_another_key',
                }],
                rows: [{
                    column_1: 'value',
                    column_2: 'value',
                }],
                sortBy: 'column_1',
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })

            expect(wrapper.vm.getSortKey(props.fields[0])).toEqual('column_1')
            expect(wrapper.vm.getSortKey(props.fields[1])).toEqual('with_another_key')
        })

        it('should warn when sortBy props is missing when at least one column is sortable', () => {
            const props = {
                fields: [{
                    name: 'column_1',
                    sortable: true,
                }],
                rows: [{
                    column_1: 'value',
                }],
            }

            shallowMount(VueTable, {
                propsData: props,
            })

            expect(console).toHaveWarnedWith(
                '"sortBy" prop was not defined, but column "%s" is marked as sortable',
                'column_1',
            )
        })

        it('should log an error when sortDirection props validator fails', () => {
            const props = {
                fields: [{
                    name: 'column_1',
                    sortable: true,
                }],
                rows: [{
                    column_1: 'value',
                }],
                sortBy: 'column_1',
                sortDirection: 'wrong',
            }

            shallowMount(VueTable, {
                propsData: props,
            })

            expect(console).toHaveErrored(
                '[Vue warn]: Invalid prop: custom validator check failed for prop "sortDirection"',
            )
        })
    })

    describe('an event', () => {
        it('should be emitted when a column is sorted', () => {
            const props = {
                fields: [{
                    name: 'column_1',
                    sortable: true,
                }, {
                    name: 'column_2',
                    sortable: 'with_another_key',
                }],
                rows: [{
                    column_1: 'value',
                    column_2: 'value',
                }],
                sortBy: 'column_1',
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })
            wrapper.vm.sort(props.fields[0])
            expect(wrapper.emitted()['column:sort']).toEqual([[{
                sortBy: 'column_1',
                sortDirection: 'desc',
            }]])
        })

        it('should be emitted when a column is sorted with a custom sort key', () => {
            const props = {
                fields: [{
                    name: 'column_1',
                    sortable: true,
                }, {
                    name: 'column_2',
                    sortable: 'with_another_key',
                }],
                rows: [{
                    column_1: 'value',
                    column_2: 'value',
                }],
                sortBy: 'column_1',
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })
            wrapper.vm.sort(props.fields[1])
            expect(wrapper.emitted()['column:sort']).toEqual([[{
                sortBy: 'with_another_key',
                sortDirection: 'desc',
            }]])
        })
    })

    describe('row slot', () => {
        it('should return true when the column name exists in the row', () => {
            const props = {
                fields: [{
                    name: 'column_1'
                }, {
                    name: 'action',
                }],
                rows: [{
                    column_1: 'value',
                }],
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })

            expect(wrapper.vm.fieldExistsInRow(props.rows[0], 'column_1')).toEqual(true)
        })
        it('should return false when the column name does not exists in the row', () => {
            const props = {
                fields: [{
                    name: 'column_1'
                }, {
                    name: 'action',
                }],
                rows: [{
                    column_1: 'value',
                }],
            }
            const wrapper = shallowMount(VueTable, {
                propsData: props,
            })

            expect(wrapper.vm.fieldExistsInRow(props.rows[0], 'action')).toEqual(false)
        })
    })
})
