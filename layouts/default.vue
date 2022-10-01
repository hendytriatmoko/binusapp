<template>
  <v-app>
    <alert />
    <v-main>
        <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ '@/components/Alert.vue'),
  },
  computed: {
  },
  data: () => ({
  }),
  created(){
  }
}
</script>
