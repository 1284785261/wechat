<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <x-icon type="ios-checkmark" class="icon-success-color" size="150"></x-icon>
      <p>提交成功</p>
    </div>

    <router-link class="button-1" to="applyInvoice">继续申请</router-link>
    <router-link class="button-2" to="InvoiceHistory">开票历史</router-link>
  </div>
</template>
<script>
import { Header } from "@/components/Common";
import { XInput, XButton, PopupPicker } from "vux";
export default {
  components: {
    Header
  },
  data() {
    return {
      GOtitle: "申请发票"
    };
  },
  mounted() {},
  methods: {
    goReturn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  margin-top: 3.14rem;
  text-align: center;
  height: calc(100% - 50px);
  p {
    font-size: @menuFontSzie;
    color: #666;
  }
  .icon-success-color {
    display: block;
    fill: #07b90e;
    margin-left: 50%;

    margin-top: 50%;
    transform: translate(-50%, 0);
  }
}
.button-1 {
  margin-top: 5.57rem;
  width: 80%;
  height: 3rem;
  display: inline-block;
  background-color: #0562be;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: @menuFontSzie;
  text-align: center;
  line-height: 3rem;
  color: #fff;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
.button-2 {
  margin-top: 1rem;
  width: 80%;
  height: 3rem;
  display: inline-block;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #bbb;
  font-size: @menuFontSzie;
  text-align: center;
  line-height: 3rem;
  color: #bbb;
  margin-left: 50%;
  font-weight: 500;
  transform: translate(-50%, 0);
}
</style>
