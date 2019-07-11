// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import i18n from './locale'
import axios from 'axios';
import config from './config'
import BusinessConfig from './config/BusinessConfig'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueScroller from 'vue-scroller'
import FastClick from 'fastclick'
import {
  Icon,
  ConfirmPlugin,
  LoadingPlugin,
  ToastPlugin,
  DevicePlugin,
  WechatPlugin,
  AlertPlugin,
  Toast
} from 'vux'
import vpay from 'vpay'
FastClick.attach(document.body);
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin, { position: 'middle' })
Vue.use(DevicePlugin)
Vue.use(WechatPlugin)
Vue.use(AlertPlugin)
Vue.use(VueAwesomeSwiper)
Vue.use(vpay)
Vue.use(VueScroller)
Vue.component('icon', Icon)


Vue.config.productionTip = false

Vue.prototype.$config = config
Vue.prototype.$BusinessConfig = BusinessConfig
/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app-box')


Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}