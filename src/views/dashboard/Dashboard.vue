<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
      <base-material-stats-card
        color="#F07167"
        icon="mdi-domain"
        title="Comercios"
        :value="this.companies.length"/>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
      <base-material-stats-card
        color="#0081A7"
        icon="mdi-store"
        title="Sucursales"
        :value="this.storeBranches.length"/>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
      <base-material-stats-card
        color="#00AFB9"
        icon="mdi-poll"
        title="Quejas"
        :value="this.complains.length"/>
      </v-col>
      <template>
      <div class="container">
        <line-chart
          v-if="loaded"
          :chartdata="chartdata"
          :options="options"/>
      </div>
    </template>
      <v-col
      >
        <base-material-card
          color="#001524"
        >
          <template v-slot:heading>
            <div class="display-3 font-weight-light">
              Listado de quejas
            </div>
          </template>
          <v-card-text>
            <v-data-table
            item-class="subtitle"
              :items-per-page="7"
              :headers="headers"
              :items="complains"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="#E26D5C"
        >
          <template v-slot:heading>
            <div class="display-3 font-weight-light">
              Estadísticas por Región
            </div>
          </template>
          <v-col cols="12" lg="6" >
            <canvas id="chart" width="400" height="400"></canvas>
          </v-col>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js';
let URL = 'https://diaco-backend.herokuapp.com/'


  export default {
    name: 'DashboardDashboard',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      
      return {
        loaded: false,
        chartdata: null,
        headers: [
          {
            text: 'Tipo de queja',
            value: 'name_complain',
            align: 'center',

          },
          {
            text: 'Descripción',
            value: 'description_complain',
            align: 'center',
          },
          {
            sortable: false,
            text: 'Fecha',
            value: 'date_complain',
            align: 'center',
          },
          {
            sortable: false,
            text: 'Sucursal',
            value: 'store_branch.name_store_branch',
            align: 'center',
          },
          {
            sortable: false,
            text: 'Comercio',
            value: 'store_branch.company.name_company',
            align: 'center',
          },
          {
            sortable: false,
            text: 'Municipio',
            value: 'store_branch.store_branch_town.name_town',
            align: 'center',
          },
          {
            sortable: false,
            text: 'Departamento',
            value: 'store_branch.store_branch_town.city.name_city',
            align: 'right',
          },
        ],
        complains: [],
        storeBranches : [],
        companies : [],
        complainsRegion : [],
        labels : [],
        complainsStores :[],
        quant:'',
        users: []
      }
    },

    methods: {
      getUser(){
        const path = URL+'api/users/'
        axios.get(path).then((response) =>{
        this.users = response.data
        console.log(this.users);
        let find_user = this.users.find (v => v.id == this.$store.state.user)
        console.log(find_user.username); 
        console.log(find_user.permissions); 

      })
    },
  },
  created(){
    this.getUser()
  },
    async mounted(){
      await axios.get(URL+`api/complains/`).then((response) => {
        this.complains = response.data
        this.quejasLength = response.data.length.toString()
      }).catch((error) => {
        console.log( ' Error ' + error);
      })
      //Getting Sucursales
      await axios.get(URL+'api/store-branches/').then((response) => {
        this.storeBranches = response.data
        this.sucursalesLength = response.data.length.toString()
      }).catch((err) => {
        console.log('Err: ' + err);
      })

      //Getting Comercios
      await axios.get(URL+'api/companies/').then((response) => {
        this.companies = response.data
        console.log(this.companies);
        this.companiesLength = response.data.length.toString()
      }).catch((err) => {
        console.log('Err: ' + err);
      })

      await axios.get(URL+`api/complains-region/`).then((response) => {
        this.complainsRegion = response.data.map(entry => entry.region)
        this.labels = response.data.map(entry => entry.complains)
      }).catch((error) => {
        console.log( ' Error ' + error);
      })

      var ctx = document.getElementById('chart').getContext('2d');  
      var chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: this.complainsRegion,
          datasets: [{
              label: 'Número de quejas por Región',
              backgroundColor: 'rgb(0, 48, 73)',
              borderColor: 'rgb(255, 99, 132)',
              data: this.labels
          }]
      },
        options: {}
      });
    },
  }
</script>


<style>
table.v-table thead th {
  font-size: 50px !important;
 }
</style>