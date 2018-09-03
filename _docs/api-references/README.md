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
| **showRefreshButton**         | Boolean  | `false`   | `true`  |                   
| **useFirstLastLinks**         | Boolean  | `false`   | `true`  |                                      
| **useBoundariesNumbersLinks** | Boolean  | `false`   | `false` |  
| **useNextPrevLinks**          | Boolean  | `false`   | `false` |                              
| **firstText**                 | String   | `false`   | `«`     |                                                                      
| **lastText**                  | String   | `false`   | `»`     |                                                                       
| **nextText**                  | String   | `false`   | `<`     |                                                                       
| **previousText**              | String   | `false`   | `>`     |                                                                   
| **useEllipses**               | Boolean  | `false`   | `true`  |                                                            
| **rotate**                    | Boolan   | `false`   | `true`  |                                      
| **maxPageItems**              | Number   | `false`   | `5`     |                 
| **itemsPerPage**              | Number   | `false`   | `15`    |                                                                         
| **totalItems**                | Number   | `true`    | -       |                                                                            
| **currentPage**               | Number   | `true`    | -       |                                                                              

### Events

| Name               | Description                       |
| -------------------|-----------------------------------|
| pagination:change  | Emits the new page number to load |
