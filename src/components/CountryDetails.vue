<template>
    <div id="h" :style="{backgroundColor:BackgroundColor, color:textColor }">
      <div class="back-btn" @click="goBack" :style="{backgroundColor:ElementsColor }">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
          <path :style="{fill:textColor}" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        <div>Back</div>
      </div>
      <div class="country-details">
        <div class="country-flag">
            <img :src="setClickedValue.flag" alt="">
        </div>
        <div class="country-info">
            <h1 class="country-name">{{ setClickedValue.name }}</h1>
            <div class="country-det">
                <div class="det1">
                    Native Name : {{ setClickedValue.nativeName }} <br>
                    Population : {{ formatPopulation(setClickedValue.population) }} <br>
                    Region : {{ setClickedValue.region }} <br>
                    Sub Region : {{ setClickedValue.subregion }} <br>
                    Capital : {{ setClickedValue.capital }}
                </div>
                <div class="det2">
                    Top level domain : {{ setClickedValue.topLevelDomain[0] }}
                    <div>{{ formattedCurrency }} <br>
                        {{ formattedLanguages }}
                    </div>
                </div>
            </div>
            <div class="borders" v-if="formattedBorders.length != 0">
                <div class="border-text">Border countries :</div>
                <div class="country-borders" v-for="(item,index) in formattedBorders" :key="index" :style="{backgroundColor:ElementsColor }">{{ index+1 }}.{{item}}</div>
            </div>
            
            
        </div>
      </div>
      
    </div>
</template>
<script>
export default {
    data(){
        return {
            clickedCountry:'',
            borderCountries:[],
            darkMode:false
        }
    },
    methods:{
        goBack(){
            this.$store.commit('focusOff')
        },
        formatPopulation(population) {
    // Use Number.prototype.toLocaleString() to format the population with commas
    return Number(population).toLocaleString();
  },
    },
     computed:{
        setClickedValue(){
            
            return this.$store.getters.getClickedCountry
        },
        formattedCurrency(){
            if (!this.setClickedValue.currencies || this.setClickedValue.currencies.length === 0) {
                return '';
            }
            const currencyNames = this.setClickedValue.currencies.map(currency => currency.name);
            return `Currencies: ${currencyNames.join(', ')}`;
        },
        formattedLanguages() {
            if (!this.setClickedValue.languages || this.setClickedValue.languages.length === 0) {
                return '';
            }

            const languageNames = this.setClickedValue.languages.map(language => language.name);
            return `Languages: ${languageNames.join(', ')}`;
        },
        formattedBorders(){
           if(!this.setClickedValue.borders || this.setClickedValue.borders.length === 0 ){
                
                return '';}
                const borderCountriesCodes = this.setClickedValue.borders;
            
            const countries = this.$store.getters.getCountries; // Fix typo here
            
            borderCountriesCodes.forEach((borderCode) => {
               countries.forEach((list) => {
                list.forEach((country)=>{
                if(country.alpha3Code === borderCode && !this.borderCountries.includes(country.name)){
                    this.borderCountries.push(country.name)
                }})
                  
                });
          
            });
            
            return this.borderCountries
            },
            //color Stuffs
            ElementsColor(){
        if(this.$store.getters.getDarkModeStatus){
                    return 'hsl(209, 23%, 22%)'
                }
                else{
                    return 'white' 
                }
      },
      BackgroundColor(){
                if(this.$store.getters.getDarkModeStatus){
                    return 'hsl(207, 26%, 17%)'
                }
                else{
                    return 'hsl(0, 0%, 98%)' 
                }
        },
            textColor(){
                if(this.$store.getters.getDarkModeStatus){
                    return 'white'
                }
                else{
                    return 'hsl(200, 15%, 8%)' 
                }
        }

    }
}
</script>
<style>
    #h{
        display: flex;
        flex-direction: column;
        height: calc(100vh - 50px);
    }
    
    .back-btn{
        width: fit-content;
        display: flex;
        margin: 12px ;
        padding: 8px;
        cursor: pointer;
    }
    .back-btn>*{
        padding: 0 0.2rem;
        
    }
    .country-details{
        width: 100%;
        display: flex;
    }
    .country-flag{
        display: flex;
        align-items: center;
        width: 50%;
        margin: 0 0.5rem;
    }
    .country-flag > img {
        max-width: 100%;
        max-height:100% ;
        border: 1px black solid;
    }
    .country-info{

        width: 50%;
        margin: 0 0.5rem;
        padding: 0.2rem 0;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1.5fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }
    .country-name { 
        grid-area: 1 / 1 / 2 / 2;
     }
    .country-det {
         grid-area: 2 / 1 / 3 / 2;
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-template-rows: 1fr;
         height: fit-content;
    }
    .borders {
         grid-area: 3 / 1 / 4 / 2;
    }
    .borders{
        display: flex;
        flex-wrap: wrap;
        
    }
    .country-borders{
        max-height: 38px;
        padding:0px 6px;
        margin: 0px 3px 2px 3px;
        border-radius: 6px;
        display: flex;
        align-items: center;
    }
    .border-text{
        font-size: 1.4rem;
        max-height: 38px;
        display: flex;
        align-items: center;
        padding:0px 6px;
        margin: 0 3px 2px 3px;
    }
    @media  (max-width:700px) {
        #h{
            height: fit-content;
        }
        .country-details{
            flex-direction: column;
            align-items: center;
            height: auto;
        }
        .country-info{
        
        width: 60%;
        grid-template-columns: 1fr;
        grid-template-rows: 0.4fr 1fr 1fr;
        
        }
        .country-name { 
        grid-area: 1 / 1 /2 / 2;
     }
    .country-det {
         grid-area: 2 / 1 / 3 / 2;
         display: grid;
         grid-template-columns: 1fr;
         grid-template-rows: 1fr;
         height: fit-content;
    }
    .borders {
         grid-area: 3 / 1 / 4 / 2;
    }
    .border-text{
        padding: 0;
        margin: 0;
       
        
    }
        
    }
</style>