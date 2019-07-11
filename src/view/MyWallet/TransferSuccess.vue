<template>
  <div>
    <div>
      <a class="complete" @click="complete">完成</a>
    </div>
    <div class="content-box">
      <x-icon type="ios-checkmark" class="icon-success-color" size="150"></x-icon>
      <p>交易成功</p>
      <a @click="openOrder">查看订单>></a>
    </div>
    <div class="datas">
      <p>线下转账信息</p>
      <ul>
        <li><span>户名</span>11</li>
        <li><span>账号</span>11</li>
        <li><span>开户行</span>11</li>
        <li><span>联行号</span>11</li>
        <li><span>汇付识别码</span>11</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { XInput, XButton, PopupPicker } from "vux";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goReturn() {
      this.$router.go(-1);
    },
    complete() {
      this.$router.push({ path: "/FillMoney" });
    },
    openOrder() {
      this.$router.push({ path: "/MyOrderManage" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
div {
  width: 100%;
  text-align: right;
  .complete {
    font-size: 1.4rem;
    color: #000;
    line-height: 3.6rem;
    margin-right: 1.5rem;
    display: inline-block;
  }
}

.content-box {
  text-align: center;
  height: calc(100% - 50px);
  p {
    font-size: @menuFontSzie;
    color: #666;
    margin-top: 1.5rem;
  }
  a {
    color: #0562be;
    font-size: @menuFontSzie;
    margin-top: 1.5rem;
    display: inline-block;
  }
  .icon-success-color {
    display: block;
    fill: #07b90e;
    margin-left: 50%;

    margin-top: 10%;
    transform: translate(-50%, 0);
  }
}
.datas {
  width: auto;
  text-align: left;
  margin: 2rem;
  p {
    font-size: @menuFontSzie;
    color: #000;
    border-bottom: 1px solid #bbb;
    line-height: 3rem;
  }
  ul {
    margin-top: 1.5rem;
    li {
      width: 100%;
      line-height: 1.8rem;
      font-size: 1rem;
      color: #000;
      span {
        width: 6rem;
        display: inline-block;
        font-size: 1rem;
        color: #999;
      }
    }
  }
}
</style>
