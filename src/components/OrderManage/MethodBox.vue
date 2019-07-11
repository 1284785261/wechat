<template>
  <div>
    <div @click="colosmasks" class="mask" :class="method.classShow?'mask2':''">
    </div>
    <div class="title-box" :class="method.classShow?'parametersModel2':''">
      <div class="title">
        <p>请选择支付方式</p>
        <x-icon type="ios-close-empty" class="icons" size="36" @click="colosmasks"></x-icon>
      </div>
      <div v-for="(item,index) in methodList" :key="index" class="methodList">
        <div>
          <p>{{item.payTypeName}}</p>
          <span v-if="item.title">{{item.title}}</span>
        </div>
        <a :class="method.index == index?'items-selected':'items'" @click="onItemClick(index)"></a>
      </div>
      <a class="comiuts" @click="determine">确定</a>
    </div>
  </div>
</template>
<script>
import { XButton } from "vux";
import { stop, move } from "@/libs/util";
import { GetPayTypes } from "@/api/common/PlaceOrder";
export default {
  name: "MethodBox",
  components: {
    XButton
  },
  props: ["method"],
  data() {
    return {
      methodList: [],
      select: {
        selectIndex: 0
      }
    };
  },
  mounted() {
    this.getpay();
    console.log(this.method);
    // if (this.method.index == 0) {
    //   this.select.selectIndex = 0;
    // }
    // if (this.method.index == 1) {
    //   this.select.selectIndex = 1;
    // }
    // if (this.method.index == 2) {
    //   this.select.selectIndex = 2;
    // }
    // this.$set(this.select, "selectIndex", this.method.index);
  },
  methods: {
    getpay() {
      GetPayTypes().then(res => {
        if (res && res.length > 0) {
          this.methodList = res;
          for (let i = 0; i < this.methodList.length; i++) {
            if (this.methodList[i].payTypeCode == "GSZZ") {
              this.methodList[i].title =
                "仅支持使用企业网银进行支付,请于xx时间之内联系我司财务进行核算！";
            } else {
              this.methodList[i].title = "";
            }
          }
        }
      });
    },
    colosmasks() {
      this.method.classShow = false;
    },
    onItemClick(index) {
      this.select.selectIndex = index;
      this.method.index = index;
    },
    determine() {
      this.$emit("SetPay", this.methodList[this.select.selectIndex]);
      this.method.classShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #666;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
}
.mask2 {
  opacity: 0.5;
  z-index: 500;
  filter: alpha(opacity=50);
}
.title-box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  opacity: 0;
  transform: translate(-50%, -50%);
  min-height: 12rem;
  max-height: 90%;
  background: #fff;
  border-radius: 10px;
  transition: opacity 300ms;
  z-index: -1;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    p {
      font-size: 1.2rem;
      color: #000;
      font-weight: 500;
    }
    .icons {
      fill: #2c7ac7;
    }
  }
  .methodList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 1rem;
    min-height: 4rem;
    div {
      p {
        font-size: 1.1rem;
        color: #000;
      }
      span {
        display: inline-block;
        max-width: 17rem;
        font-size: 0.9rem;
      }
    }
    .items {
      margin-right: 0;
    }
    .items-selected {
      margin-right: 0;
    }
  }
  .comiuts {
    width: 60%;
    margin-left: 50%;
    transform: translate(-50%, 0);
    background: #2c7ac7;
  }
}
.parametersModel2 {
  opacity: 1;
  z-index: 501;
}
</style>

