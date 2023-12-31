import { createStore } from 'vuex'
export default createStore({
  state: {
    clickedCountry:null,
    focusONCountry:false,
    countries:[],
    darkModeIsOn:false
  },
  getters: {
    getClickedCountry(state){
      return state.clickedCountry
    },
    getFocusState(state){
      return state.focusONCountry
    },
    getCountries(state){
      return state.countries
    },
    getDarkModeStatus(state){
      return state.darkModeIsOn
    }
  },
  mutations:{
    setClickedCountry(state,country){
      state.clickedCountry = country
    },
    focusOn(state){
      state.focusONCountry = true
    },
    focusOff(state){
      state.focusONCountry = false
    },
    setCountries(state,country){
      state.countries.push(country)
    },
    setDarkModeStatus(state){
      state.darkModeIsOn = !state.darkModeIsOn
    }
  },
  actions: {
  },
  modules: {
  }
})
