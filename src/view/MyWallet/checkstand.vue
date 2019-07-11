<template>
  <div class="box-flex">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="content">
        <div class="need">
          <span>支付金额</span>
          <span>￥495.00</span>
        </div>
        <p class="title">您希望如何付款？</p>
        <p class="need-title">常用付款方式：</p>
        <ICheckstandType :paymentList="paymentList"></ICheckstandType>
        <p class="need-title">银联付款方式：</p>
        <ICheckstandType :paymentList="paymentList"></ICheckstandType>
      </div>
    </div>
    <div class="footer">
      <a @click="submit" class="nextStep">下一步</a>
    </div>
    <vpay-Password :vpayList="vpayList"></vpay-Password>
  </div>
</template>
<script>
import { ICheckstandType, vpayPassword } from "@/components/WalletInfo";
import { Header } from "@/components/Common";
export default {
  components: {
    ICheckstandType,
    vpayPassword,
    Header
  },
  data() {
    return {
      GOtitle: "结账",
      paymentList: [
        {
          text: "余额支付",
          icon: require("../../assets/cashier-1.png"),
          money: 20
        },
        {
          text: "余额支付",
          icon: require("../../assets/cashier-1.png"),
          money: 20
        }
      ],
      PaymentPassword: {
        classShow: false,
        id: 1
      },
      vpayList: {
        show: true
      }
    };
  },
  mounted() {},
  methods: {
    goReturn() {
      this.$router.go(-1);
    },
    submit() {
      console.log(111);
      this.vpayList.show = !this.vpayList.show;
      //       this.$vux.confirm.show({
      //         // 组件除show外的属性
      //         title: "提醒",
      //         hideOnBlur: true,
      //         showCancelButton: true,
      //         confirmText: "去充值",
      //         content: `<p style="font-size:16px">保证金余额不足，请去充值，或更换
      // 其它支付方式。</p>`,
      //         onConfirm: () => {
      //           this.PaymentPassword.classShow = !this.PaymentPassword.classShow;
      //         },
      //         onCancel: () => {
      //           this.$router.push({ path: "/" });
      //         }
      //       });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  text-align: left;
  position: fixed;
  top: 3.14rem;
  left: 0;
  bottom: 5.14rem;
  width: 100%;
  overflow: auto;
  .content {
    margin: 1.8rem;
    .need {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #bbb;
      padding-bottom: 1.5rem;
      span {
        font-size: 1.6rem;
        color: #000;
        font-weight: 500;
      }
    }
    .title {
      font-size: 1.6rem;
      color: #000;
      font-weight: 500;
      margin-top: 1.5rem;
    }
    .need-title {
      font-size: 1.3rem;
      color: #000;
      font-weight: 500;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
  }
}
.gore {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 750px;
  z-index: 998;
}
</style>
