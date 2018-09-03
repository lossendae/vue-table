import { uuid }  from '../utils/functions'
import startCase from 'lodash.startcase'

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rowId: {
      type: String,
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
    groupBy: {
      type: String,
    },
    /**
     * Options config
     */
    options: {
      type: Object,
      default: () => {},
    },
    /**
     * Page on which we are on.
     * Used mainly for row numbering
     */
    currentPage: {
      type: Number,
      default: 1,
    },
    /**
     * Amount of items per page
     * Used mainly for row numbering
     */
    itemsPerPage: {
      type: Number,
      default: 15,
    },
  },
  data() {
    return {
      defaultOptions: {
        // Icon classes taken from font-awesome 4.7.5
        // layout classes from bootstrap 4
        css: {
          sortLink: 'd-flex align-items-center sortable-link',
          sortIconAsc: 'fa fa-caret-up ml-2',
          sortIconDesc: 'fa fa-caret-down ml-2',
          noResult: 'text-center pt-4 p-3',
        },
        text: {
          noResult: 'No results found',
        },
      },
      expanded: [],
      selected: [],
      warnings: [],
    }
  },
  computed: {
    opts() {
      return Object.assign({}, this.defaultOptions, this.options)
    },
    /**
     * Extract column names from columns props
     *
     * @returns {*}
     */
    column_names() {
      return this.columns.map(field => typeof field === 'string' ? field : field.name)
    },
    /**
     * Extract column names from columns props
     *
     * @returns {*}
     */
    column_classes() {
      let definitions = {}
      this.columns
        .filter(column_definition => {
          return typeof column_definition === 'object'
            && column_definition.hasOwnProperty('_columnClasses')
            && typeof column_definition._columnClasses === 'string'
        }).forEach(c => {
        definitions[c.name] = c._columnClasses
      })

      return definitions
    },
  },
  methods: {
    uuid,
    /**
     * Extract value to use as :key for v-for loop on each row
     * When not in production we warn the user if it has not been found
     *
     * @param row
     * @param index
     * @returns {*}
     */
    getRowId(row, index) {
      if (this.rowId) {
        if (!row.hasOwnProperty(this.id)) {
          if (process.env.NODE_ENV !== 'production') {
            this.warn(`Row id not found with key "%s".\n`
              + `Available keys are "%s".`,
              [this.id, Object.keys(row).join(',')],
            )
          }
        } else {
          return row[this.id]
        }
      }

      return this.uuid()
    },
    /**
     * Return a nicely formatted column name from given parameter
     *
     * @param column
     * @returns {*}
     */
    getColumnName(column) {
      return column.name
        ? startCase(column.name)
        : startCase(column)
    },
    /**
     * If found in column configuration, the column css class will be applied on the column th/td elements
     *
     * @param column_definition
     * @returns {null}
     */
    getColumnClasses(column_definition) {
      return typeof column_definition === 'object' && this.column_classes.hasOwnProperty(column_definition.name)
        ? this.column_classes[column_definition.name]
        : null
    },
    getRowNumber(index) {
      return this.currentPage > 1
        ? this.currentPage + index
        : (this.currentPage - 1 * this.itemsPerPage) + (index + 1)
    },
    /**
     * Computed CSS classes to use on each row tr's
     * Useful to highlight a row when needed
     *
     * @param row
     * @returns {null}
     */
    getRowClass(row) {
      return row.hasOwnProperty('_rowClasses') && typeof row._rowClasses === 'string'
        ? row._rowClasses
        : null
    },
    /**
     * For each row we check if there is some data to extract
     * If there is no data, we show the column name to indicate with which slot key the row is usable
     *
     * @param row
     * @param name
     * @returns {boolean}
     */
    getDataFromRowWithColumnName(row, name) {
      return row.hasOwnProperty(name)
        ? row[name]
        : `[slot: ${name}]`
    },
    /**
     * Returns the name of the sortable column
     *
     * @param column
     * @returns {boolean|string}
     */
    getSortKey(column) {
      return typeof column.sortable === 'string' ? column.sortable : column.name
    },
    /**
     * Tells whether a column is sorted or not
     * This is just UI wise, nothing prevent the user to sort its column on server side only
     *
     * @param column
     * @returns {boolean}
     */
    isSorted(column) {
      // If a column is marked as sortable, sortBy props should be defined
      // If not the user should be warned as it might have forgotten to set the prop
      if (typeof this.sortBy === 'undefined') {
        this.warn(`"sortBy" prop was not defined, but column "%s" is marked as sortable`, [column.name])
      }

      return this.getSortKey(column) === this.sortBy
    },
    /**
     * Emit an event to the parent component with the sorted key and sorted direction
     * This component is not responsible for the actual sorting whether client side or server side
     *
     * @param column
     */
    sort(column) {
      this.$emit('column:sort', {
        sortBy: this.getSortKey(column),
        sortDirection: this.sortDirection === 'asc' ? 'desc' : 'asc',
      })
    },
    /**
     * Warn user about a misconfiguration
     * Data is used in order to warn only once when the warning sent from a loop
     *
     * @param message
     */
    warn(message, args = []) {
      if (!this.warnings.includes(message)) {
        console.warn(message, ...args)
        this.warnings.push(message)
      }
    },
  },
}
