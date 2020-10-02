<template>
<div>
  <div>
    <v-app-bar dense dark prominent style="background-color: teal;">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <router-link v-bind:to=" '/' " style="text-decoration:none; color: white; position: relative;" class="pt-5"><v-toolbar-title > DIACO - SISTEMA DE QUEJAS</v-toolbar-title></router-link> 

      <v-spacer></v-spacer>

      <v-btn  v-bind:to=" 'login' " style="text-decoration:none" class="ml-2" min-width="0" text  >
      <v-icon>mdi-login</v-icon>
        Iniciar sesión 
      </v-btn>
      </v-app-bar>
  </div>
  <div style="padding: 50px;">
    <h4>Bienvenido al sistema de quejas de la DIACO </h4>
    <h4>Ve a tu Región-Departamento para ingresar una queja </h4> 
  </div>
  <div style="padding: 50px;" v-for="(region, i) in regionsCities" :key="i">
  <div class="display-4 font-weight-light">
    {{ region.name_region }}
  </div>

  <v-row >
    <v-col v-for="(city, i) in region.cities" :key="i" cols="3">
    <v-container >
      <v-row>
        <v-card  elevation="6" height="150" width="300" style="text-decoration:none" v-bind:to="'/city/'+city.id+'/city-det'"  >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1 p-1" style="font-size: 25px; font-weight: bold;">{{ city.name_city }}</v-list-item-title>
              <v-list-item-subtitle style="font-size: 20px;">Quejas {{city.complains}}</v-list-item-subtitle>
              <v-list-item-subtitle style="font-size: 20px;">Sucursales {{city.total_stores}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
  </v-col>
  </v-row>
  </div>
</div>

</template>

<script>
  import axios from 'axios'
  let URL = 'https://diaco-backend.herokuapp.com/'

  export default {
    data: () => ({
      dialog: false,
      regionsCities: [],
      regions: [],
      form : {
          'region'  : '',
          'name_city' : '',
      }
    }),

   async mounted(){
     await axios.get(URL+'api/regions-children/').then((response) => {
       this.regionsCities = response.data
       console.log(this.regionsCities);
     }).catch((err) => {
       console.log('Err '+ err);
     })

     await axios.get(URL+'api/regions/').then((response) => {
       this.regions = response.data
     }).catch((err) => {
       console.log(err);
     })
    },
  }
</script>