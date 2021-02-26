import api from '@/common/api';
import constants from '@/constants';

export default {
  namespaced: true,
  state: {
    charts: [],
    datasets: [],
    stations: [],
  },
  mutations: {
    setChart(state, payload) {
      state.charts.push(payload);
    },
    updateChart(state, payload) {
      let index = state.charts.indexOf(state.charts.find(chart => {
        return chart.id === payload.id;
      }));

      if(index !== -1) {
        state.charts.splice(index, 1, payload);
      }
    },
    removeChart(state, id) {
      state.charts = state.charts.filter(chart => chart.id !== id);
    },
    setDatasets(state, payload) {
      state.datasets = payload;
    },
    setStations(state, payload) {
      state.stations = payload;
    },
  },
  actions: {
    async loadChart(store, params) {
      const charts = await api.get(constants.API_URL, params);
      let chart = {};

      chart.id = params.stationid;
      chart.data = charts.data.results;

      store.commit('setChart', chart);
    },
    async updateChart(store, params) {
      const charts = await api.get(constants.API_URL, params);
      let chart = {};

      chart.id = params.stationid;
      chart.data = charts.data.results;

      store.commit('updateChart', chart);
    },
    async loadDatasets(store) {
      const charts = await api.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets');

      store.commit('setDatasets', charts.data.results);
    },
    async loadStations(store) {
      const charts = await api.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/stations/', {
        limit: 100,
        datasetid: 'GSOM',
        offset: 2600,
      });

      store.commit('setStations', charts.data.results);
    },
  },
  getters: {
    getCharts(state) {
      return state.charts.map(chart => chart.data);
    },
  },
};
