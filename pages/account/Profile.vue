<template>
  <div>
    <app-bar/>
    <v-row>
        <v-col cols="12" sm="3" style="min-height:100vh">
            <v-list style="background:none;position:fixed;width:25%">
                <v-list-item-group>
                    <v-list-item v-for="item in listProfil" :to="item.route" :key="item.route">
                        <v-icon class="mr-1" color="#0A2A62">{{ item.icon }}</v-icon>
                        <v-list-item-title>{{item.text}}</v-list-item-title>
                    </v-list-item>
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
    ]
  }),
  methods: {
  }
}
</script>

<style>

</style>