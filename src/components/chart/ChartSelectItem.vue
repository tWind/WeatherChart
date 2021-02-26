<template>
  <div class="chart-select-item">
    <div class="chart-select-item__label">
      <label>
        <input type="checkbox" @click="selectChart()" />
        <span>{{ chart.stationid }}</span>
      </label>
    </div>
    <div class="chart-select-item__button">
      <base-button @click="loadPrevValues()" :disabled="!updateEnabled">load previous values</base-button>
    </div>
    <div class="chart-select-item__picker" v-if="updateEnabled">
      <date-picker v-model="time" range @input="updateDate" />
    </div>
  </div>
</template>

<script>
import constants from '@/constants';

import { mapActions, mapMutations } from 'vuex';
import DatePicker from 'vue2-datepicker';

import BaseButton from '@/components/BaseButton';

export default {
  name: 'ChartSelectItem',
  data() {
    return {
      selected: false,
      updateTimer: null,
      time: null,
    };
  },
  props: {
    chart: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    BaseButton,
    DatePicker,
  },
  computed: {
    updateEnabled() {
      return this.selected;
    }
  },
  methods: {
    ...mapActions('charts', ['loadChart', 'updateChart']),
    ...mapMutations('charts', ['removeChart']),
    selectChart() {
      if(!this.selected) {
        this.loadChart(this.chart);

        this.updateTimer = setInterval(this.loadNextValues, constants.UPDATE_INTERVAL);
      } else {
        this.removeChart(this.chart.stationid);

        clearInterval(this.updateTimer);
      }

      this.selected = !this.selected;
    },
    loadPrevValues() {
      let startDate = new Date(this.chart.startdate);

      startDate.setMonth(startDate.getMonth() - 1);

      this.chart.startdate = startDate.toISOString();
      this.chart.limit = +this.chart.limit + 1;

      this.updateChart(this.chart);
    },
    loadNextValues() {
      let endDate = new Date(this.chart.enddate);

      if(endDate === Date.now()) {
        clearInterval(this.updateTimer);
        return false;
      }

      endDate.setMonth(endDate.getMonth() + 1);

      this.chart.enddate = endDate.toISOString();
      this.chart.limit = +this.chart.limit + 1;

      this.updateChart(this.chart);
    },
    updateDate() {
      this.chart.startdate = formatDate(this.time[0]);
      this.chart.enddate = formatDate(this.time[1]);

      this.updateChart(this.chart);

      function formatDate(date) {
        let newDate =  date.toISOString().split(':')[0];

        return newDate.substring(0, newDate.length - 3)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~vue2-datepicker/index.css";
@import "~@/scss/plugins/datepicker";

.chart-select-item {
  display: flex;
  align-items: center;
  height: 70px;

  > * {
    padding: .5rem 0;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

.chart-select-item__picker {
  display: flex;
  margin-left: 1.5rem;
}

.chart-select-item__picker-input {
  display: flex;
  align-items: center;
  margin-right: 5rem;
}

.month-picker-input-container {
  margin-left: 1rem;
}

.month-picker-input {
  margin-bottom: 0;
}
</style>