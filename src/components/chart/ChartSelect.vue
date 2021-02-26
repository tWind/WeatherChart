<template>
  <div class="chart-select">
    <form action="#">
      <chart-select-item v-for="chart in chartsList" :chart="chart" :key="chart.index" />
      <button @click="loadData()">load data</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ChartSelectItem from './ChartSelectItem.vue';

const chartsList = [
  {
    datasetid: 'GSOM',
    datatypeid: 'DP10',
    stationid: 'GHCND:USC00010008',
    limit: '12',
    units: 'standard',
    startdate: '2010-05-01',
    enddate: '2013-05-31',
  },
  {
    datasetid: 'GSOM',
    datatypeid: 'DP10',
    stationid: 'GHCND:AGM00060607',
    limit: '12',
    units: 'standard',
    startdate: '2010-05-01',
    enddate: '2013-05-31',
  },
  {
    datasetid: 'GSOM',
    datatypeid: 'DP10',
    stationid: 'GHCND:ASN00010872',
    limit: '12',
    units: 'standard',
    startdate: '2010-05-01',
    enddate: '2013-05-31',
  },
];


export default {
  name: 'ChartSelect',
  data() {
    return {
      chartsList: chartsList,
    }
  },
  components: {
    ChartSelectItem,
  },
  methods: {
    ...mapActions('charts', ['loadStations']),
    loadData() {
      this.loadStations();
    }
  }
}
</script>