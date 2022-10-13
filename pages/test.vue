<template>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md6>
          <v-layout row wrap>
            <v-flex>
              <v-card :style="'border: 1px solid #EDEDED; box-shadow: none; '">
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-card-text>{{ lorem }}</v-card-text>
                <v-container>
                    <v-file-input :style="'box-shadow: none;'" prepend-icon="" outlined label="Input File Resource"></v-file-input>
                </v-container>
                
                <v-card-actions>
            <v-spacer/>
            <v-btn  color="#0A2A62" class="white--text mr-5 my-5 py-5 px-10">Read</v-btn>
          </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card :style="'border: 1px solid #EDEDED; box-shadow: none; '">
                <v-card-title class="title">Lorem</v-card-title>
                <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
                <v-container>
                  <v-textarea label="Read Source" outlined></v-textarea>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex d-flex xs12 sm6 md6>
          <v-card :style="'border: 1px solid black; box-shadow: none; min-height: 50vh'">
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text>{{ lorem }}</v-card-text>
              <v-container>
              <v-card-actions> 
                  <v-textarea rows="1" label="Characterization Results" outlined></v-textarea>
              </v-card-actions> 
            </v-container>
          </v-card>
        </v-flex>
        <!-- <v-flex d-flex xs12 sm6 md2 child-flex>
          <v-card color="green lighten-2" dark>
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="blue lighten-2" dark>
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          </v-card>
        </v-flex> -->
      </v-layout>
    </v-container>
  </template>
  <script>
  export default {
    data() {
      return {
        lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio
         vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.
          Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu 
          justo aeque torquatos.`,
      };
    },
  };
  </script>

<style>
.karakterisasiResult {
  border: 1px solid blue;
  /* border-collapse: collapse; */
}
</style>
  
  