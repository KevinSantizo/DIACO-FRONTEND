<template>
    <v-container>
    <div>
        <v-btn icon style="text-decoration:none" v-bind:to=" '/index/commerce/'+store.company.id+'/commerce-detail' ">
            <v-icon color="#101729" dark size="45">mdi-chevron-left</v-icon>
        </v-btn>
        </div>
        <v-row>
            <h1 class="heading-1 ml-7">Sucursal {{store.name_store_branch}}</h1>
            <v-spacer></v-spacer>
             <v-dialog v-model="dialog" persistent max-width="600px" v-if="permissions == 0">
                <template v-slot:activator="{ on, attrs }">
                <div class="text-center">
                    <v-btn class="mr-5" outlined v-bind="attrs" v-on="on" color="#101729"><v-icon size="30">mdi-plus</v-icon>Agregar Queja</v-btn>
                    <v-btn color="#101729" outlined class="mr-5" @click="getComplains()" ><v-icon  size="30" dark>mdi-refresh</v-icon>
                    </v-btn>
                </div>
                </template>
                <form @submit="onSubmit">

                <v-card>
                <v-card-title>
                    <span class="headline">Nueva queja para <span class="red--text">{{store.name_store_branch}}</span></span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12">
                        <div>
                            <select class="select-css" name="name_complain" v-model="form.name_complain">
                                <option value="" disabled selected >Tipo de queja</option>
                                <option value="Mala atención">Mala atención</option>
                                <option value="Producto defectuoso">Producto defectuoso</option>
                                <option value="Producto vencido">Producto vencido</option>
                                <option value="Entrega atrasada">Entrega atrasada</option>
                                <option value="Precio elevado">Precio elevado</option>
                                <option value="Servicio al cliente">Servicio al cliente</option>
                                <option value="Disponibilidad de horario">Disponibilidad de horario</option>
                            </select>
                        </div>
                        </v-col>
                        <v-col cols="12">
                        <v-text-field label="Descripción*" name="description_complain" v-model="form.description_complain" required></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="4">
                         <v-row>
                          <v-text-field type="date" placeholder="Fecha" dense v-model="form.date_complain" class="font" outlined></v-text-field>
                            <v-icon size="45" class="mb-6 ml-4">mdi-calendar</v-icon>
                         </v-row>
                           
                        </v-col>
                    <input type="hidden" :id="store.id" name="store_branch"  v-model="this.form.store_branch" >
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
        <div class="ml-5">
            <h6>{{store.address}} {{store.store_branch_town.name_town}} {{store.store_branch_town.city.name_city}}</h6>
            <h6>{{ store.store_branch_town.city.region.name_region }}</h6>
        </div>
        <div class="text-center mt-7" v-if="store.total_complains==0">
        <v-chip class="" color="red" large outlined >
          <span style="font-size: 20px;" class="pa-7">Esta tienda no tiene quejas.</span> 
    </v-chip>        
    </div>
        <div style="overflow-x:auto;" class="mt-9" v-else>
            <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Tipo de queja</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="complain in store.complains" :key="complain.name_complain">
                            <td>{{ complain.name_complain }}</td>
                            <td>{{ complain.description_complain }}</td>
                            <td>{{ complain.date_complain }}</td>
                            <td>
                            <b-button type="button" @click="DELETE(complain, complain.id), modalShow = !modalShow" variant="danger">Eliminar</b-button>
                            </td>
                          <b-modal hide-footer v-model="modalShow" id="myModal" title="Eliminar queja">
                                <p class="my-4">¿Estás seguro de eliminar esta queja?</p>
                                <b-button class="mt-3" variant="outline-danger" block @click="deleteComplain(test_complain, test_id)">Eliminar</b-button>
                                <b-button class="mt-2" variant="outline-info" block @click="modalShow = !modalShow">Cancelar</b-button>
                            </b-modal>
                        </tr>
                    </tbody>
                </table>
        </div>
    </v-container>
    
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
let URL = 'https://diaco-backend.herokuapp.com/'

export default {
   data(){
       return {
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            modalShow: false,
            permissions: '',
            dialog: false,
            storeId: this.$route.params.storeId,
            store: [],
            fields: [
                {
                    key: 'name_complain',
                    label: 'Nombre'
                },
                {
                    key: 'description_complain',
                    label: 'Descripción'
                },
                {   key: 'date_complain',
                    label: 'Fecha'
                }
            ],
            form : {
                'store_branch': '',
                'name_complain': '',
                'description_complain': '',
                'date_complain' : ''
            },
            complains : [],
            test_complain : {},
            test_id : ''
       }
   },
   mounted(){
        axios.get(`${URL}api/stores-children/${this.storeId}/`).then((response) => {
            this.store = response.data
            console.log(`${this.store.name_store_branch}`);
            this.complains = this.store.complains
            this.form.store_branch = this.store.id
            console.log(this.store.complains);
            // for (var i in this.store.complains) {
            //     console.log(i);
            // }
        }).catch((err) => {
            console.log(err);
        })
    },
        methods: {

        DELETE(complains1, id1) {
            this.test_complain = complains1;
            this.test_id = id1;
        },
        deleteComplain(complains, id){
            const path = `${URL}api/complains/${id}/`
            axios.delete(path).then((response)=>{
                console.log( 'Error  ' + response);
                swal("Queja eliminada.", "", "success")
                window.location.reload();
                this.complains.splice(id, 1)
            })
        },

          onSubmit(evt){
            evt.preventDefault()
            const path = `${URL}api/add-complains/`;
             axios.post(path, this.form).then((response) => {
                this.form.store_branch = response.data.store_branch
                this.form.name_complain = response.data.name_complain
                this.form.description_complain = response.data.description_complain
                this.form.date_complain = response.data.date_complain
                swal("Queja agregada.", "", "success")
            }).catch((err) => {
                console.log(err);
            })
        },

         getComplains(){
            axios.get(`${URL}api/stores-children/${this.storeId}/`).then((response) => {
            this.store = response.data
            console.log(`${this.store.name_store_branch}`);
            this.complains = this.store.complains
            this.form.store_branch = this.store.id
            console.log(this.store.complains);
            // for (var i in this.store.complains) {
            //     console.log(i);
            // }
            }).catch((err) => {
                console.log(err);
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
    },
    created(){
     this.getUser()
    }
}
</script>

<style>
.styled-table {
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #001524;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #001524;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}


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