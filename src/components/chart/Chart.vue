<template>
  <div class="chart">
    <div class="chart__select">
      <chart-select />
    </div>
    <div class="chart__display">
      <chart-display />
    </div>
  </div>
</template>

<script>
import ChartSelect from './ChartSelect';
import ChartDisplay from './ChartDisplay';


export default {
  name: 'Chart',
  components: {
    ChartSelect,
    ChartDisplay,
  },
}
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
</style>
