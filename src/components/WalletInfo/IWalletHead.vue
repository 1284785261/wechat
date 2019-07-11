<template>
  <div class="wallet-box" :class="_otherMoney">
    <div class="title" @click="$router.go(-1)">
      <div>
        <x-icon type="ios-arrow-left" size="25"></x-icon>
      </div>
      <div>{{_header.backText}}</div>
    </div>
    <div class="wallet-log">
      <div class="icon-log" @click="toLog" v-show="Info"></div>
    </div>
    <div class="wallet-money-box">
      <div class="money">
        <countup :end-val="TotalAmount" :duration="1.3" :decimals="2" :start-val="startVal"></countup>
      </div>
      <div class="tips">账户总额(元)</div>
    </div>
    <div class="other-money" v-show="Info">
      <div class="money-left-box">
        <div class="money-val">
          <countup :end-val="FreezingAmount" :duration="1.5" :decimals="2" :start-val="startVal"></countup>
        </div>
        <div class="tips">冻结余额</div>
      </div>
      <div class="money-right-box">
        <div class="money-val">
          <countup :end-val="accountBalance" :duration="1.5" :decimals="2" :start-val="startVal"></countup>
        </div>
        <div class="tips">可用余额</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Countup } from "vux";
import { GetWallet } from "@/api/common/wallat";
import store from "@/store";
import { Moneys } from "../../libs/comms";
export default {
  name: "IWalletHead",
  props: {
    opts: {
      type: Object,
      default: () => {
        return {};
      }
    },
    Title: {
      type: String,
      default: "我的钱包"
    },
    Info: {
      type: Boolean,
      default: false
    },
    Moneys: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    Countup
  },
  data() {
    return {
      startVal: 0,
      FreezingAmount: 0,
      TotalAmount: 0,
      accountBalance: 0
    };
  },
  mounted() {
    if (store.state.app.UserData) {
      this.getMoney(store.state.app.UserData.userId);
    }
    this.getMoney(1);
    //
  },
  methods: {
    toLog() {
      this.$router.push({ path: "/BillingRecords" });
    },
    getMoney(id) {
      GetWallet(id).then(res => {
        if (res) {
          console.log(res);
          this.FreezingAmount = parseInt(Moneys(res.FreezingAmount));
          this.TotalAmount = parseInt(Moneys(res.TotalAmount));
          this.Balance = parseInt(Moneys(res.Balance));
        }
      });
    }
  },
  computed: {
    _header() {
      return {
        backText: this.Title
      };
    },
    _otherMoney() {
      return !this.Info ? ["other-money-info"] : [""];
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.wallet-box {
  .bg-img("Wallet/icon-1@2x");
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 0.5rem 1rem 0.5rem;
  background-size: cover;
}
.title {
  height: 2rem;
  line-height: 1.5rem;
  display: flex;
}
.wallet-log {
  height: 2rem;
  display: flex;
  justify-content: flex-end;
}
.icon-log {
  width: 1.5rem;
  .bg-img("Wallet/icon-2@2x");
  background-size: contain;
}
.wallet-money-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.money {
  font-size: 3rem;
  line-height: 3.5rem;
}
.tips {
  font-size: 1rem;
}
.other-money {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 2.3rem 1.5rem 1rem;
}
.money-val {
  font-size: 1.5rem;
  line-height: 1.5rem;
}
.other-money .tips {
  font-size: 0.9rem;
}
.other-money-info {
  padding-bottom: 5rem;
}

.vux-x-icon {
  fill: #fff;
}
</style>
