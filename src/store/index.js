import { createStore } from 'vuex'

export default createStore({
  state: {
    clickedCountry:null,
    focusONCountry:false,
    countries:[]
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
    }
  },
  actions: {
  },
  modules: {
  }
})
