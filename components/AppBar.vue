<template>
  <div>
    <v-app-bar app color="#34AAE2" dark hide-on-scroll>
      <v-app-bar-nav-icon> </v-app-bar-nav-icon>
      <!-- <v-app-bar-title>Karakterikasi</v-app-bar-title> -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
    
  </div>
</template>

<script>
export default {
  data: () => ({
    dataUser:[],
    items: [
        { title: 'Akunku',route:'/account/profil' },
        { title: 'Notifikasi',route:'/account/notifikasi' },
        { title: 'Keluar' },
      ],
  }),
  methods: {
    to(data){
      this.$router.push(data)
    }
  },
  created(){
    this.dataUser = this.$cookies.get('user')
    console.log('user bar', this.dataUser)
  }
}
</script>

<style>

</style>