<template>
    <div
    > 
     <div>
    <v-app-bar dense dark prominent style="background-color: teal;">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <router-link v-bind:to=" '/' " style="text-decoration:none; color: white; position: relative;" class="pt-5"><v-toolbar-title > DIACO - SISTEMA DE QUEJAS</v-toolbar-title></router-link> 

      <v-spacer></v-spacer>

      <v-btn  v-bind:to=" '/login' " style="text-decoration:none" class="ml-2" min-width="0" text  >
      <v-icon>mdi-login</v-icon>
        Iniciar sesión 
      </v-btn>
      </v-app-bar>
    </div>
       <template>
        <v-row style="padding: 50px;">
      <v-col>
      <h2>Municipios de {{ cities.name_city }}</h2>
      
      </v-col>
      <v-row>
      </v-row>
        <v-col cols="12" v-for="(town, i) in cities.towns" :key="i">
 
        <base-material-card

          color="#101729"
          style="text-decoration:none; "
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light " style="padding: 25px;">
              {{ town.name_town }}
              
            </div>
          </template>

          <v-card-text>
            <v-row dense>
              <v-col cols="3">
                <v-card dark color="#101729" class="p-2">
                  <v-card-title class="subtitle">Sucursales: {{ town.total_stores }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row  >
              <v-col cols="3" v-for="(store, i) in town.stores" :key="i">
              <v-container >
                <v-row>
                   <v-card style="text-decoration:none"  elevation="5" v-bind:to=" '/store/'+store.id+'/store-det' ">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">{{store.name_store_branch}}</v-list-item-title>
                        <v-list-item-subtitle>{{ store.address }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-2">Quejas {{store.complains}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar tile size="50" color="info">
                    <v-icon color="white" size="40">mdi-store</v-icon>
                    </v-list-item-avatar>
                    </v-list-item>
                </v-card>
                </v-row>
              </v-container>
            </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
        
      </v-col>
    </v-row>
    <div class="text-center mt-7" v-if="cities.total_towns==0">
    <v-chip class="" color="red" large outlined >
      <span style="font-size: 20px;" class="pa-7">Este departamento no tiene municipios</span> 
    </v-chip>        
    </div>
  </template>
               
    </div> 
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'


let URL = 'https://diaco-backend.herokuapp.com/'
export default {
   data(){
       return {
          dialog: false,
          // dialog: false,
          // towns: [],
          cityId: this.$route.params.cityId,
          // company: [],
          cities: [],
          labels: [],
          complains : [],
          commerces: [],
          form : {
              'name_town'  : '',
              'city': ''
          },
  
       }
   },
    async mounted(){
    //     const path2 = `http://127.0.0.1:8000/api/regions/`   
        const path = `${URL}api/cities-children/${this.cityId}/`   
        await axios.get(path).then((response)=> {
        console.log(response.data);
        this.cities = response.data
        console.log(`Cities    ${this.cities}`);
        this.form.city = this.cities.id
      }).catch((err) => {
          console.log(err);
      })
    
    },

    methods: {
      async onSubmit(evt){
        evt.preventDefault()
        const path = `${URL}api/add-towns/`;
        await axios.post(path, this.form).then((response) => {
            this.form.name_town = response.data.name_town
            this.form.city = response.data.city
            swal("Municipio agregado.", "", "success")
        }).catch((err) => {
            console.log(err);
        })
      },

      async getCitiesChildren(){
        const path = `${URL}api/cities-children/${this.cityId}/`   
        await axios.get(path).then((response)=> {
        console.log(response.data);
        this.cities = response.data
        this.form.city = this.cities.id
        }).catch((err) => {
            console.log(err);
        })
      }
    },

}
</script>

<style>
.select-css {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 100%;
    max-width: 100%; /* useful when width is set to anything other than 100% */
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;

    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right .7em top 50%, 0 0;
    /* icon size, then gradient */
    background-size: .65em auto, 100%;
}
/* Hide arrow icon in IE browsers */
.select-css::-ms-expand {
    display: none;
}
/* Hover style */
.select-css:hover {
    border-color: #888;
}
/* Focus style */
.select-css:focus {
    border-color: #aaa;
    /* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222; 
    outline: none;
}

/* Set options to normal weight */
.select-css option {
    font-weight:normal;
}

/* Support for rtl text, explicit support for Arabic and Hebrew */
*[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
    background-position: left .7em top 50%, 0 0;
    padding: .6em .8em .5em 1.4em;
}

/* Disabled styles */
.select-css:disabled, .select-css[aria-disabled=true] {
    color: graytext;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
}

.select-css:disabled:hover, .select-css[aria-disabled=true] {
    border-color: #aaa;
}

</style>