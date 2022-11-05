<template>
  <div>
    <v-app-bar app color="#34AAE2" dark hide-on-scroll>
      <v-card style="background:transparent" elevation="0" to="/"><h3>KARAKTERISASI PUTUSAN</h3></v-card>
      <!-- <v-app-bar-title>Karakterikasi</v-app-bar-title> -->
      <v-spacer></v-spacer>
      <v-card class="mr-6" elevation="0" style="background:transparent" to="/karakterisasi">
        <h3>Karakterisasi</h3>
      </v-card>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            small
            v-bind="attrs"
            v-on="on"
          >
            {{ dataUser }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="logout()"
          >
            Logout
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    
  </div>
</template>

<script>
export default {
  data: () => ({
    dataUser:'',
    items: [
        { title: 'Akunku',route:'/account/profil' },
        { title: 'Notifikasi',route:'/account/notifikasi' },
        { title: 'Keluar' },
      ],
  }),
  methods: {
    to(data){
      this.$router.push(data)
    },
    logout(){
      this.$cookies.set('email', null)
      this.$router.push('/login')
    }
  },
  created(){
    this.dataUser = this.$cookies.get('email')
    console.log('user bar', this.dataUser)
  }
}
</script>

<style>

</style>