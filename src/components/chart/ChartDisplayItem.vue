<template>
  <div class="chart-display-item">
    <canvas ref="weatherChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Chart from 'chart.js';

const options = {
  label: 'Global Summary of the Month',
  title: {
    display: true,
    text: 'Weather by value',
  },
};

export default {
  name: 'ChartDisplayItem',
  data() {
    return {
      chartOptions: options,
      weatherChart: null,
      currentChartData: {},
      datasets: [],
    };
  },
  props: {
    chartData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...mapActions('charts', ['updateCharts']),
    renderChart() {
      console.log('rendering charts');
      const ctx = this.$refs.weatherChart;

      this.currentChartData = this.chartData;

      this.datasets = [];
      this.datasets.push(this.chartData.datasets);

      if(!this.datasets.length && this.weatherChart) {
        this.weatherChart.destroy();

        return false;
      }

      this.weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.labels,
          datasets: this.datasets,
          options: this.chartOptions,
        }
      });
    },
    updateChart() {
      this.datasets = [];
      this.datasets.push(this.chartData.datasets);

      this.weatherChart.data.labels = this.chartData.labels;
      this.weatherChart.data.datasets = this.datasets;


      if(JSON.stringify(this.currentChartData.labels) !== JSON.stringify(this.chartData.labels)) {
        console.log('updating charts');

        this.weatherChart.update();
      }

      this.currentChartData = this.chartData;
    }
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    'chartData': {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
}
</script>
