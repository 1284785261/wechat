<template>
  <div>
    <IWalletHead></IWalletHead>
    <div class="opts-box">
      <div class="input-box">
        <IMoneyInput></IMoneyInput>
      </div>
      <div>
        <Payment-Account></Payment-Account>
      </div>
      <div class="tips">说明：每月最多提现三次</div>
      <div class="btn-box">
        <XButton @click.native="confirm">确认提现</XButton>
      </div>
    </div>
  </div>
</template>

<script>
import { TransferDom, XButton } from "vux";
import {
  IWalletHead,
  IMoneyInput,
  PaymentAccount
} from "@/components/WalletInfo";
import { IGroup, ICell, ITabbar } from "@/components/Common";
export default {
  name: "Wallet",
  directives: {
    TransferDom
  },
  components: {
    XButton,
    IMoneyInput,
    IWalletHead,
    PaymentAccount
  },
  data() {
    return {};
  },
  methods: {
    confirm() {
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: "提醒",
        hideOnBlur: true,
        showCancelButton: false,
        content: `<p style="font-size:16px">提现申请发起成功，银行正在处理中！!</p>`,
        onConfirm: () => {
          this.$router.push({ path: "/withdrawalSubsidiary" });
        }
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang="less">
@import "../../main.less";
.opts-box {
  padding: 0.5rem 1rem;
  margin-top: -4rem;
}
.input-box {
  margin: 0 0;
  background: #fff;
  box-shadow: 0.3rem 0.3rem 1rem 0.3rem rgba(14, 71, 136, 0.16);
  border-radius: 0.5rem;
  overflow: hidden;
}
.tips {
  display: block;
  font-size: 0.8rem;
  color: rgba(153, 153, 153, 1);
  margin: 0.8rem;
}
</style>
