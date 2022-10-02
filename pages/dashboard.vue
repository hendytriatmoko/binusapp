<template>
    <div id="app">
      <textarea  class="text-area" v-model="text"></textarea>
      <br />
      <text-reader @load="text = $event"></text-reader>
    </div>
  </template>
  
  <script>
 import TextReader from '~/components/TextReader.vue';
  
  export default {
    name: "app",
    data: () => ({ text: "" }),
    components: {
        TextReader,
    },
  };
  </script>

<style>
    .text-area {
      padding: 10px 10px 20px 10px;
      margin: 30px;
      width: 200px;
    }
    </style>
    
  