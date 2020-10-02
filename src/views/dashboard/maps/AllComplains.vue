<template>
  <v-container>
    <base-material-card color="#1D3557">
      <template v-slot:heading>
        <template>
        <v-row>
          <span class="display-3 font-weight-light">Ver por rango de fechas </span>
          <v-spacer></v-spacer>
          <v-dialog ref="dialog" v-model="modal" :return-value.sync="dates" persistent width="300px">
            <template v-slot:activator="{ on, attrs }">
            <v-btn v-model="dates" v-bind="attrs" class="mr-15" text v-on="on"><v-icon size="25" color="#FDFCDC">mdi-calendar</v-icon></v-btn>
            </template>
            <v-date-picker v-model="dates" range scrollable header-color="#1D3557" color="#1D3557">
              <v-spacer></v-spacer>
              <v-btn text color="#1D3557" @click="modal = false">Cancel</v-btn>
              <v-btn text color="#1D3557" @click="$refs.dialog.save(dates), getComplainsByRange()">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-row>
      </template>
      </template>
      <div class="display-3 font-weight-light" v-if="rangeComplains.length == 0">
      <v-card-text >
      </v-card-text>
      </div>
      <v-card-text v-else>
        <v-data-table
          :items-per-page="5"
          :headers="headers2"
          :items="rangeComplains"
        />
      </v-card-text>
    </base-material-card>
    <v-row>
      <v-col >
        <base-material-card color="#E26D5C" >
        <template v-slot:heading>
          <div class="display-3 font-weight-light">
          Mostrando quejas por mes y año
          </div>
        </template>
        <v-card-text>
          <v-data-table
            :items-per-page="5"
            :headers="headers"
            :items="ComplainsPerMonth"
          />
        </v-card-text>
      </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <base-material-card color="#247ba0" >
        <template v-slot:heading>
          <div class="display-3 font-weight-light">
          Quejas en Norte y Sur
          </div>
        </template>
        <v-card-text>
          <v-data-table
            :items-per-page="5"
            :headers="headers3"
            :items="complainsInSouthNorth"
          />
        </v-card-text>
      </base-material-card>
      </v-col>
      <v-col cols="6">
        <base-material-card color="#247ba0" >
        <template v-slot:heading>
          <div class="display-3 font-weight-light">
          Quejas en Oriente
          </div>
        </template>
        <v-card-text>
          <v-data-table
            :items-per-page="5"
            :headers="headers4"
            :items="complainsInEast"
          />
        </v-card-text>
      </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="5" >
        <canvas id="chart" width="400px" height="400"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
// import LineChart from '@/components/LineChart.vue'
import Chart from 'chart.js';
let URL = 'https://diaco-backend.herokuapp.com/'


export default {
  // components: {LineChart},
  
  data() {
    return {
      ComplainsPerMonth : [],
      complains: [],
      rangeComplains: [],
      labels: [],
      dates: ['2020-07-08', '2020-07-24'],
      menu: false,
      modal: false,
      menu2: false,
      headers2: [
          {
            sortable: false,
            text: 'Nombre',
            value: 'name_complain',
          },
          {
            sortable: false,
            text: 'Descripción',
            value: 'description_complain',
            align: 'left',
          },
          {
            sortable: false,
            text: 'Fecha',
            value: 'date_complain',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Sucursal',
            value: 'store_branch.name_store_branch',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Comercio',
            value: 'store_branch.company.name_company',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Municipio',
            value: 'store_branch.store_branch_town.name_town',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Departamento',
            value: 'store_branch.store_branch_town.city.name_city',
            align: 'right',
          },
        ],
       headers: [
          {
            sortable: false,
            text: 'Mes-Año',
            value: 'month_year',
          },
          {
            sortable: false,
            text: 'Quejas',
            value: 'total',
            align: 'left',
          },
      ],
      headers3: [
        {
          sortable: false,
          text: 'Comercio',
          value: 'commerce'
        },
        {
          sortable: false,
          text: 'Quejas R. Norte',
          value: 'complains_north',
          align: 'center',
        },
        {
          sortable: false,
          text: 'Quejas R. Sur',
          value: 'complains_south',
          align: 'center',
        },
        {
          sortable: false,
          text: 'Quejas R. Oriente',
          value: 'complains_east',
          align: 'center',
        },
        {
          sortable: false,
          text: 'Año',
          value: 'current_year',
          align: 'center',
        },
      ],
      headers4: [
        {
          sortable: false,
          text: 'Comercio',
          value: 'commerce',
          align: 'center',
        },
        {
          sortable: false,
          text: 'Quejas',
          value: 'complains',
          align: 'center',
        },
        {
          sortable: false,
          text: 'Año',
          value: 'current_year',
          align: 'center',
        },
      ],
      complainsInSouthNorth :[],
      complainsInEast :[],

    }
  },

   computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
  async mounted(){

    await axios.get(URL+'api/report-complains/').then((response) => {
      this.complainsInSouthNorth = response.data.complains_in_south_north
      this.complainsInEast = response.data.complains_in_east
        console.log(this.complainsStores);
      }).catch((err) => {
        console.log('Err: ' + err);
    })

    await axios.get(URL+'api/data-group/').then((response) => {
        // this.ComplainsPerMonth = response.data
      function getFirst (keyFn, array) {
        var mySet = new Set();
        return array.filter(function(x) {
            var key = keyFn(x), isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
          return isNew;
      });

   
      } 


      var withoutDuplicates = getFirst(x => x.month_year, response.data);
      this.ComplainsPerMonth = withoutDuplicates
      this.complains = withoutDuplicates.map(entry => entry.month_year)
      this.labels = withoutDuplicates.map(entry => entry.total)
      }).catch((err) => {
        console.log('Err: ' + err);
      })
    var ctx = document.getElementById('chart').getContext('2d');  
    var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: this.complains,
        datasets: [{
            label: 'Estadísticas por mes',
            backgroundColor: 'rgb(0, 48, 73)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.labels
        }]
    },

        // Configuration options go here
        options: {}
    });
  },

  methods: {
    async getComplainsByRange(){
        await axios.get(URL+`api/complains/?date_complain_after=${this.dates[0]}&date_complain_before=${this.dates[1]}`).then((response) => {
        this.rangeComplains = response.data
        console.log(response.data);
      }).catch((error) => {
        console.log( ' Error ' + error);
      })
    }
  },
  // created(){
  //   this.getComplainsByRange()
  // }
}
</script>

<style lang="stylus" scoped>

</style>
