<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="titie">
        <p class="success" v-if="WalletDate.MoneyChangType == 1">
          <x-icon type="ios-checkmark" class="icon-success-color" size="28"></x-icon>提现成功
        </p>
        <p class="success" v-if="WalletDate.MoneyChangType == 0">
          <x-icon type="ios-checkmark" class="icon-success-color" size="28"></x-icon>充值成功
        </p>
        <p class="price">
          <a v-if="WalletDate.MoneyChangType == 1">+￥{{WalletDate.ChangeMoney | money}}</a>
          <a v-if="WalletDate.MoneyChangType == 0">-￥{{WalletDate.ChangeMoney | money}}</a>
        </p>
        <span>余额￥{{WalletDate.Note}}</span>
      </div>
      <div class="information">
        <IGroup>
          <ICell title="当前状态">
            <div slot="right" class="input-box" v-if="WalletDate.MoneyChangType == 1">
              <span>{{WalletDate.Status | Status1}}</span>
            </div>
            <div slot="right" class="input-box" v-if="WalletDate.MoneyChangType == 0">
              <span>{{WalletDate.Status | Status2}}</span>
            </div>
          </ICell>
          <ICell title="支付方式">
            <div slot="right" class="input-box">
              <span>{{WalletDate.PayTypeAccount}}</span>
            </div>
          </ICell>
          <ICell title="交易时间">
            <div slot="right" class="input-box">
              <span>{{WalletDate.StatusTime}}</span>
            </div>
          </ICell>
        </IGroup>
      </div>
    </div>

  </div>
</template>
<script>
import { Header, IGroup, ICell } from "@/components/Common";
import { GetWalletBillDetail } from "@/api/common/wallat";
import { Moneys } from "../../libs/comms";
export default {
  components: {
    IGroup,
    ICell,
    Header
  },
  data() {
    return {
      GOtitle: "账单明细",
      WalletDate: {}
    };
  },
  filters: {
    Status1(val) {
      if (val == "10") {
        return "正在提现";
      } else if (val == "20") {
        return "已提现";
      } else if (val == "30") {
        return "提现失败";
      }
    },
    Status2(val) {
      if (val == "10") {
        return "正在充值";
      } else if (val == "20") {
        return "已充值";
      } else if (val == "30") {
        return "充值失败";
      }
    },
    time(val) {
      return val.substring(5, 16);
    },
    money(val) {
      return Moneys(val);
    }
  },
  mounted() {
    if (this.$route.query.Id) {
      this.GetWallet(this.$route.query.Id);
    }
  },
  methods: {
    GetWallet(id) {
      GetWalletBillDetail(id).then(res => {
        console.log(res);
        if (res) {
          this.WalletDate = res;
        }
      });
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
  overflow: hidden;
  .titie {
    .success {
      font-size: @menuFontSzie;
      color: #333;
      margin: 3rem 0 1rem 0;
      .icon-success-color {
        display: inline-block;
        fill: #07b90e;
        vertical-align: bottom;
      }
    }
    .price {
      font-size: 2.5rem;
      color: #000;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    span {
      color: #999;
      font-size: 1rem;
      display: inline-block;
      margin-bottom: 2rem;
    }
  }
  .information {
    .group {
      box-shadow: none;
      border-top: 1px solid #ccc;
      /deep/ .cell {
        border: none;
        display: flex;
        justify-content: space-between;
        .left {
          font-size: 1rem;
          color: #000;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
