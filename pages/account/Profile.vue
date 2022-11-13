<template>
  <div>
    <app-bar/>
    <v-row>
        <v-col cols="12" sm="3" style="min-height:100vh">
            <v-list style="background:none;position:fixed;width:25%">
                <v-list-item-group>
                    <template v-for="item in listMenu">
                      <v-list-item :to="item.route" :key="item.route">
                        <v-icon class="mr-1" color="#0A2A62">{{ item.icon }}</v-icon>
                        <v-list-item-title>{{item.text}}</v-list-item-title>
                      </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-col>
        <v-col cols="12" sm="9">
            <NuxtChild />
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue')
  },
  data: () => ({
    listProfil:[
        { text: 'Data diri', icon:'mdi-account-outline', route: '/account/profile/data-diri' },
        { text: 'Pengaturan User', icon:'mdi-account-outline', route: '/account/profile/set-user' },
    ],
    listMenu:[],
    dataUserId: [],
  }),
  methods: {
    selectMenu(){
      this.listMenu = []
      if (this.dataUserId.role != 'admin') {
        for (let i = 0; i < this.listProfil.length; i++) {
          if (this.listProfil[i].text != 'Pengaturan User') {
            this.listMenu.push(this.listProfil[i])
          }
        }
      }else{
        for (let i = 0; i < this.listProfil.length; i++) {
          this.listMenu.push(this.listProfil[i])
        }
      }
      console.log('menu', this.listMenu)
    }
  },
  created(){
    this.dataUserId = this.$cookies.get('user')
    this.selectMenu()
  }
}
</script>

<style>

</style>