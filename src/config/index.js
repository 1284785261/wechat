export default {
  /**
   * @appId 微信AppID
   */
  appId: 'wxdbd0c0ecfdcebd5f',
  WxServer: 'https://api.weixin.qq.com',
  WxConfig: {
    dev: {
      appid: 'wxdbd0c0ecfdcebd5f',
      secret: '08f08dd1ad777b213c33cfbffda3d5a6',
      access_token: '21_JrTJD1tQz1AHCJTuWc0JQJVJ7xTX4bg2TxZeeIkOXF-qTor56O_IASAnXwPp5rnQKCxhU-6FbjzjYu9iGePPXu337lCDyzcRP-HNf_g3D75aTM_118ZGrUypxd9WqclQqoE0txA9_aYC53pjXVReAAARPL'

    },
    pro: {
      appid: 'wxdbd0c0ecfdcebd5f',
      secret: '08f08dd1ad777b213c33cfbffda3d5a6',
      access_token: '21_JrTJD1tQz1AHCJTuWc0JQJVJ7xTX4bg2TxZeeIkOXF-qTor56O_IASAnXwPp5rnQKCxhU-6FbjzjYu9iGePPXu337lCDyzcRP-HNf_g3D75aTM_118ZGrUypxd9WqclQqoE0txA9_aYC53pjXVReAAARPL'
    }
  },
  mapKey: 'On8dfUs4wumPOoYgbRsGex8CxCWU1oWz',
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'IPS智慧包裹',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'http://192.168.50.222:7500/OrderOnline/api/',
    dev: "http://192.168.50.14:7500/OrderOnline/api/",
    pro: ''
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
