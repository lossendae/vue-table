---
pageClass: content-960
---

# Case study

::: tip
In the the following example, I'm using a data provider component to simulate call to the server.
This is inspired by the excellent [VueJS course](https://adamwathan.me/advanced-vue-component-design/) made by Adam Wathan
:::

In this tutorial we'll review a few of the options available in order to build a dynamic table.

Let's say that we have a user list fetched from a server side script and we build a UI for it.

The json structure is fairly simple :

```json
[
  {
    "firstname": "Brigitte",
    "lastname": "Bardont",
    "username": "bribar",
    "email": "bb@example.com",
    "phone": "0143520987",
    "birth_date": "08-06-1991",
    "gender": "female",
    "revenue": 15054.08
  },
  ...
]
```

For now we'll not add sortable columns nor pagination.

See below in the sandbox the rendered table :

<iframe src="https://codesandbox.io/embed/5zp1o44qox" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

As you can see there are quite a lot of fields and data are shown raw without formatting.

VueTable uses slots to customise your table data with VueJS scoped slots. 

If we want to format the fields `{ firsname, lastname, username }` in one column, change the column declaration to the name of the desired scope slot :

```js
[
        {
          name: "identity"
        },
        {
          name: "email"
        },
        {
          name: "phone"
        },
        {
          name: "birth_date"
        },
        {
          name: "gender"
        },
        {
          name: "revenue"
        }
      ]
```

and then use the name (here `identity`) in your template 

```html
<vue-table class="table-bordered"
           :columns="columns"
           :rows="users || []"
>
    <template slot-scope="{ row }" slot="identity">
        <div class="d-flex align-items-center">
            <div class="d-flex flex-column">
                <a href=""><strong>{{ row.firstname }} {{ row.lastname }}</strong></a>
                <small>{{ row.username }}</small>
            </div>
        </div>
    </template>
</vue-table>
```

Each column names provided in column definition can be overridden in the parent component with a slot. 
It means that `{ email, phone, birth_date, gender, revenue }` and any other columns can be used as a scope slot for custom formatting.

If we add an additional column `action` to the column, it will be available as a slot too.

The following sandbox example combines scoped slots, pagination, custom components and custom filters to show how the table can be more dynamic :

<iframe src="https://codesandbox.io/embed/pk4nvqr0kq" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


  
