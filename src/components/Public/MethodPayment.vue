<template>
  <div>
    <div @click="colosmasks" class="mask" :class="maskList.classShow?'mask2':''">
    </div>
    <div class="parametersModel" :class="maskList.classShow?'parametersModel2':''">
      <div class="buttonstyle">
        <a @click="colosmasks">取消</a>
        <a @click="paymentFrom">确定</a>
      </div>
      <div class="serviceListStyle">
        <div v-for="(item,index) in paymentList" :key="item.payTypeName" :class="{selectShow:index == isAr}" @click="selectpayment(index)">{{item.payTypeName}}</div>
      </div>
      <p class="title"><span>*</span>需要添加备注提示信息，在此处添加</p>
    </div>
  </div>
</template>
<script>
import { stop, move } from "@/libs/util";
import { GetPayTypes } from "@/api/common/PlaceOrder";
export default {
  name: "MethodPayment",
  props: ["maskList"],
  data() {
    return {
      //   maskShow: true
      paymentList: [],
      isAr: 0
    };
  },
  mounted() {
    this.getpay();
  },
  methods: {
    getpay() {
      GetPayTypes().then(res => {
        if (res && res.length > 0) {
          this.paymentList = res;
        }
      });
    },
    colosmasks() {
      this.maskList.classShow = false;
      move();
    },
    paymentFrom() {
      this.$emit("paymentList", this.paymentList[this.isAr]);
      this.maskList.classShow = false;
    },
    selectpayment(index) {
      this.isAr = index;
    }
  },
  watch: {
    "maskList.isAr"() {
      this.isAr = this.maskList.isAr;
    }
  }
};
</script>
<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #666;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}
.mask2 {
  opacity: 0.5;
  z-index: 500;
  filter: alpha(opacity=50);
}
.parametersModel {
  position: fixed;
  bottom: -12rem;
  left: 0;
  width: 100%;
  height: 12rem;
  z-index: -1;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: bottom 300ms;
  .buttonstyle {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    a {
      color: #2c7ac7;
      font-size: 0.8rem;
      padding: 20px;
    }
  }
  .serviceListStyle {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
    div {
      width: 7rem;
      height: 2.14rem;
      text-align: center;
      color: #999999;
      font-size: 1rem;
      line-height: 2.14rem;
      border: 1px solid #bbbbbb;
      margin: 0.71rem;
      box-sizing: border-box;
      transition: all 500ms;
    }
    .selectShow {
      border: 1px solid #2c7ac7;
      background: #2c7ac7;
      color: #ffffff;
    }
  }
  .title {
    color: #999999;
    font-size: 0.71rem;
    margin-left: 0.71rem;
    margin-top: 0.57rem;
    span {
      color: #ff0000;
    }
  }
}
.parametersModel2 {
  bottom: -1rem;
  z-index: 501;
}
</style>

