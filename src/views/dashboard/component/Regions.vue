<template>
  <v-container
    id="typography"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Typography"
      link="styles/typography"
    />

    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12" v-for="(region, i) in regionsCities" :key="i">
        <base-material-card
          color="#0081A7"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              {{ region.name_region }}
            </div>
          </template>

          <v-card-text>
            <v-row dense align="space-around">
              <v-col cols="4">
                <v-card dark color="#F97068" class="p-2 ml-3">
                  <v-card-title class="subtitle-2">{{ region.total_cities }} Departamentos</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card dark color="#101729" class="p-2 ml-3">
                  <v-card-title class="subtitle-2">{{ region.stores }} Sucursale(s)</v-card-title>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card dark color="#EE2E31" class="p-2 ml-3">
                  <v-card-title class="subtitle-2">{{ region.complains }} Quejas(s)</v-card-title>
                </v-card>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row  align="center">
              <v-col v-for="(city, i) in region.cities" :key="i" cols="3">
              <v-container >
                <v-row>
                  <v-card dark elevation="6" style="text-decoration:none" v-bind:to="'/index/city/'+city.id+'/city-detail'" color="#0081A7" >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-1 p-1">{{ city.name_city }}</v-list-item-title>
                        <v-list-item-subtitle style="font-size: 20px;">Quejas {{city.complains}}</v-list-item-subtitle>
                        <v-list-item-subtitle style="font-size: 20px;">Sucursales {{city.total_stores}}</v-list-item-subtitle>

                      </v-list-item-content>
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
  </v-container>
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

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
</style>
