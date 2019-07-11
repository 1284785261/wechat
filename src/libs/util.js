import Cookies from 'js-cookie'
//cookie 保存时间
import config from '@/config'
import { forEach, hasOneOf, objEqual } from '@/libs/tools'
const { title, cookieExpires, useI18n } = config

const _toString = Object.prototype.toString;

export const getType = (type) => {
  if (typeof type === 'undefined') return ''
  return Array.from(_toString.call(type)).slice(8, -1).join('');
}

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}

export const getSession = (key) => {
  return JSON.parse(sessionStorage.getItem(key))
}

export const setSession = (key, val) => {
  return sessionStorage.setItem(key, JSON.stringify(val))
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

export const getRouteTitleHandled = (route) => {
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}

export const showTitle = (item, vm) => {
  let { title, __titleIsFunction__ } = item.meta
  if (!title) return
  if (useI18n) {
    if (title.includes('{{') && title.includes('}}') && useI18n) title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
    else if (__titleIsFunction__) title = item.meta.title
    else title = vm.$t(item.name)
  } else title = (item.meta && item.meta.title) || item.name
  return title
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem)
  const pageTitle = showTitle(handledRoute, vm)
  const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  window.document.title = resTitle
}

export const getWeeks = (index) => {
  if (!index) return ''
  switch (index) {
    case 0:
      return '周日'
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
    default: return ''
  }
}

export const dateFromat = (time) => {
  if (!time || getType(time) !== 'Date') return ''
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
}

export const addDay = (number, time) => {
  if (!number || getType(number) !== 'Number') return ''
  time = time || new Date();
  return new Date(time.setDate(time.getDate() + number));
}

export const MP = (ak) => {
  return new Promise((res, error) => {
    window.init = function () {
      res(BMap)
    }
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
    script.onerror = error;
    document.head.appendChild(script);
  })
}
/*
 *  poiRadius 半径为1000米内的POI,默认100米
 *  numPois 列举出50个POI,默认10个
 */
export const MapPOI = (MapGeocoder, mPoint, mOpts) => {
  let mOption = Object.assign({
    poiRadius: 100,
    numPois: 6
  }, mOpts)
  let result = []
  MapGeocoder.getLocation(mPoint, (res) => {
    return res
  }, mOption)
}


export function getMapPoint(res) {
  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    alert(res)
    return res
  }
}

export function stop() {
  var mo = function (e) {
    e.preventDefault();
  };
  document.body.style.position = "fixed";
  document.body.style.height = '100%';
  document.body.style.width = '100%';
  document.body.style.overflow = "hidden";
  document.addEventListener("touchmove", mo, false); //禁止页面滑动
}
export function move() {
  var mo = function (e) {
    e.preventDefault();
  };
  document.body.style.position = "inherit";
  document.body.style.height = 'inherit';
  document.body.style.width = 'inherit';
  document.body.style.overflow = ""; //出现滚动条
  document.removeEventListener("touchmove", mo, false);
}