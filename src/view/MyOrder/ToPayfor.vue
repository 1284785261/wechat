<template>
  <div class="pay-box">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="toPay-box">
        <div v-for="(item,index) in PayforList" class="toPayfor-box" :key="index">
          <a :class="item.isShow?'items-selected':'items'" @click="onItemClick(item,index)"></a>
          <div class="information">
            <p class="numvber">{{item.payDate}}</p>
            <p class="invoicedate">{{item.feeName}}: ￥{{item.totalFee}}</p>
          </div>
        </div>
        <div class="toPay-footer">
          <div @click="allShows">
            <check-icon :value.sync="allShow" type="plain" class="checklist-icon-active-color"></check-icon>
            <span style="font-weight:600;">全选</span>
          </div>
          <span class="combined">合计: ￥{{TotelMoney}}</span>
        </div>

      </div>
    </div>
    <div class="footer">
      <button class="nextStep" @click="gotoPay" :disabled="isDisabled" :class="isDisabled?'':'selcets'">去支付</button>
    </div>

  </div>
</template>
<script>
import { Header } from "@/components/Common";
import { Scroller, Spinner, CheckIcon } from "vux";
export default {
  components: {
    Header,
    CheckIcon
  },
  data() {
    return {
      GOtitle: "待支付",
      PayforList: [],
      isShows: true,
      allShow: true,
      isDisabled: true,
      TotelMoney: 0
    };
  },
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params.paylist) {
      this.PayforList = this.$route.params.paylist;
      for (let i = 0; i < this.PayforList.length; i++) {
        this.$set(this.PayforList[i], "isShow", true);
        this.TotelMoney += this.PayforList[i].totalFee;
        this.isDisabled = false;
      }
    }
  },
  methods: {
    allShows() {
      if (this.allShow) {
        for (let i = 0; i < this.PayforList.length; i++) {
          this.$set(this.PayforList[i], "isShow", true);
          this.isDisabled = false;
        }
      } else {
        for (let i = 0; i < this.PayforList.length; i++) {
          this.$set(this.PayforList[i], "isShow", false);
          this.isDisabled = true;
        }
      }
    },
    onItemClick(item, index) {
      this.TotelMoney = 0;
      this.$set(
        this.PayforList[index],
        "isShow",
        !this.PayforList[index].isShow
      );
      let flag = true;
      //判断是否全部单选选中
      for (let i = 0; i < this.PayforList.length; i++) {
        if (this.PayforList[i].isShow != this.isShows) {
          flag = false;
          break;
        }
      }
      //计算价钱
      for (let i = 0; i < this.PayforList.length; i++) {
        if (this.PayforList[i].isShow) {
          this.TotelMoney += this.PayforList[i].totalFee;
        }
      }

      if (this.PayforList.length) {
        this.allShow = flag;
      } else {
        this.allShow = false;
      }
    },
    gotoPay() {
      console.log(1);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.pay-box {
  background: #eee;
  height: 100%;
}
.content-box {
  overflow: hidden;
  margin-top: 3.14rem;
  .toPay-box {
    .toPayfor-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #fff;
      margin: 10px 0;
      .slecets {
        margin: 0 1.1rem;
        line-height: 5rem;
        .checklist-icon-active-color {
          /deep/ .weui-icon-circle {
            font-size: 32px;
          }
          /deep/ .weui_icon_success_circle {
            color: #0a65bf;
            font-size: 32px;
          }
          /deep/ .weui_icon_success_circle::before {
            color: #0a65bf;
          }
        }
      }
      .information {
        p {
          line-height: 2rem;
          font-size: 1rem;
          color: #000;
        }
      }
    }
    .toPay-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        /deep/ .vux-check-icon {
          margin: 0.8rem 1rem;
          margin-right: 0;
        }
        .checklist-icon-active-color {
          /deep/ .weui-icon-circle {
          }
          /deep/ .weui_icon_success_circle {
            color: #0a65bf;
          }
          /deep/ .weui_icon_success_circle::before {
            color: #0a65bf;
          }
        }
        span {
          color: #000;
          vertical-align: sub;
        }
      }
      .combined {
        margin-right: 1.5rem;
        font-size: @menuFontSzie;
        color: #000;
      }
    }
  }
}
.footer {
  .nextStep {
    background: #bcbcbc;
    color: #fff;
  }
  .selcets {
    background: #0562be;
    color: #fff;
  }
}
</style>
