<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
   <template>
    <v-row >
      <v-dialog v-model="dialog" persistent max-width="600px" >
        <template v-slot:activator="{ on, attrs }">
        <v-btn  class="ml-4" v-bind="attrs" v-on="on" outlined color="#1D3557">
          <v-icon size="30">mdi-plus</v-icon>
        </v-btn>
         <v-btn color="#101729" outlined class="ml-5" @click="getCompanies()" ><v-icon  size="30" dark>mdi-refresh</v-icon>
         </v-btn>
         
        </template>
        <form @submit="onSubmit">

        <v-card>
          <v-card-title>
            <span class="headline">Nuevo comercio</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nombre*" name="name_company" v-model.trim="form.name_company" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Correo electrónico" name="email_company" v-model.trim="form.email_company" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Teléfono*" name="phone_company" v-model.trim="form.phone_company" required></v-text-field>
                </v-col>
              </v-row>
              </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#1D3557" outlined class="mr-3"  @click="dialog = false">Cancelar</v-btn>
            <v-btn type="submit" color="#1D3557" raised @click="dialog = false">Guardar</v-btn>
          </v-card-actions>
        </v-card>
          </form>
      </v-dialog>
    <v-spacer />
    <div class="form-inline">
    <v-text-field
    v-model="search_term"
      label="Buscar"
      color="#101729"
    ></v-text-field>  
      <button class="btn btn-outline-info my-2 ml-6 mr-6 my-sm-0" v-on:click="getCommerces()">Buscar</button>
    </div>
    
    </v-row>
  </template>
    <v-row>
      <v-col v-for="(company, i) in toBeShown" :key="i" cols="3" lg="3">
      <div >
         <v-card
         style="text-decoration:none"
          elevation="5"
          class="pt-4 pb-4"
           v-bind:to="'/index/commerce/'+company.id+'/commerce-detail'"
        >
          <v-list-item>
            <v-list-item-avatar color="grey"><span class="white--text headline">{{ company.name_company.charAt(0) }}</span></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ company.name_company }}</v-list-item-title>
              <v-list-item-subtitle>{{ company.stores.length }} Sucursales</v-list-item-subtitle>
              <v-list-item-subtitle>{{ company.total_complains }} Quejas</v-list-item-subtitle>

            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            <span>Ver</span><v-icon class="ml-5">mdi-arrow-right</v-icon>
          </v-card-text>
        </v-card>
      </div>
      </v-col>
      
    </v-row>
    <div>
      <v-btn @click="prevPage" color="#101729" :disabled="currentPage==1">Ver menos</v-btn>
      <v-btn @click="nextPage" color="#101729" :disabled="currentPage == totalPages">Ver más</v-btn>
    </div>
    <v-row class="pt-7">
      <v-col cols="12" lg="6" >
        <canvas id="chart" width="400" height="400"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
let URL = 'https://diaco-backend.herokuapp.com/'
import Chart from 'chart.js';


export default {
  
  data(){
    return {
      permissions: '',
      dialog: false,
      dialog2: false,
      modalShow: false, 
      currentPage: 1,
      companyStores : [],
      commerces: [],
      labels: [],
      search_term: '',
      users: [],
      form : {
        'name_company'  : '',
        'phone_company' : '',
        'email_company' : ''
      }
    }
  },
  methods: {
    async getCommerces(){
      await axios.get(URL+`api/commerces-stores/?search=${this.search_term}`).then((response) => {
        this.companyStores = response.data
      }).catch((err) => {
        console.log('Err: ' + err);
      })
    },




    getUser(){
        const path = URL+'api/users/'
        axios.get(path).then((response) =>{
        this.users = response.data
        console.log(this.users);
        let find_user = this.users.find (v => v.id == this.$store.state.user)
         this.permissions = find_user?.permissions

    })
    },

    
    async getCompanies(){
      await axios.get(URL+`api/commerces-stores/`).then((response) => {
        this.companyStores = response.data
        console.log(this.companyStores);
      }).catch((err) => {
        console.log('Err: ' + err);
      })
    },

    nextPage(){
    	if(this.currentPage <  this.totalPages) this.currentPage++;
    },
    prevPage(){
    	this.currentPage = this.currentPage - 1 || 1;
    },

    onSubmit(evt){
      evt.preventDefault()
      const path = `${URL}api/companies/`
      axios.post(path, this.form).then((response) => {
        this.form.name_company = response.data.name_company
        this.form.phone_company = response.data.phone_company
        this.form.email_company = response.data.email_company
        swal("Comercio agregado.", "", "success")
      }).catch((err) => {
         swal("No se ha registrado el comercio!", "", "error")
      })

    }
  },
  computed:{
  	toBeShown() {
    	return this.companyStores.slice(0, this.currentPage * 6);
    },
    totalPages() {
    	return Math.ceil( this.companyStores.length / 6);
    }
  },

   async mounted(){
      await axios.get(URL+'api/commerces-complains/').then((response) => {
        this.commerces = response.data.map(entry => entry.name_company)
        this.labels = response.data.map(entry => entry.total_complains)
        console.log(response.data);
      }).catch((err) => {
        console.log('Err: ' + err);
      })
        
      var ctx = document.getElementById('chart').getContext('2d'); 
      var chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: this.commerces,
          datasets: [{
              steppedLine: true,
              showLine: true,
              fill: true,
              label: 'Número de quejas por comercio',
              backgroundColor: 'rgb(0, 48, 73)',
              // borderColor: 'rgb(0, 48, 73)',
              data: this.labels
          }]
      },
        options: {}
      });
   },
   created(){
     this.getCommerces(),
     this.getUser()
   },
   

}
</script>
