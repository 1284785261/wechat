<template>
  <div class="checkstand-box">
    <div class="info" v-for="(item,index) in paymentList" :key="index" :class="Index == index?'selectClass':''" @click="select(index)">
      <div class="stand-icon">
        <img :src="item.icon" />
      </div>
      <div class="stand-info">
        <div class="text-info">{{item.text}}</div>
        <div class="money-info">{{item.money}}</div>
      </div>
    </div>
  </div>
</template>

<script>
/*
* 中国建设银行——CCB

  中国农业银行——ABC

  中国工商银行——ICBC

  中国银行——BOC

  中国民生银行 ——CMBC

  招商银行 ——CMB

  兴业银行 ——CIB

  北京银行——BOB

  交通银行——BCM

  中国光大银行——CEB

  广东发展银行——GDB

  上海浦东发展银行——SPDB/SPDBank

  深圳发展银行——SDB
*/
const type = ["balance", "wechat", "CMB", "BOC", "CCB", "ICBC"];
export default {
  name: "ICheckstandType",
  // props: {
  //   opts: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         text: "",
  //         icon: "",
  //         money: 0
  //       };
  //     }
  //   }
  // },
  props: ["paymentList"],
  data() {
    return {
      startVal: 0,
      Index: ""
    };
  },
  mounted() {
    console.log(this.paymentList);
  },
  methods: {
    toLog() {},
    select(index) {
      console.log(1);
      this.Index = index;
    }
  },
  computed: {
    _status() {
      return status[this.opts.status];
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";

.checkstand-box {
  .info {
    width: 100%;
    height: 5rem;
    border: 1px solid #707070;
    overflow: hidden;
    margin-bottom: 1.5rem;
    box-shadow: 0px 0px 10px #fff;
    .stand-icon {
      width: 3rem;
      height: 3rem;
      margin: 1rem;
      float: left;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
    .stand-info {
      display: flex;
      justify-content: space-between;
      align-content: center;
      .text-info {
        font-size: 1.4rem;
        color: #000;
        line-height: 5rem;
      }
      .money-info {
        line-height: 5rem;
        font-size: 1.4rem;
        color: #000;
        margin-right: 1rem;
      }
    }
  }
  .selectClass {
    border: 1px solid #0a6bfc;
    box-shadow: 0px 0px 10px #0a6bfc;
  }
}
</style>
 