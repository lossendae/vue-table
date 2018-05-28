export default {
    props: {
        fields: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        sortBy: {
            type: String,
        },
        sortDirection: {
            type: String,
            default() {
                return 'asc'
            },
            validator(value) {
                // The value must match one of these strings
                return ['asc', 'desc'].includes(value)
            },
        },
    },
    data() {
        return {
            field_names: [],
        }
    },
    methods: {
        fieldExistsInRow(row, name) {
            return row.hasOwnProperty(name)
        },
        getSortKey(column) {
            return typeof column.sortable === 'string' ? column.sortable : column.name
        },
        isSorted(column) {
            // If a column is marked as sortable, sortBy props should be defined
            // If not the user should be warned as it might have forgotten to set the prop
            if (typeof this.sortBy === 'undefined') {
                console.warn(`"sortBy" prop was not defined, but column "%s" is marked as sortable`, column.name)
            }

            return this.getSortKey(column) === this.sortBy
        },
        sort(column) {
            // emit event to parent to change the sort parameters
            this.$emit('column:sort', {
                sortBy: this.getSortKey(column),
                sortDirection: this.sortDirection === 'asc' ? 'desc' : 'asc',
            })
        },
    },
    mounted() {
        // map column names
        this.field_names = this.fields.map(f => f.name)
    },
}
