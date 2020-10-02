<template>
    <v-container
    id="regular-tables"
    fluid
    tag="section"
    > 
       <template>
        <v-row>
        <v-dialog v-model="dialog" persistent max-width="600px" >
            <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" class="ml-4" v-on="on" outlined color="#1D3557">
            <v-icon size="30">mdi-plus</v-icon>
            </v-btn>
            <v-btn color="#101729" outlined class="ml-5" @click="getComerceDetail()" ><v-icon size="30" dark>mdi-refresh</v-icon>
            </v-btn>
            </template>
            <form @submit="onSubmit">
            <v-card>
            <v-card-title>
                <span class="headline">Agregar sucursal para {{ company.name_company }} </span>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
                     <v-col cols="12">
                        <div>
                        <select class="select-css" name="store_branch_town" v-model="form.store_branch_town">
                            <option value="" disabled selected>Municipio</option>
                            <option v-for="(town, i) in towns" :key="i" :id="town.id" :value="town.id">{{ town.name_town }} - {{ town.city.name_city }} - {{ town.city.region.name_region }} </option>
                        </select>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Nombre*" name="name_store_branch" v-model="form.name_store_branch" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Dirección" name="address" v-model="form.address" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Teléfono" name="phone" v-model.trim="form.phone" required></v-text-field>
                        </v-col>
                    <input type="hidden" :id="company.id" name="company"  v-model="this.form.company" >
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
        <v-dialog v-model="dialog2" persistent max-width="600px" >
            <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" class="ml-4" v-on="on" outlined color="#1D3557">
            <v-icon size="30">mdi-pencil</v-icon>
            </v-btn>
            </template>
            <form @submit="onSubmit2">
            <v-card>
            <v-card-title>
                <span class="headline">Editar comercio {{ company.name_company }} </span>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Nombre*" name="name_company" v-model="form2.name_company" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Teléfono" name="phone_company" v-model="form2.phone_company" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Email" name="email_company" v-model.trim="form2.email_company" required></v-text-field>
                    </v-col>
                </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#1D3557" outlined class="mr-3"  @click="dialog2 = false">Cancelar</v-btn>
                <v-btn type="submit" color="#1D3557" raised @click="dialog2 = false">Guardar</v-btn>
            </v-card-actions>
            </v-card>
          </form>

      </v-dialog>
    </v-row>
  </template>
    <h1 class="heading-1 mt-3">{{ company.name_company }}</h1>
        <v-row >
               <v-col
               v-for="(store, i) in company.stores"
               :key="i"
                cols="12"
                lg="4"
            >
            <v-card style="text-decoration:none"  elevation="5" v-bind:to=" '/index/store-branch/'+store.id+'/store' ">
                <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{store.name_store_branch}}</v-list-item-title>
                    <v-list-item-subtitle>Quejas: {{ store.total_complains }}</v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">{{store.address}} {{store.store_branch_town.name_town}} {{store.store_branch_town.city.name_city}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar tile size="50" color="info">
                <v-icon color="white" size="40">mdi-store</v-icon>
                </v-list-item-avatar>
                </v-list-item>
                <div class="ml-5 mb-5 pb-2">
                    Región <span class="red--text">{{ store.store_branch_town.city.region.name_region }}</span>
                </div>
            </v-card>
            </v-col>
        </v-row>
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
        dialog2: false,
        idUser: '',
        towns: [],
        companyId: this.$route.params.companyId,
        company: [],
        stores: [],
        form : {
            'name_store_branch'  : '',
            'address' : '',
            'company': '',
            'phone': '',
            'store_branch_town' : ''
        },
        form2 : {
            'name_company'  : '',
            'phone_company' : '',
            'email_company': '',
        },
    }
   },
   async mounted(){
        const path = `${URL}api/commerces-stores/${this.companyId}/`   
        await axios.get(path).then((response)=> {
        this.company = response.data
        this.form.company = this.company.id
        console.log(this.form.company);
        console.log(this.company);
        return axios.get(URL+'api/stores-children/')
      }).then((response) => {
          this.stores = response.data
          console.log(this.stores);
      }).catch((err) => {
          console.log(err);
      })
      await axios.get(`${URL}api/towns/`).then((response) => {
          this.towns = response.data
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
            this.permissions = find_user?.permissions
            this.idUser = find_user?.id

            console.log(this.idUser);
            console.log(find_user.username); 
            console.log(find_user.permissions); 

            })
        },
        async onSubmit(evt){
            evt.preventDefault()
            const path = `${URL}api/store-branches/`;
            await axios.post(path, this.form).then((response) => {
                this.form.name_store_branch = response.data.name_store_branch
                this.form.address = response.data.address
                this.form.company = response.data.company
                this.form.phone = response.data.phone
                this.form.store_branch_town = response.data.store_branch_town
                swal("Comercio agregado.", "", "success")
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
        },

         async onSubmit2(evt){
            evt.preventDefault()
            const path = `${URL}api/companies/${this.companyId}/`;
            await axios.put(path, this.form2).then((response) => {
                this.form2.name_company = response.data.name_company
                this.form2.phone_company = response.data.phone_company
                this.form2.email_company = response.data.email_company

                swal("Comercio Editado.", "", "success")
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
        },

        async getComerceDetail(){
            const path = `${URL}api/commerces-stores/${this.companyId}/`   
            await axios.get(path).then((response)=> {
            this.company = response.data
            this.form.company = this.company.id
            console.log(this.form.company);
            console.log(this.company);
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
    /* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
        for the icon, if you want to change the color, be sure to use `%23` instead of `#`, since it's a url. You can also swap in a different svg icon or an external image reference
        
    */
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