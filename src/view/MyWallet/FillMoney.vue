<template>
  <div>
    <IWalletHead></IWalletHead>
    <div class="opts-box">
      <div class="input-box">
        <IMoneyInput></IMoneyInput>
      </div>
      <div class="tips">说明：每月最多提现三次</div>
      <div class="btn-box">
        <XButton link="checkstand">充值</XButton>
      </div>
    </div>
  </div>
</template>

<script>
import { TransferDom, XButton } from "vux";
import { IWalletHead, IMoneyInput } from "@/components/WalletInfo";
import { IGroup, ICell, ITabbar } from "@/components/Common";
export default {
  name: "Wallet",
  directives: {
    TransferDom
  },
  components: {
    XButton,
    IMoneyInput,
    IWalletHead
  },
  data() {
    return {};
  },
  methods: {},
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
