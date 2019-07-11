<template>
  <div class="Success-box">
    <div class="content-box">
      <div class="titels-header">
        <x-icon type="ios-checkmark" class="icon-success-color" size="150"></x-icon>
        <p>订单提交成功</p>
      </div>
      <div class="warehouse-receipt">
        <p class="title">打印入仓单</p>
        <div class="title-box">
          <img :src="datas.ImgBase64">
          <p>{{datas.Address}}</p>
        </div>
        <p class="prompt"><span>*</span>
          请将打印的入仓单贴在包裹上跟随包裹一同发送至
          我司仓库!
        </p>
        <div class="buttons">
          <a :href="hrefs">下载入仓单</a>
          <!-- <a @click="openShare">分享</a> -->
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <Order-Share :shares="shares"></Order-Share>
    </div>
  </div>
</template>
<script>
import { XInput, XButton, TransferDom } from "vux";
import OrderShare from "@/components/Public/OrderShare.vue";
import { GetPlaceOrderResult } from "@/api/common/PlaceOrder";
import wxapi from "@/libs/wxapi.js";
export default {
  directives: {
    TransferDom
  },
  components: {
    OrderShare
  },
  data() {
    return {
      shares: {
        classShow: false
      },
      datas: {},
      hrefs: "http://192.168.50.222:7500/OrderOnline/api/Order/GetPDFFile"
    };
  },
  mounted() {
    wxapi.wxRegister(this.wxRegister);
    if (this.$route.query.Numbers) {
      this.GetPlaceOrder(this.$route.query.Numbers);
      this.hrefs += "?number=" + this.$route.query.Numbers;
    }
  },
  methods: {
    wxRegister() {
      // this.shareTimelineWX();
      // this.shareTimelineQQ();
    },
    shareTimelineWX() {
      alert(window.location.href.split("#")[0]);
      //微信分享给朋友/朋友圈;
      let option = {
        title: "IPS智慧包裹入仓单1111",
        link: window.location.href.split("#")[0],
        // link:
        //   "http://192.168.50.222:7500/OrderOnline/api/Order/GetPDFFile?number" +
        //   this.$route.query.Numbers,
        imgUrl: "../../assets/757.png",
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("取消分享");
        }
      };
      wxapi.AppMessageShareData(option);
    },
    shareTimelineQQ() {
      //微信分享给QQ/QQ空间;
      let option = {
        title: "IPS智慧包裹入仓单",
        desc: "IPS智慧包裹入仓单",
        link: window.location.href.split("#")[0],
        imgUrl: "../../assets/757.png",
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("取消分享");
        }
      };
      wxapi.TimelineShareData(option);
    },
    GetPlaceOrder(number) {
      GetPlaceOrderResult(number).then(res => {
        if (res) {
          this.datas = res;
        }
      });
    },
    openShare() {
      this.shares.classShow = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.Success-box {
  position: absolute;
  width: 100%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}
.content-box {
  .titels-header {
    text-align: center;
    position: relative;
    overflow: hidden;
    min-height: 258px;
    border-bottom: 20px solid #f4f4f4;
    p {
      font-size: @menuFontSzie;
      color: #0562be;
      margin-top: 45%;
    }
    .icon-success-color {
      display: block;
      fill: #07b90e;
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -50%);
    }
  }
  .warehouse-receipt {
    .title {
      color: #000;
      font-size: 1.1rem;
      margin: 1rem;
    }
    .title-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #bbb;
      margin: 1rem;
      img {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      p {
        font-size: 1rem;
        color: #000;
        margin-bottom: 3rem;
      }
    }
    .prompt {
      font-size: 1rem;
      color: #888888;
      margin: 2rem 1rem;
      text-align: center;
      span {
        color: #ff0000;
      }
    }
    .buttons {
      text-align: right;
      margin: 1rem;
      a {
        width: 6rem;
        height: 2rem;
        display: inline-block;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 1rem;
        text-align: center;
        line-height: 2rem;
        color: #0562be;
        border: 1px solid #0562be;
        margin: 1rem 0.5rem;
      }
    }
  }
}
</style>
