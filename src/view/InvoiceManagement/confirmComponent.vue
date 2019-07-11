<template>
  <div>
    <div @click="colosmasks" class="mask" :class="confirmData.confirmShow?'mask2':''">
    </div>
    <div class="parametersModel" :class="confirmData.confirmShow?'parametersModel2':''">
      <x-icon type="ios-close-empty" size="46" @click="colosmasks"></x-icon>
      <IGroup :groupClass="groupClass" class="Confirminformation">
        <ICell title="发票类型">
          <div slot="right" class="input-box">
            电子发票
          </div>
        </ICell>
        <ICell title="发票抬头">
          <div slot="right" class="input-box">
            {{this.confirmData.Data.invoiceHead}}
          </div>
        </ICell>
        <ICell title="公司税号" v-if="this.confirmData.Data.invoiceContent">
          <div slot="right" class="input-box">
            {{this.confirmData.Data.invoiceContent}}
          </div>
        </ICell>
        <ICell title="电子邮箱">
          <div slot="right" class="input-box">
            {{this.confirmData.Data.cEmail}}
          </div>
        </ICell>
        <ICell title="企业地址" v-if="this.confirmData.Data.registPlaceAddress">
          <div slot="right" class="input-box">
            {{this.confirmData.Data.registPlaceAddress}}
          </div>
        </ICell>
        <ICell title="企业电话" v-if="this.confirmData.Data.registPlaceTel">
          <div slot="right" class="input-box">
            {{this.confirmData.Data.registPlaceTel}}
          </div>
        </ICell>
        <ICell title="开户行" v-if="this.confirmData.Data.openAccountBank">
          <div slot="right" class="input-box">
            {{this.confirmData.Data.openAccountBank}}
          </div>
        </ICell>
        <ICell title="开户行账号" v-if="this.confirmData.Data.openAccount">
          <div slot="right" class="input-box">
            {{this.confirmData.Data.openAccount}}
          </div>
        </ICell>
        <p class="title">请确认信息无误，电子发票将在系统开具后发送至您的邮箱， 请注意查收</p>
        <a class="nextStep" @click="confroms">确认提交</a>
      </IGroup>
    </div>
  </div>
</template>
<script>
import { IGroup, ICell } from "@/components/Common";
import { stop, move } from "@/libs/util";
import { AddInvoiceFromOrder } from "@/api/common/Invoices";
import { setTimeout } from "timers";
export default {
  name: "confirmComponent",
  props: ["confirmData"],
  components: {
    IGroup,
    ICell
  },
  data() {
    return {
      //   maskShow: true
    };
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  mounted() {},
  methods: {
    colosmasks() {
      this.confirmData.confirmShow = false;
      move();
    },
    goReturn() {
      this.$router.go(-1);
    },
    confroms() {
      let that = this;
      let arr = JSON.parse(this.confirmData.OrderIds);
      if (this.confirmData.Data) {
        for (let i = 0; i < arr.length; i++) {
          setTimeout(() => {
            that.confirmData.Data.orderId = arr[i];
            that.AddInvoice(that.confirmData.Data);
          }, i);
        }
      }
    },
    AddInvoice(data) {
      AddInvoiceFromOrder(data).then(res => {
        if (res) {
          this.$router.push({ path: "/completes" });
        } else {
          this.$vux.toast.show({
            type: "text",
            text: "开具发票失败，请联系管理员"
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.addrss-parse-box,
.addrssFrom {
  box-shadow: none;
  border-radius: 0rem;
}
.addrss-parse-box h5 {
  padding: 0.5rem;
  font-size: 1rem;
  margin-left: 0.5rem;
  padding-left: 1.3rem;
  font-family: @fontFamily;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  .bg-img("icon-5-1");
  background-position: left;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
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
  bottom: -18rem;
  left: 0;
  width: 100%;
  min-height: 18rem;
  z-index: -1;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: bottom 400ms;
  svg {
    position: absolute;
    right: 0;
    top: 0;
  }
  .Confirminformation {
    margin: 2rem 0.78rem;
    box-shadow: none;

    .cell {
      height: 1.5rem;
      line-height: 1.5rem;
      border: none;
      color: #666;
      .input-box {
        color: #000;
      }
    }
  }
  .title {
    margin: 1rem 0.78rem;
    font-size: 0.8rem;
    width: 22rem;
  }
  .nextStep {
    margin-top: 1.57rem;
    width: 80%;
    height: 3rem;
    display: inline-block;
    background-color: #0562be;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: @menuFontSzie;
    text-align: center;
    line-height: 3rem;
    color: #fff;
    margin-left: 50%;
    transform: translate(-50%, 0);
  }
}
.parametersModel2 {
  bottom: -1rem;
  z-index: 501;
}
</style>

