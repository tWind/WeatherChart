<template>
  <base-layout>
    <div class="chart__container">
      <chart />
    </div>
  </base-layout>
</template>

<script>

import BaseLayout from '@/layouts/BaseLayout';
import Chart from '@/components/chart/Chart';

export default {
  name: 'ChatView',
  components: {
    BaseLayout,
    Chart,
  },
}
</script>

<style lang="scss" scoped>
.chart__container {
  padding-left: 30px;
  flex-basis: 100%;
}
</style>