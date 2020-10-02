<template> 
<v-container height="100%" style="top: 5em; position: relative; padding-right: 25em; padding-left: 25em;">
    <v-row justify="center">
        <span class="display-4 font ">Iniciar Sesión</span>
    </v-row>
        <v-divider></v-divider>
    <v-form  ref="form" class="ma-8 font" @submit.prevent="login" id="login-form">
        <v-text-field outlined class="input-group--focused font" v-model="username" label="Nombre de Usuario" required></v-text-field>
        <v-text-field outlined class=" font" @click:append="show3 = !show3" v-model="password" label="Contraseña" required :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :type="show3 ? 'text' : 'password'"></v-text-field>
        <v-btn type="submit" dark :elevation=10 form="login-form" block color="light-green accent-4" class="font link mr-4" >INICIA SESIÓN</v-btn>     
    </v-form>
        <v-divider></v-divider>

</v-container>
</template>


<script>
    export default {
         data (){
             return {
                username: '',
                password: '',
                show2: true,
                   rules: {
                    required: value => !!value || "Field required",
                    min: value => value.length >= 4 || "Minimum 4 characters",
                },
                show3: false,
                isSwitch: false,
             }
    },
    methods: {
        login (){
            let username = this.username
            let password = this.password
            this.$store.dispatch('login', { username, password })
            .then(() => window.location.href = '/index/dashboard')
            .catch(err => alert('Usuario y/o contraseña inválidos')+ err)
      },
      },
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
.form {
   margin-top: 0em;
}
.link {
    text-decoration: none;
}
</style>