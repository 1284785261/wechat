<template>
  <div>
    <card>
      <div slot="content" class="card-flex card-wallet">
        <div class="vux-1px-r">
          <span>{{blockedBalances}}</span>
          <br />
          <div class="txt">冻结余额</div>
        </div>
        <div class="vux-1px-r">
          <span>{{accountBalance}}</span>
          <br />
          <div class="txt">个人余额</div>
        </div>
        <div>
          <span>{{TotalAmount}}</span>
          <br />
          <div class="txt">账户总额</div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { Card } from "vux";
import { GetWallet } from "@/api/common/wallat";
import { Moneys } from "../../libs/comms";
import store from "@/store";
export default {
  components: {
    Card
  },
  name: "Wallet",
  props: ["User"],
  data() {
    return {
      blockedBalances: "",
      TotalAmount: "",
      accountBalance: ""
    };
  },
  mounted() {
    if (this.User.UserId) {
      this.getMoney(this.User.UserId);
    }
    this.getMoney(1);
  },
  // filters() {
  //   Money(Amount);
  // },
  methods: {
    getMoney(id) {
      GetWallet(id)
        .then(res => {
          if (res) {
            this.blockedBalances = Moneys(res.FreezingAmount);
            this.TotalAmount = Moneys(res.TotalAmount);
            this.accountBalance = Moneys(res.Balance);
            store.commit("walletId", res.Id);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.card-flex {
  display: flex;
}
.card-wallet {
}
.card-padding {
  padding: 15px;
}
.card-flex > div {
  text-align: center;
  padding: 10px 0;
  flex: 1;
  font-size: @titleFontSize;
}
.card-flex span {
  text-align: center;
  color: @color;
  font-weight: 400;
  font-size: @titleFontSize;
}
.card-flex .txt {
  font-size: 11px;
}
.weui-panel {
  background: transparent;
}
.vux-1px-r::after {
  border-right: 2px solid #fff;
  color: #fff;
}
</style>
