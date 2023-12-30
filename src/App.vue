<template>
  <home-view></home-view>
</template>
<script>
import HomeView from './views/HomeView.vue';
export default{
components:{
  HomeView
}
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap');
html{
  height: 100%;
  font-family: 'Nunito Sans', sans-serif;
}
body{
  margin: 0;
  height: 100%;
}
#app {
 margin: 0;
 padding: 0;
 height: 100%;
}
home-view{
  height: 100%;
}


</style>
