<template>
    <div>
        <h3 id="ColumnClass" data-section-title="Examples">
            Customize column CSS class
        </h3>

        <div class="example">
            <div class="result">
                <fetch-json url="/users.json" :params="params">
                    <div slot-scope="{ rows: users, meta }">
                        <vue-table
                                :columns="columns"
                                :rows="users || []"
                                :sort-by="params.sort_by"
                                :sort-direction="params.sort_direction"
                                @column:sort="onSort"
                        >
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

                            <template slot-scope="{ row }" slot="revenue">
                                {{ formatRevenue(row.revenue) }}
                            </template>

                            <template slot-scope="{ row }" slot="is_active">
                                <div class="d-flex align-items-center">
                                    <i class="fa fa-circle mr-2" :class="[row.is_active ? 'text-success' : 'text-danger']"></i>
                                    <small class="text-uppercase">{{ row.is_active ? 'Active' : 'Inactive' }}</small>
                                </div>
                            </template>
                        </vue-table>

                        <vue-table-pagination
                                :items-per-page="params.limit"
                                :total-items="meta ? meta.total_items : 0"
                                :current-page="params.page"
                                :show-refresh-button="false"
                                @pagination:change="onPaginationChange"
                        />
                    </div>
                </fetch-json>
            </div>
        </div>
    </div>
</template>

<script>
  import chapterMixin from '@docs/common/mixins/chapterMixin'
  import accounting from 'accounting'

  export default {
    name: 'CustomizeColumnClasses',
    mixins: [chapterMixin],
    data() {
      return {
        columns: [{
          name: "identity",
        }, {
          name: "contact",
          _columnClasses: 'bg-warning',
        }, {
          name: "birth_date",
          title: "Birth date",
        }, {
          name: "revenue",
        }, {
          name: "is_active",
          title: "Is active",
        }],
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
        filters: {
          q: null,
          gender: 'all',
          is_active: 'all',
        },
        total_items: 0,
        params: {
          limit: 3,
          sort_by: 'identity',
          sort_direction: 'asc',
          page: 1,
        },
      }
    },
    methods: {
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
       * VueTable component event
       */
      onSort({ sortBy, sortDirection }) {
        this.params.sort_by = sortBy
        this.params.sort_direction = sortDirection
      },
      /**
       * VueTablePagination component event
       */
      onPaginationChange(page) {
        this.params.page = page
      },
    },
  }
</script>
