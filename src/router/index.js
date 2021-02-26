import Vue from 'vue';
import Router from 'vue-router';

import ChartView from '@/views/ChartView';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'chart',
      component: ChartView,
    },
  ],
});

export default router;