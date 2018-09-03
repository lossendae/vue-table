export default {
  html: `<vue-table :columns="columns" :rows="items"></vue-table>`,
  js: `export default {
  data() {
    return {
      columns: ['identity', 'contact', 'birth_date', 'gender', 'revenue', 'is_active', 'actions'],
      items: [
        {
          "firstname": "Brigitte",
          "lastname": "Bardont",
          "username": "bribar",
          "email": "bb@example.com",
          "phone": "0143520987",
          "birth_date": "1991-08-06",
          "gender": "female",
          "revenue": 15054.08,
          "is_active": true,
        },
        {
          "firstname": "Gerald",
          "lastname": "Kleberth",
          "username": "gege208",
          "email": "gege208@example.com",
          "phone": "0109875432",
          "birth_date": "2001-01-03",
          "gender": "male",
          "revenue": 302.98,
          "is_active": false,
        },
        {
          "firstname": "Amandine",
          "lastname": "Delalune",
          "username": "cutey",
          "email": "amandine@example.com",
          "phone": "0198653698",
          "birth_date": "1980-12-04",
          "gender": "female",
          "revenue": 1418.0,
          "is_active": true,
        },
      ],
    }
  },
}`,
}
