import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// import Highcharts from 'highcharts/highstock';
// import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsDrilldown from 'highcharts/modules/drilldown';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import Highmaps from 'highcharts/modules/map';

// HighchartsMore(Highcharts)
// HighchartsDrilldown(Highcharts);
// Highcharts3D(Highcharts);
// Highmaps(Highcharts);

const app = new Vue({
    ...App
})
app.$mount()
