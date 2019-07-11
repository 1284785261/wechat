import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './routers'
import {
  setToken,
  getToken,
  canTurnTo,
  setTitle
} from '@/libs/util'
Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

// router.beforeEach((to, from, next) => {
//   //Vue.$vux.loading.show();
//   next();
// })

// router.afterEach(to => {
//   //Vue.$vux.loading.hide();
//   // setTimeout(()=>{
//   //   Vue.$vux.loading.hide();
//   // }, 200);
// })

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let isTouchStart = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  isTouchStart = false
  endTime = Date.now()
})
document.addEventListener('touchstart', () => {
  isTouchStart = true
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  let direction

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      direction = 'forward'
    } else {
      direction = 'reverse'
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    direction = 'forward'
  }

  // 判断是否是ios左滑返回 或者 右滑前进
  if (toIndex && toIndex !== '0' && !isPush && (((Date.now() - endTime) < 377) || isTouchStart)) {
    store.commit('updateDirection', {
      direction: ''
    })
  } else {
    store.commit('updateDirection', {
      direction: direction
    })
  }
  isTouchStart = false

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
  setTitle(to, router.app)
  store.commit('updateHeadText', Object.assign({
    hideInMenu: false,
    title: '返回'
  }, to.meta))
})


export default router
