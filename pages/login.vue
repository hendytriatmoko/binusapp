<template>
  <div>
    <!-- <v-img style="width:100vw;height:100vh" src="/Asabri.jpg"> -->
    <v-card elevation="0" style="background:rgba(0, 0, 0, 0.5);;margin: 23vh auto !important;" :width="$vuetify.breakpoint.xs ? '80%' : '30%'">
      <div class="pa-3 white--text">
        <center><h2>MASUK</h2></center>
        <div><b>Email</b></div>
        <v-text-field rounded="xl" v-model="email" solo dense></v-text-field>
        <div><b>Password</b></div>
        <v-text-field 
            rounded="xl"
            :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'" 
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            solo
            v-model="password"
            dense>
        </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1C94C7">Masuk</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
  },
  data: () => ({
    listUser:[],
    email:'',
    password:'',
    value:true,
  }),
  methods: {
  },
  created(){
    // this.getUser()
  },
}
</script>
