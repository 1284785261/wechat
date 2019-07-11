<template>
  <div>
    <IWalletHead Info></IWalletHead>
    <div class="opts-box">
      <div class="title tips">最近两笔</div>
      <div class="change-box">
        <div class="chang-item">
          <IBilitem></IBilitem>
        </div>
      </div>
      <div class="tips">说明：海带丝符合维护费说课稿一个改过是古人说水</div>
      <div class="btn-box">
        <XButton link="FillMoney">充值</XButton>
        <XButton plain link="cashWithdrawals" class="withdrawal">提现</XButton>
      </div>
    </div>
  </div>
</template>

<script>
import { TransferDom, XButton } from "vux";
import { IWalletHead, IBilitem } from "@/components/WalletInfo";
import { IGroup, ICell, ITabbar } from "@/components/Common";
import { GetWallet } from "@/api/common/wallat";
import store from "@/store";
export default {
  name: "Wallet",
  directives: {
    TransferDom
  },
  components: {
    XButton,
    IBilitem,
    IWalletHead
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style scoped lang="less">
@import "../../main.less";
.opts-box {
  padding: 0.5rem 1rem;
}
.change-box {
  margin: 0.5rem 0;
}
.chang-item {
  background: #fff;
  box-shadow: 0rem 0rem 1rem rgba(153, 187, 228, 0.16);
  margin: 0.5rem 0;
}
.title.tips {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(102, 102, 102, 1);
  text-align: left;
}
.tips {
  display: block;
  text-align: center;
  font-size: 0.8rem;
  color: rgba(153, 153, 153, 1);
  margin: 0.8rem;
}
.withdrawal {
  border: 1px solid #707070;
}
</style>
