<template>
    <v-container  grid-list-md mt-10>
      <h2 class="text-center pt-10 pb-5">Lorem Ipsum</h2>
      <div class="second-headline">
        <p class="second-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod praesentium corrupti dignissimos, blanditiis 
        minima ab rem voluptatum voluptates placeat commodi inventore temporibus nesciunt quo impedit cupiditate 
        error sint labore fuga?</p>
      </div>
      
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card dark  :style="'background-color: #F3F3F3; box-shadow: none;'">
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text :style="'color: white; font-weight: 300'">{{lorem}}</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex d-flex xs12 sm6 md4>
          <v-card 
            dark 
            :style="'background-color: #F3F3F3; box-shadow: none;'">
            <v-card-title primary class="title" :style="'color: white;'">Lorem</v-card-title>
            <v-card-text :style="'color: white; font-weight: 300'">{{lorem}}{{lorem}}</v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md4>
          <v-card 
            dark 
            :style="'background-color: #F3F3F3; box-shadow: none;'">
            <v-card-title primary class="title" :style="'color: white;'">Lorem</v-card-title>
            <v-card-text :style="'color: white; font-weight: 300'">{{lorem}}{{lorem}}</v-card-text>
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

<style scoped>
.second-headline {
    margin: auto;
}
p.second-description {
  font-size: 16px;
  color: #444444ba;
  text-align: center;
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
}
</style>
  
  