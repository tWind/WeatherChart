<template>
  <div class="chart-display">
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';
  import Chart from 'chart.js';

  const options = {
    label: 'Global Summary of the Month',
    title: {
      display: true,
      text: 'Weather by value',
    },
  };

  const chartColors = [
    '#ed3352',
    '#1344ad',
    '#673ab7',
  ];

  const chartTemplate = {
    label: '',
    data: [],
    borderColor: '#009688',
    fill: false,
  };

  export default {
    name: 'ChartDisplay',
    data() {
      return {
        chartOptions: options,
        chartLabels: [],
        tpl: chartTemplate,
        chartDatasets: [],
        chartColors: chartColors,
        weatherChart: null,
      }
    },
    props: {
      chart: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    computed: {
      ...mapState('charts', ['charts']),
      ...mapGetters('charts', ['getCharts']),
      ...mapMutations('charts', ['updateChart']),
    },
    methods: {
      findChartLabels() {
        const chartsList = this.getCharts;

        this.chartLabels = chartsList[0].map(obj => {
          return obj.date.substring(0, obj.date.length - 9);
        });
      },
      createChartObject() {
        this.chartDatasets = [];

        this.getCharts.forEach((arr,i) => {
          let currentSet = Object.assign({}, this.tpl);

          currentSet.label = arr[0].station;
          currentSet.data = arr.map(obj => obj.value);
          currentSet.borderColor = chartColors[i];

          this.chartDatasets.push(currentSet);
        });
      },
      renderChart() {
        const ctx = document.getElementById('myChart');

        if(this.getCharts.length === 0 && this.weatherChart) {
          this.weatherChart.destroy();

          return false;
        }

        this.findChartLabels();
        this.createChartObject();

        this.weatherChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.chartLabels,
            datasets: this.chartDatasets,
          },
          options: this.chartOptions,
        });
      },
    },
    watch: {
      'charts': {
        handler() {
          this.renderChart();
        },
        deep: true,
      },
    },
  }
</script>