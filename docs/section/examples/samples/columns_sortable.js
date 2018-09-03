export default {
  html: `<vue-table
  :columns="columns"
  :rows="sorted_rows"
  :sort-by="sort.by"
  :sort-direction="sort.direction"
  @column:sort="onSort"
></vue-table>`,
  js: `export default {
  data() {
    return {
      columns: [{
        name: 'name',
        sortable: true,
      }, {
        name: 'nickname',
        title: 'Pseudonym',
        sortable: true,
      }, {
        name: 'formatted_age',
        title: 'Age',
        // In this case, we want to sort by the non displayed age value
        sortable: 'age',
      }],
      items: [{
        name: 'Robert Duvak',
        nickname: 'jose26',
        age: 46,
        formatted_age: 'He\\'s 46 years old',
      }, {
        name: 'Isabelle Champion',
        nickname: 'isa',
        age: 22,
        formatted_age: 'She\\'s 22 years old',
      }, {
        name: 'Alberto Tulador',
        nickname: 'beber',
        age: 33,
        formatted_age: 'He\\'s 33 years old',
      }],
      // This is useful to set those values on initialization as it allows the table to show which field is sorted 
      // and in which direction by default when the table is rendered
      sort: {
        by: "name",
        direction: "asc",
      },
    },
    computed: {
      // Sort data via a computed property
      // This is directly used by the table as the result set for the rows 
      sorted_rows() {
        return this.items.sort((a, b) => {
          if (this.sort.direction === "asc") {
            if (a[this.sort.by] < b[this.sort.by]) return -1
            if (a[this.sort.by] > b[this.sort.by]) return 1
            return 0
          }
        
          if (b[this.sort.by] < a[this.sort.by]) return -1
          if (b[this.sort.by] > a[this.sort.by]) return 1
          return 0
        })
      },
    },
    methods: {
      // Callback method for the sorting event when emitted by tht table
      // the local sort property is updated accordingly 
      onSort({ sortBy, sortDirection }) {
        this.sort.by = sortBy
        this.sort.direction = sortDirection
      },
    },
  },
}`,
}
