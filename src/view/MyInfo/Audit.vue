<template>
  <div>
    <div class="auditBody">
      <x-icon type="ios-checkmark" class="icon-audit" size="150"></x-icon>
      <div class="audit-action">
        <div>
          <span class="aciton">6S</span>
          <span>内自动跳转到个人中心~</span>
        </div>
      </div>
      <div class="audit-tips">
        <div>您的实名认证正在审核中，请耐心等待~ </div>
        <div>审核时间：1~2个工作日内 </div>
        <div>(如特殊情况需加急处理请联系客服处理)</div>
      </div>
      <div class="audit-contact">
        <span><a href="javascipt:;" @click="contact">联系客服>></a></span>
      </div>
    </div>
    <div v-transfer-dom>
      <XDialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '10%', 'background-color': 'transparent'}" @click.native="showDialogStyle = false">
        <div class="contact-serivce">
          <XButton class="service-phone" plain type="primary" style="width: 80%;border-color: transparent">30012654</XButton>
        </div>
      </XDialog>
    </div>
  </div>
</template>

<script>
import { ITitle } from "@/components/Common";
import { TransferDom, XDialog, XButton } from "vux";
import { setTimeout } from "timers";
export default {
  directives: {
    TransferDom
  },
  components: {
    ITitle,
    XDialog,
    XButton
  },
  data() {
    return {
      showDialogStyle: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ path: "/MyInfo" });
    }, 3000);
  },
  methods: {
    contact() {
      this.showDialogStyle = true;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.auditBody {
  width: 80%;
  text-align: center;
  margin: 0 auto;
  margin-top: 5rem;
}
.icon-audit {
  fill: rgba(7, 185, 14, 1);
}
// .succeed {
//   background: rgba(7, 185, 14, 1);
//   box-shadow: 0px 9px 15px rgba(134, 235, 115, 0.43);
// }
.audit-action {
  font-size: 16px;
  font-family: @fontFamily;
  font-weight: 500;
  line-height: 24px;
  color: rgba(153, 153, 153, 1);
  margin: 20px auto;
}
.audit-action .aciton {
  color: rgba(255, 128, 0, 1);
}
.audit-tips {
  font-size: 16px;
  font-family: @fontFamily;
  font-weight: 500;
  line-height: 24px;
  color: rgba(102, 102, 102, 1);
  margin: 20px auto;
}
.audit-contact {
  font-size: 16px;
  font-family: @fontFamily;
  font-weight: 500;
  line-height: 24px;
  color: rgba(0, 150, 251, 1);
}
.audit-contact a {
  color: rgba(0, 150, 251, 1);
}
.contact-serivce {
}
.service-phone {
  width: 343px;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.9;
  border-radius: 5px;
  margin: 0 auto;
  font-size: 20px;
  font-family: @fontFamily;
  font-weight: 600;
  line-height: 44px;
  color: rgba(0, 150, 251, 1);
}
</style>
