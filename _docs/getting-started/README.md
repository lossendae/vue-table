---
pageClass: content-960
---

# Getting started

## Installation

via npm

```bash
npm install --save @lossendae/vue-table
```

## Basic usage

```js
import Vue from 'vue'
import VueTable from '@lossendae/vue-table'

// install globally...
Vue.use('vue-table', Vuetable)

// Or in your Vue component
export default {
    components: { Vuetable },
    ...
}
```

Then use it in your component like the following:

```vue 
<template>
    <vue-table :columns="columns" :rows="rows"></vue-table>
</template>

<script>
  export default {
    data() {
      return {
        // columns definition only requires a name to be displayed
        columns: [
          {
            name: "name"
          },{
            name: "nickname"
          },{
            name: "company"
          }
        ],
        // result set
        rows: [
          {
            name: "Robert Duvak",
            nickname: "jose26",
            company: "Apple Inc."
          },{
            name: "Isabelle Champion",
            nickname: "isa",
            company: "EDF"
          },{
            name: "Alberto Tulador",
            nickname: "beber",
            company: "Matla"
          }
        ]
      }
    }
  }
</script>
```

This will result in : 

<iframe src="https://codesandbox.io/embed/q76x8x3046" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

The components uses Bootstrap4 classes per default, but the logic is externalized in mixins.

Therefore you can easily build your own table template and only use the mixins without having to deal with css config options.

