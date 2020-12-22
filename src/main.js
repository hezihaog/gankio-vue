import Vue from 'vue'
import App from './App.vue'

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant);

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
