import Vue from 'vue';
import Vuex from 'vuex';

import charts from './modules/charts';


Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    charts: charts,
  },
});
