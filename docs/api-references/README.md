---
pageClass: content-960
sidebar: auto
---

# API references

::: tip
Both components scripts are in mixins. The API references refer to those mixins
:::

## VueTable

```js
import { VueTableMixin } from '@lossendae/vue-table'
```

### Props

| Name              | Type     | Required | Default | Description                                                            |
| ------------------|----------|:--------:|:-------:| -----------------------------------------------------------------------|
| **columns**       | Array    | `true`   | -       | Array of column configuration                                          |
| **rows**          | Array    | `true`   | -       | Array of rows to show in table                                         |
| **sortBy**        | String   | `false`  | -       | Name of the column currently sorted                                    |
| **sortDirection** | String   | `false`  | `asc`   | Direction in which the column is sorted. Can be either `asc` or `desc` |

#### Columns options

```js
{
    name: 'column-name', // Can also be a free value, which will be available as a slot in the table 
    title: 'Nice title for the column', // Optional
    sortable: false, // Optional - false by default
}
```

> The `name` key is used for data mapping with the `rows` props.

### Events

| Name          | Description                                                          |
| --------------|----------------------------------------------------------------------|
| column:sort   | Emits an object with the following keys: `{ sortBy, sortDirection }` |

## VueTablePagination

```js
import { VueTablePaginationMixin } from '@lossendae/vue-table'
```

### Props

| Name                          | Type     | Required  | Default | Description                                                                                     |
| ------------------------------|----------|:---------:|:-------:| ------------------------------------------------------------------------------------------------|
| **showRefreshButton**         | Boolean  | `false`   | `true`  | If true, will show a button which emits the `pagination:change` event on click                  |
| **useFirstLastLinks**         | Boolean  | `false`   | `true`  | Whether the pagination should show the first and last links                                     |
| **useBoundariesNumbersLinks** | Boolean  | `false`   | `false` | Whether the pagination should show the boundaries links which can be either numbers or ellipses |
| **useNextPrevLinks**          | Boolean  | `false`   | `false` | Whether the pagination should show the next and previous page links                             |
| **firstText**                 | String   | `false`   | `«`     | Text of the first page link                                                                     |
| **lastText**                  | String   | `false`   | `»`     | Text of the last page link                                                                      |
| **nextText**                  | String   | `false`   | `<`     | Text of the next page link                                                                      |
| **previousText**              | String   | `false`   | `>`     | Text of the previous page link                                                                  |
| **useEllipses**               | Boolean  | `false`   | `true`  | Whether the table should use ellipses                                                           |
| **rotate**                    | Boolan   | `false`   | `true`  | Whether the page should be kept in the middle when possible                                     |
| **maxPageItems**              | Number   | `false`   | `5`     | When using ellipses, this is the maximum number of page items that will be shown                |
| **itemsPerPage**              | Number   | `false`   | `15`    | Amount of items per page                                                                        |
| **totalItems**                | Number   | `true`    | -       | Total amount of items                                                                           |
| **currentPage**               | Number   | `true`    | -       | Current page number                                                                             |

### Events

| Name               | Description                       |
| -------------------|-----------------------------------|
| pagination:change  | Emits the new page number to load |
