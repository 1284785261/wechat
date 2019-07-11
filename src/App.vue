<template>
  <div id="app">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <XHeader :left-options="headerLeftOptions" v-if="!header.hideInMenu"></XHeader>
    <transition @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')" :name="viewTransition" :css="!!direction">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
import { Loading, TransferDom, XHeader } from "vux";
import { mapState } from "vuex";
import { UserForWX } from "@/api/common";
import store from "@/store";
export default {
  directives: {
    TransferDom
  },
  components: {
    Loading,
    XHeader
  },

  name: "app",
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      isLoading: state => state.app.isLoading,
      direction: state => state.app.direction,
      header: state => state.app.header
    }),
    viewTransition() {
      if (!this.direction) return "";
      return "vux-pop-" + (this.direction === "forward" ? "in" : "out");
    },
    headerLeftOptions() {
      let backText = this.header.title;
      return { backText };
    }
  },

  data() {
    return {
      isWechaty: true,
      wx: {
        wxAppId: "wx1f1b9f9d40cf2af3", // 微信公众号 ID
        wxSecret: "", // 微信公众号 密钥
        code: "", // 授权获取的 code
        openid: "", // 授权获取的 openid
        unionid: "" // 授权获取的用户唯一标识 unionid
      },
      query: {
        a: "",
        b: ""
      }
    };
  },

  created() {
    // 检测是浏览器端还是微信端
    let ua = navigator.userAgent.toLowerCase();
    if (String(ua.match(/MicroMessenger/i)) === "micromessenger") {
      this.isWechat = true;
    } else {
      this.isWechat = false;
    }
    this.handleAuthorize();
    this.getCode();
  },

  methods: {
    handleAuthorize() {
      if (!this.isWechat) return;
      if (!this.wx.wxAppId) return;
      let pagePath = decodeURIComponent(window.location.href); // 页面路径
      let urlArray = pagePath.split("?");
      let WXAuthorize = window.localStorage.getItem("hasAuthorize") || false; // 是否已经微信网页授权
      let redirectQuery = ""; // 重定向自定义传参

      // 判断初始路径（授权前）上是否带参，以便之后写入重定向路径中
      if (urlArray.length > 1) {
        // 带参情况
        let query = urlArray[1].split("#")[0].split("&");

        query.forEach(item => {
          let queryName = item.split("=")[0];
          let queryValue = item.split("=")[1];

          /**
           * 判断是授权后的重定向，还是授权前
           * true：已授权；false：未授权
           */
          if (WXAuthorize) {
            if (queryName === "state" && queryValue !== "authorize") {
              // 获取自定义参数
              let customQuery = queryValue.split("|");

              customQuery.forEach(queryItem => {
                let customName = queryItem.split("=")[0];
                let customValue = queryItem.split("=")[1];

                /**
                 * 这里根据自己的实际带参情况进行判断
                 */
                this.query[customName] = customValue;
              });
            } else if (queryName === "code") {
              // 获取微信授权后的code
              this.wx.code = queryValue;
            }
          } else {
            this.query[queryName] = queryValue;
          }
        });
      }
      // 判断是否已经微信授权
      if (WXAuthorize) {
        /**
         * 在授权成功后，将缓存中的授权成功记录清除
         * hasAuthorize：
         *              authorize：已授权
         *              没有该字段：未授权
         */
        window.localStorage.removeItem("hasAuthorize");
        /**
         * 通过code换取openid等信息
         * 授权成功，获取code值后的逻辑，根据自己的实际情况编写
         */
        // ...

        return false;
      } else {
        /**
         * 缓存记录页面初始（即授权前）路径
         * 主要用于解决在页面手动刷新时，微信授权问题
         */
        !window.localStorage.getItem("WXAuthorizeUrl") &&
          window.localStorage.setItem("WXAuthorizeUrl", window.location.href);
        // 缓存记录已授权
        window.localStorage.setItem("hasAuthorize", "authorize");
        // 处理重定向带参
        // for (let i in this.query) {
        //   if (redirectQuery) {
        //     redirectQuery += `|${i}=${this.query[i]}`;
        //   } else {
        //     redirectQuery += `${i}=${this.query[i]}`;
        //   }
        // }

        // 微信授权路径
        let WXAuthorizeUrl = window.localStorage.getItem("WXAuthorizeUrl");
        // 微信公众号 ID
        let appid = this.wx.wxAppId;
        // 授权后重定向的回调链接地址，请使用 urlEncode 对链接进行处理
        let redirectUri = encodeURIComponent(WXAuthorizeUrl);
        // 返回类型，请填写code
        let responseType = "code";
        /**
         * 应用授权作用域 snsapi_base、snsapi_userinfo
         * snsapi_base：不弹出授权页面，直接跳转，只能获取用户openid（静默授权）
         * snsapi_userinfo：弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息
         */
        let scope = "snsapi_userinfo";
        // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
        let state = redirectQuery || "authorize";
        // 授权路径
        let authorizeUrl =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          appid +
          "&redirect_uri=" +
          redirectUri +
          "&response_type=" +
          responseType +
          "&scope=" +
          scope +
          "&state=" +
          state +
          "&connect_redirect=1#wechat_redirect";
        // "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        // 进行授权操作，获取code信息(code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期)
        // window.location.href = authorizeUrl;

        router.beforeEach((to, from, next) => {
          /**
           * 缓存记录页面初始（即授权前）路径
           * 主要用于解决在页面手动刷新时，微信授权问题
           * hash模式：let href = window.location.origin + window.location.pathname + '#' + to.fullPath
           * location：let href = window.location.origin + window.location.pathname + to.fullPath
           */
          let href = window.location.origin + window.location.pathname;
          window.localStorage.setItem("WXAuthorizeUrl", href);
          // ...
          next();
        });
      }
    },
    getCode() {
      let code = this.getUrlParam("code"); //是否存在code
      //存在则通过code传向后台调用接口返回微信的个人信息
      this.getWXuser(code);
    },
    //判断code信息是否存在
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    getWXuser(code) {
      UserForWX({ code }).then(res => {
        if (res) {
          let data = {};
          data.NickName = res.NickName;
          data.UserId = res.UserId;
          data.headimgurl = res.headimgurl;
          sessionStorage.setItem("user", JSON.stringify(data));
          store.commit("Userdatas", res);
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "./main.less";
.router-view {
  width: 100%;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 0.5s;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
