<template>
  <div id="app">
    <Header/>
   <Weather/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    
    }
  },
  components: {
    
  },

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
    /* background: #e6ecf0;  */
    background-image: -webkit-gradient(linear,left top,left bottom,color-stop(9%,#113076),to(#157fba));
    background-attachment: fixed;
}
@import './assets/styles/style.css';
</style>

