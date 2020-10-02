<template>
    <v-container height="100%" style="top: 1em; position: relative; padding-right: 25em; padding-left: 25em;">
        <v-row justify="center">
            <div class="form-group ma-3">
                <!--<v-btn class="my-1" disabled block  color="light-blue darken-4 white--text" ><v-icon left size="25">mdi-facebook</v-icon> REGÍSTRATE CON FACEBOOK</v-btn>
                <v-btn block disabled color="red darken-1 white--text" ><v-icon left size="25">mdi-google-plus</v-icon> REGÍSTRATE CON GOOGLE</v-btn>-->
                    <v-row justify="center">
                        <span class="display-4 font ">Registro</span>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <div style="margin-top: -0.5em !important;">
                    <form  @submit.prevent="register">
                        <div class="row">
                        <div class="col">
                            <v-text-field outlined name="first_name" class="font" v-model="form.first_name" required  id="name" dense label="Nombres"></v-text-field>
                        </div>
                        <div class=" col">
                            <v-text-field outlined name="last_name" class="font" v-model="form.last_name" dense label="Apellidos"></v-text-field>
                        </div>
                        </div>
                        <div class="" > 
                            <v-text-field outlined  name="username" class="font" v-model="form.username" dense label="Elija un nombre de usuario"></v-text-field>
                        </div>
                         <div class="" >
                            <v-text-field  name="phone" class="font" v-model="form.phone" label="Ingrese su teléfono" dense outlined></v-text-field>
                        </div>
                         <div class="" >
                            <v-text-field name="email" dense outlined class="font" :rules="emailRules" v-model="form.email" label="Ingrese su e-mail"></v-text-field> 
                        </div>
                        <div class="" >
                            <v-text-field name="password" v-model="form.password" outlined class=" font" @click:append="show1 = !show1" dense label="Ingrese su contraseña" required :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"></v-text-field>
                        </div>
                        <div>
                            <select class="select-css" name="permissions" v-model="form.permissions">
                                <option value="" disabled selected >Tipo Usuario</option>
                                <option value="0">Cliente</option>
                                <option value="1">Admin</option>

                            </select>
                        </div>
                        <v-row justify="center" class="my-1 ma-0">
                            <v-btn block dark :elevation=10 type="submit" color="light-green accent-4" class="font link my-3" >REGISTRARSE</v-btn>          
                        </v-row>
                        
                    </form>
                    <v-divider class="my-1"></v-divider>
                <template>
                    <v-row justify="center" align="center" class="my-1">
                        <div>
                        <span class="caption">¿Ya tienes una cuenta? </span>
                        </div>
                        <v-divider inset vertical class="mx-1"></v-divider>
                        <div>
                        <router-link class="caption" :to="{name: 'login'}"><span>Inicia Sesión</span></router-link>
                        </div>
                    </v-row>
                </template>
                </div>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import axios from'axios'
import swal from 'sweetalert'
let URL = 'https://diaco-backend.herokuapp.com/'

    export default {
         data(){
             return {
                checkbox: false,
                departments: [],   
                selected: '',
                show1: false,
                 emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'El correo debe ser válido. (example@outlook.com)',
                ],
                 form: {
                     town: '',
                     first_name: '',
                     last_name:'',
                     username:'',
                     phone:'',
                     email:'',
                     password:'',
                     permissions: '',
                 }
             }
         },
    methods: {
        register (){
            let data = {
                town: this.form.town,
                first_name: this.form.first_name,
                last_name: this.form.last_name,
                username: this.form.username,
                phone: this.form.phone,
                email: this.form.email,
                password: this.form.password,
                permissions: this.form.permissions
            }
             
            this.$store.dispatch('register', data).then(() =>  
            console.log(this.checkbox),
            swal("Usuario creado exitosamente", "", "success"), 
            this.$router.push('/'))
        },
        },

    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
.form {
   margin-top: 0em;
}
.form1 {
    margin-top: -0.5em;
}
.font {
    font-family: 'Ubuntu', sans-serif;
}
.border {
    border: 1px solid teal !important;
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