---
pageClass: content-960
---

# Examples

## Simple table

<iframe src="https://codesandbox.io/embed/q76x8x3046" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Simple table with sortable columns

> The default table assume that you're using bootstrap 4 with Fontawesome 4.7
> There are other examples using other CSS framework and icon sets

```js 
<template>
  <div id="app" class="p-3">
    <vue-table class="table-bordered" 
      :columns="columns" 
      :rows="sorted_rows"
      :sort-by="sort.by"
      :sort-direction="sort.direction"
      @column:sort="onSort"
    ></vue-table>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // set sortable as true, the column will be rendered as a clickable link with an icon if you're using FA 
      columns: [
        {
          name: "name",
          title: "Identity",
          sortable: true
        },
        {
          name: "note",
          title: "Judgement",
          sortable: true
        }
      ],
      // result set
      rows: [
        {
          name: "Robert Duvak",
          note: 10
        },
        {
          name: "Isabelle Champion",
          note: 2
        },
        {
          name: "Jürgen Karsolinger",
          note: 5
        },
        {
          name: "Alberto Tulador",
          note: 13
        }
      ],
      // passed as props to the component
      sort: {
        by: "name",
        direction: "asc"
      }
    };
  },
  computed: {
    // This could also be done server side
    sorted_rows() {
      const me = this;
      return this.rows.sort((a, b) => {
        if (me.sort.direction === "asc") {
          if (a[me.sort.by] < b[me.sort.by]) return -1;
          if (a[me.sort.by] > b[me.sort.by]) return 1;
          return 0;
        }

        if (b[me.sort.by] < a[me.sort.by]) return -1;
        if (b[me.sort.by] > a[me.sort.by]) return 1;
        return 0;
      });
    }
  },
  methods: {
    onSort({ sortBy, sortDirection }) {
      this.sort.by = sortBy;
      this.sort.direction = sortDirection;
    }
  }
};
</script>

<style>
a.sortable-link {
  text-decoration: none !important;
}
</style>
```

<iframe src="https://codesandbox.io/embed/kmvj16o09o" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
