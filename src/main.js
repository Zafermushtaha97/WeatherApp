import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import Header from '@/components/Header.vue'
import Weather from '@/components/Weather.vue'
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBHdHjJJ-p3gFDwGghskdG30e1Tn3mmPos',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
  installComponents: true
})
Vue.component('Header',Header)
Vue.component('Weather', Weather)
Vue.component('ring-loader',RingLoader)
new Vue({
  render: h => h(App),
}).$mount('#app')
