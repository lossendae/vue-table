export default {
  html: `<vue-table :columns="columns" :rows="items"></vue-table>`,
  js: `export default {
  data() {
    return {
      columns: ['name', 'nickname', 'company_name'],
      items: [
        {
          name: "Robert Duvak",
          nickname: "jose26",
          company_name: "Apple Inc.",
        },
        {
          name: "Isabelle Champion",
          nickname: "isa",
          company_name: "EDF",
        },
        {
          name: "Alberto Tulador",
          nickname: "beber",
          company_name: "Matla",
        },
      ],
    }
  },
}`,
}
