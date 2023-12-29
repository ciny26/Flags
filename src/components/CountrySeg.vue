<template>
  <div class="seg-cont">
    <div class="filter">
      <div class="search">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
      <input class="search-inp" type="search" name="" id="" v-model="querySearch" placeholder="Search for your country...">
      </div>
      <select class="select-inp" v-model="Place" @change="updateCountryList">
        <option value="all" selected="true">All Countries</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Americas">America</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
    
    <div class="test">
      <div class="countries">
        <div v-for="country,index in filteredCountries" 
        :key="index" class="country" @click="showCountry(country)">
          <div class="flag"><img :src="country.flag" alt=""></div>
          <div class="infos">
            <div>Country: {{ country.name }}</div>
            <div>Population: {{ formatPopulation(country.population) }}</div>
            <div>Region: {{ country.region }}</div>
            <div>Capital: {{ country.capital }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      Place: 'all',
      querySearch:'' 
    };
  },
  created(){
    this.Place = window.localStorage.getItem('Place')
    this.getCountry();
  },
  computed: {
    filteredCountries() {
      if(this.querySearch != ''){
        const goodQuery = this.querySearch.toLowerCase()
        const filtered = [] 
        this.countries.forEach(country => {
        if(country.name.toLowerCase().startsWith(goodQuery)){
          filtered.push(country)
        }
        })
        return filtered
      }
      else{
        
        window.localStorage.setItem('Place' , this.Place)
        const currentPlace = window.localStorage.getItem('Place')
          if (currentPlace === 'all'){
            return this.countries;
          } else {
            return this.countries.filter(country => country.region === currentPlace);
          }
      }
        
          
        //console.log(filtered , goodQuery)
        //return filtered
      }
    },
      
   
    
  
 

  methods: {
  
      formatPopulation(population) {
    // Use Number.prototype.toLocaleString() to format the population with commas
    return Number(population).toLocaleString();
  },
    async getCountry() {
      try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        this.countries = data;
        this.$store.commit('setCountries', this.countries)

      } catch (error) {
        console.log(error + ' doesn`t work');
      }
    },
    showCountry(country){
      this.$store.commit('setClickedCountry',country)
      this.$store.commit('focusOn')
    }
    
  },
};
</script>
<style >
  .seg-cont{
    background: #f5f5f5;
    padding:1.5rem 0;
  }
  .test{
      text-align: center;
      
  }
  .countries{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0;
  }
  .country{
      cursor: pointer;
      width: 200px;
      height: 354px;
      margin: .8em;
      background: white;
      position: relative;
      overflow: visible;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      
  }
  
  .flag {
      box-sizing: border-box;
      padding: 0;
      
      width: 100%;
      border-radius: .5rem;
  
  }
  .flag>img{
      width: 200px;
      height: 120.6px;
      border: 1px solid black;
  }
  
  .infos{
      padding: 1.2rem 0.8rem;
  }
  .infos>*{
      height:50px;
      padding-top: 7px;
      
      text-align: center;
  }
  .filter{
    display: flex;
    justify-content: space-between;
  }
  .search{
    position: relative;
  }
  .search-inp{
    text-align: center;
    outline: none;
    width: 500px;
    height: 50px;
    margin-left: 12px;
    
  }
  .search-icon{
    position: absolute;
    top: 35%;
    left:16px;
  }
  .select-inp{
    margin-right: 12px;
  }
</style> 