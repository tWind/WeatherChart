<template>
  <div class="chart-display">
    <div class="chart-display__item" v-for="chartData in this.chartDatasets" :key="chartData.label">
      <chart-display-item :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import ChartDisplayItem from './ChartDisplayItem';


const chartColors = [
  '#ed3352',
  '#1344ad',
  '#673ab7',
];

const defaultTemplate = {
  label: '',
  data: [],
  borderColor: '',
  fill: false,
};

export default {
  name: 'ChartDisplay',
  data() {
    return {
      tpl: defaultTemplate,
      chartColors: chartColors,
      chartDatasets: [],
    }
  },
  components: {
    ChartDisplayItem,
  },
  computed: {
    ...mapState('charts', ['charts']),
    ...mapGetters('charts', ['getCharts']),
  },
  methods: {
    createCharts() {
      this.chartDatasets = [];

      this.getCharts.forEach((arr,i) => {
        let currentSet = {};

        currentSet.datasets = Object.assign({}, this.tpl);

        currentSet.datasets.label = arr[0].station;
        currentSet.datasets.data = arr.map(obj => obj.value);
        currentSet.datasets.borderColor = chartColors[i];

        currentSet.labels = arr.map(obj => {
          return obj.date.substring(0, obj.date.length - 9);
        });

        this.chartDatasets.push(currentSet);
      });
    },
  },
  watch: {
    'charts': {
      handler() {
        this.createCharts();
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-display {
  display: flex;
  margin: 0 auto;
}

.chart-display__item {
  flex-basis: 30%;
}
</style>