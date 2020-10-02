<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Editar Perfil
            </div>
          </template>

          <form @submit="onSubmit">
            <v-container class="py-0">
              <v-row>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    name="username"
                    v-model.trim="form.username"
                    label="Username"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    name="first_name"
                    v-model.trim="form.first_name"
                    label="Nombre"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    name="last_name"
                    v-model.trim="form.last_name"
                    label="Appellidos"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    name="phone"
                    v-model.trim="form.phone"
                    label="Teléfono"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  readonly
                    name="password"
                    v-model.trim="form.password"
                    label="Contraseña"
                    class="purple-input"
                    @click:append="show1 = !show1"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    type="submit"
                    color="success"
                    class="mr-0"
                  >
                    Guardar Cambios
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://vorum.com/wp-content/themes/healsoul/assets/images/avatar-placeholder.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text" v-if="permissions == '0' ">
              User
            </h6>
            <h6 class="display-1 mb-1 grey--text" v-else>
              Admin
            </h6>
            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{form.first_name}}
            </h4>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
let URL = 'https://diaco-backend.herokuapp.com/'

  export default {
    data: () => ({
      idUser: '',
      permissions: '',
      show1: false,
      form : {
        'first_name': '',
        'last_name': '',
        'username': '',
        'phone': '',
        'password': '',
      }
    }),
      computed: {
      isLoggedIn (){
        return this.$store.getters.isLoggedIn
      }, 
    },

    methods: {
      getUser(){
        const path = URL+'api/users/'
        axios.get(path).then((response) =>{
        this.users = response.data
        console.log(this.users);
        let find_user = this.users.find (v => v.id == this.$store.state.user)
        this.idUser = find_user?.id
        this.form.first_name = find_user?.first_name
        this.permissions = find_user?.permissions
        this.form.phone = find_user?.phone
        this.form.email = find_user?.email
        this.form.last_name = find_user?.last_name
        this.form.username = find_user?.username
        this.form.password = find_user?.password
        console.log(this.idUser);
      })
      },
      onSubmit(evt){
        event.preventDefault()
        const path = `${URL}api/users/${this.idUser}/`
        axios.put(path, this.form).then((response) => {
            this.form.first_name = response.data.first_name
            this.form.last_name = response.data.last_name
            this.form.username = response.data.username
            this.form.phone = response.data.phone
            swal("User actualizado exitosamente", "", "success")
        }).catch((error) =>{
          console.log(error);
        })
      },
    },
    created(){
      this.getUser()
    },

  }
</script>
