<template>
    <v-container>
      <v-row class="pt-15">
        <v-col lg="6">
          <h2 class="intro-text">Welcome to Text Mining Application</h2>
          <p class="first-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod praesentium corrupti dignissimos, blanditiis 
            minima ab rem voluptatum voluptates placeat commodi inventore temporibus nesciunt quo impedit cupiditate 
            error sint labore fuga?</p>
        </v-col>
        <v-col lg="6">
          <img class="w-1/4" width="500" src="@/static/images/decoration/analyst1.svg" />
        </v-col>
        
      </v-row>
  
    </v-container>
  </template>
  
  <script>
  export default {
      name: "FirstSection",
    //   components: { FooterPage }
  };
  </script>
  
  <style scoped>
    h2.intro-text {
      font-size: 60px;
      padding-top: 30px;
      font-weight: bold;
      color: #444;
    }
    p.first-description {
      font-size: 16px;
      margin: 30px 0;
      color: #444444ba
    }
  </style>
  