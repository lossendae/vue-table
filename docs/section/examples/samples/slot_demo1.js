export default {
  html: `<vue-table :columns="columns" :rows="items">
    <template slot-scope="{ row }" slot="identity">
        <div class="d-flex align-items-center">
            <div class="d-flex flex-column">
                <a href=""><strong>{{ row.firstname }} {{ row.lastname }}</strong></a>
                <small>{{ row.username }}</small>
            </div>
        </div>
    </template>

    <template slot-scope="{ row }" slot="contact">
        <div class="d-flex flex-column">
            <div>
                <i class="fa fa-fw fa-envelope mr-2"></i>
                <span>{{ row.email }}</span>
            </div>
            <div>
                <i class="fa fa-fw fa-phone mr-2"></i>
                <span>{{ row.phone }}</span>
            </div>
        </div>
    </template>

    <template slot-scope="{ row }" slot="birth_date">
        {{ formatDate(row.birth_date) }}
    </template>

    <template slot-scope="{ row }" slot="gender">
        <span class="badge badge-primary" v-if="row.gender === 'male'"><i class="fa fa-male mr-2"></i>Male</span>
        <span class="badge badge-pink" v-if="row.gender !== 'male'"><i class="fa fa-female mr-2"></i>Female</span>
    </template>

    <template slot-scope="{ row }" slot="revenue">
        {{ formatRevenue(row.revenue) }}
    </template>

    <template slot-scope="{ row }" slot="is_active">
        <div class="d-flex align-items-center">
            <i class="fa fa-circle mr-2" :class="[row.is_active ? 'text-success' : 'text-danger']"></i>
            <small class="text-uppercase">{{ row.is_active ? 'Active' : 'Inactive' }}</small>
        </div>
    </template>

    <template slot-scope="{ row }" slot="actions">
        <div class="d-flex align-items-center">
            <a href="" title="Edit profile" class="btn btn-sm btn-outline-secondary mr-1" @click.prevent="onButtonClick('Edit profile')">
                <i class="fa fa-user text-primary"></i>
            </a>
            <a href="" title="Edit permissions" class="btn btn-sm btn-outline-secondary" @click.prevent="onButtonClick('Edit permissions')">
                <i class="fa fa-unlock-alt"></i>
            </a>
        </div>
    </template>
</vue-table>`,
  js: `import accounting from 'accounting'

export default {
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
  /**
   * Custom row formatter
   */
  formatRevenue(value) {
    return accounting.formatMoney(value, {
      symbol: "€",
      format: "%v %s",
      decimal: ",",
      thousand: " ",
      precision: 2,
    })
  },
  /**
   * Custom row formatter
   */
  formatDate(value) {
    return (value == null)
      ? ''
      : new Date(value).toLocaleDateString("fr-FR")
  },
  /**
   * Action button row
   */
  onButtonClick(type) {
    alert(\`Button $\{type\} was clicked\`)
  },
}`,
}
