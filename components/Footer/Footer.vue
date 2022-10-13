<template>
   
   <v-footer
      padless
      color="primary"
      dark
      class="footer"
    >
    <v-row
        justify="center"
        class="my-4 text-center"
      >
        <v-col cols="12">
          <v-btn
            href="#"
            v-for="link in links"
            :key="link"
            text
            dark
            >{{ link }}
          </v-btn>
        </v-col>
        <v-col cols="12">&copy; 2022 Binus</v-col>
      </v-row>
    </v-footer>

    
  
  </template>
  
  <script>
  export default {
      name: "Footer",
    //   components: { FooterPage }
    data: () => {
    return { links: ['Lorem', 'Lorem', 'Lorem'] };
  },
  };
  </script>
  
  <style scoped>
    .footer {
      margin-top: 200px;
    }
  </style>
  