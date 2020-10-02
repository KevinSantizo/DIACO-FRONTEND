<template>
    <v-container
    id="regular-tables"
    fluid
    tag="section"
    > 
    <div>
        <v-btn icon style="text-decoration:none" v-bind:to=" '/index/regions/' ">
            <v-icon color="#101729" dark size="45">mdi-chevron-left</v-icon>
        </v-btn>
        </div>
       <template>
        <v-row >
      <v-col>
      <h2>Municipios de {{ cities.name_city }}</h2>
      
      </v-col>
      <v-row>
        <v-spacer></v-spacer>
             <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
             <v-btn  class="mr-5" v-bind="attrs" v-on="on" outlined color="#1D3557">
            <v-icon size="30">mdi-plus</v-icon>
            </v-btn>
            <v-btn color="#101729" outlined class="mr-5" @click="getCitiesChildren()" ><v-icon size="30" dark>mdi-refresh</v-icon>
            </v-btn>
            </template>
            <form @submit="onSubmit">
            <v-card>
            <v-card-title>
                <span class="headline">Agregar Municipio para {{ cities.name_city }} </span>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nombre*" name="name_town" v-model="form.name_town" required></v-text-field>
                    </v-col>
                    <input type="hidden" :id="cities.id" name="company"  v-model="this.form.city" >
                    <!-- <input type="hidden" :id="store.company.id" name="company"  v-model="this.form.company" >
                    <input type="hidden" :id="store.company.id" name="company"  v-model="this.form.store_branch_town" > -->
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
      </v-row>
        <v-col cols="12" v-for="(town, i) in cities.towns" :key="i">
 
        <base-material-card
        
          color="#101729"
          v-bind:to=" '/index/town/'+town.id+'/town-detail' "
          style="text-decoration:none"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              {{ town.name_town }}
              
            </div>
          </template>

          <v-card-text>
            <v-row dense>
              <v-col cols="3">
                <v-card dark color="#101729" class="p-2">
                  <v-card-title class="subtitle">Sucursales {{ town.total_stores }}</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="2">
                <v-card dark color="#EE2E31" class="p-2 ml-3">
                  <v-card-title class="subtitle">Quejas {{ town.total_complains }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row  >
              <v-col cols="3" v-for="(store, i) in town.stores" :key="i">
              <v-container >
                <v-row>
                   <v-card style="text-decoration:none"  elevation="5" v-bind:to=" '/index/store-fromcity/'+store.id+'/store' ">
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
               
    </v-container> 
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'


let URL = 'https://diaco-backend.herokuapp.com/'
export default {
   data(){
       return {
          dialog: false,
          permissions: '',
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
      async getUser(){
        const path = URL+'api/users/'
        await axios.get(path).then((response) =>{
        this.users = response.data
        console.log(this.users);
        let find_user = this.users.find (v => v.id == this.$store.state.user)
        this.permissions = find_user.permissions
        console.log(find_user.username); 
        console.log(find_user.permissions); 

        })
    },
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
    created(){
     this.getUser()
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