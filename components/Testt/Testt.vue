<template>
    <v-container  grid-list-md mt-10>
      <h2 class="text-center mt-10 py-10">Lorem Ipsum</h2>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md6>
          <v-card color="blue" dark>
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text>{{lorem}}</v-card-text>
          </v-card>
        </v-flex>
        <!-- <v-flex d-flex xs12 sm8 md6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="indigo" dark>
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-card-text>{{lorem.slice(0,70)}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12 v-for="i in 2" :key="i">
                  <v-card color="red lighten-2" dark>
                    <v-card-title>Lorem</v-card-title>
                    <v-card-text>{{lorem.slice(0,40)}}</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex> -->

        <v-flex d-flex xs12 sm6 md6>
          <v-card color="blue" dark>
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text>{{lorem}}</v-card-text>
          </v-card>
        </v-flex>
        
      </v-layout>
  
    </v-container>
  </template>
  <script>
  export default {
    data () {
      return {
        lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio
         vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.
          Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu 
          justo aeque torquatos.`
      }
    }
  }
  </script>
  
  