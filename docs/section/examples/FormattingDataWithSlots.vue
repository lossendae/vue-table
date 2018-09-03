<template>
    <div>
        <h3 id="formatting-data-with-slots" data-section-title="Examples">
            Formatting data with slots
        </h3>

        <blockquote class="blockquote">
            <p class="mb-0">
                As opposed to other feature rich table components, vue-table does not provide a function formatter callback.
                <br>
                This is by design. If you need such a solution, please use one of those components. <br>
                Although nothing prevents you to use the scope slots to achieve the same result.
            </p>
        </blockquote>

        <p>
            Now that we know how to display data and eventually sort them, we may want to customize our rows.
            <br>
            In order to do that, vue-table uses scoped slots mapped to each column keys.
        </p>

        <p>
            Let's take the following example:
        </p>

        <div class="example">
            <div class="result">
                <vue-table :columns="Object.keys(items[0])" :rows="items"></vue-table>
            </div>

            <tabs v-model="active_tab0" class="p-0 m-0">
                <tab-item class="col p-0" title="Template">
                    <prism language="html" data-language="html">{{ sample0.html }}</prism>
                </tab-item>

                <tab-item class="col p-0" title="Code">
                    <prism language="js" data-language="js">{{ sample0.js }}</prism>
                </tab-item>
            </tabs>
        </div>

        <p>For this table, we want to:</p>

        <ul>
            <li>Regroup <code>firstname</code>,<code>lastname</code> and <code>username</code> in the same cell using a key named <code>identity</code></li>
            <li>Regroup <code>email</code> and <code>phone</code> in the same cell using a key named <code>contact</code></li>
            <li>Format all the remaining columns</li>
            <li>Add a column for action buttons</li>
        </ul>

        <div class="example">
            <div class="result">
                <vue-table :columns="columns" :rows="items"></vue-table>
            </div>

            <tabs v-model="active_tab1" class="p-0 m-0">
                <tab-item class="col p-0" title="Template">
                    <prism language="html" data-language="html">{{ sample1.html }}</prism>
                </tab-item>

                <tab-item class="col p-0" title="Code">
                    <prism language="js" data-language="js">{{ sample1.js }}</prism>
                </tab-item>
            </tabs>
        </div>

        <p>
            As you can see, columns keys with no mapped data shows the placeholder with the [slot: <code>key</code>] available to format your cells.
        </p>

        <p>
            Let's use those keys with their scope slots:
        </p>

        <div class="example">
            <div class="result">
                <vue-table :columns="columns" :rows="items">
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
                                <i class="fa fa-fw pr-0 pl-0 fa-user text-primary"></i>
                            </a>
                            <a href="" title="Edit permissions" class="btn btn-sm btn-outline-secondary" @click.prevent="onButtonClick('Edit permissions')">
                                <i class="fa fa-fw pr-0 pl-0 fa-unlock-alt"></i>
                            </a>
                        </div>
                    </template>
                </vue-table>
            </div>

            <tabs v-model="active_tab2" class="p-0 m-0">
                <tab-item class="col p-0" title="Template">
                    <prism language="html" data-language="html">{{ sample2.html }}</prism>
                </tab-item>

                <tab-item class="col p-0" title="Code">
                    <prism language="js" data-language="js">{{ sample2.js }}</prism>
                </tab-item>
            </tabs>
        </div>
    </div>
</template>

<script>
  import chapterMixin from '@docs/common/mixins/chapterMixin'
  import sample0 from './samples/slot_basic.js'
  import sample1 from './samples/slot_demo0.js'
  import sample2 from './samples/slot_demo1.js'
  import accounting from 'accounting'

  export default {
    name: 'FormattingDataWithSlots',
    mixins: [chapterMixin],
    data() {
      return {
        sample0,
        sample1,
        sample2,
        active_tab0: 0,
        active_tab1: 0,
        active_tab2: 0,
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
       * Action button row
       */
      onButtonClick(type) {
        alert(`Button ${type} was clicked`)
      },
    },
  }
</script>
