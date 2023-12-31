<template>
  <div class="home">
    <HeaderComp id="header"></HeaderComp>
    <CountryDetails v-if="changeState" class="main"></CountryDetails>
    <CountrySeg v-else class="detailss"></CountrySeg>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComp from '@/components/HeaderComp.vue';
import CountrySeg from '@/components/CountrySeg.vue';
import CountryDetails from '@/components/CountryDetails.vue'; // Adjust the import path

export default {
  name: 'HomeView',
  components: {
    HeaderComp,
    CountrySeg,
    CountryDetails
  },
  /* data() {
    return {
      focusState:false
    }
  }, */
  computed:{
     changeState(){
      
      return this.$store.getters.getFocusState
     } ,
    
}}
</script>
<style>
  .home{
    height: inherit;
  }
  
  
</style>
