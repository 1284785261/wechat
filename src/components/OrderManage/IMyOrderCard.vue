<template>
  <div>
    <div class="card-box">
      <div class="invoice" :class="invoice"></div>
      <slot name="card-head">
        <div class="card-head">
          <div class="car-head-left">
            <slot name="card-select">
              <!-- <IPicker mini @onChange="selectd" v-if="opts.service === serviceOpts.serviceType && serviceOpts.serviceOpts "></IPicker> -->
              <!-- <IPicker @onChange="selectd" v-show="opts.service == 'on'"></IPicker> -->
              <a v-if="opts.show" :class="opts.service == 'on'?'items-selected':'items'" @click="selectd(opts)"></a>
            </slot>
            <h5>物流编号: <span @click="toTrack">{{opts.number}}</span>
              <p v-if="isShowBT">下单时间：{{opts.orderTime}}</p>
            </h5>

          </div>
          <slot name="card-status">
            <div class="card-status" :class="_status">
              {{opts.Orderstatus | Orderstatus}}
            </div>
          </slot>
        </div>
      </slot>
      <slot name="card-body">
        <div class="card-body" @click="toDetail">
          <div class="card-body-left" v-if="isShowBT">
            <Swiper v-if="opts.orderImgs && opts.orderImgs.length > 1" :autoPlay='true' :showIndicator='false' interval="2500" duration="500">
              <Slide v-for="(item,index) in opts.orderImgs" :key="index">
                <img :src="item">
              </Slide>
            </Swiper>
            <img v-else src="../../assets/OrderManage/imgs-dd.png">
          </div>
          <div class="card-body-left" v-else>
            <img v-if="opts.orderImgs && opts.orderImgs[0]" :src="opts.orderImgs[0]">
            <img v-else src="../../assets/OrderManage/imgs-dd.png">
          </div>
          <div class="card-body-center">
            <div class="card-body-center-item">
              <span>国家：{{opts.toCountry | Country}}</span>
            </div>
            <div class="card-body-center-item">
              <span>服务产品：{{opts.serviceProduct}}</span>
            </div>
            <div class="card-body-center-item">
              <span>计费重量/件数：{{opts.estimatedWeight}}KG/{{opts.packageCount}}件</span>
            </div>
            <div class="card-body-center-item">
              <span>物品类型：{{opts.goodsType | type}}</span>
            </div>
            <div class="card-body-center-item">
              <span v-if="opts.ThridExpressInfo && opts.ThridExpressInfo.ThirdName">第三方运单号：{{opts.ThridExpressInfo.ThirdName}}/{{opts.ThridExpressInfo.thirdNum}} </span>
              <span v-else>第三方运单号：-- </span>
              <!-- <a class="Fillfill" @click="FillOrder" v-if="isShowBT">补填单号</a> -->
            </div>
            <x-icon type="ios-arrow-right" size="30" class="arrow-right" @click="Modify" v-if="isShowBT"></x-icon>
          </div>
          <div class="card-body-opts">
            <div class="opts" :class="optsService"></div>
          </div>
        </div>
      </slot>
      <slot name="card-amount">
        <div class="card-amount" v-if="opts.Amount > 0">
          <em>{{opts.Amount}}</em>
        </div>
      </slot>
      <slot name="card-foot">
        <div class="card-foot">
          <div class="card-foot-button-group">
            <a v-if="opts.Orderstatus== '20' || opts.Orderstatus== '11' || opts.Orderstatus== '10'" class=" button" href="javascript:;" @click="optsOrder()">取消订单</a>
            <a v-if="opts.Orderstatus== '10'" class="button" href="javascript:;" @click="print(opts)">打印入仓单</a>
            <!-- <a v-if="opts.Orderstatus== '10'" class="button" href="javascript:;" @click="Delivery">发货</a> -->
            <a v-if="opts.Orderstatus== '20'" class="button" href="javascript:;" @click="goPayfor(opts)">去支付</a>
            <a v-if="opts.Orderstatus== '99'" class="button" href="javascript:;" @click="lookInvoice(opts)">查看发票</a>
            <a v-if="opts.Orderstatus== '99' || opts.Orderstatus== '100'" class="button" href="javascript:;" @click="DeleteOrder(opts)">删除订单</a>
            <!-- <a v-if="opts.Orderstatus== '10' || opts.Orderstatus== '11'" class="button" href="javascript:;">上传随货发票</a> -->
            <a v-if="opts.Orderstatus== '100'" class="button" href="javascript:;" @click="placeOrder(opts)">再次下单</a>
            <a v-if="opts.Orderstatus== '99'" class="button" href="javascript:;" @click="RefundSecurity">退保证金</a>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { IPicker } from "@/components/Common";
import { Swiper, Slide } from "vue-swiper-component";
import { GetOrderDetail } from "@/api/common/order";
export default {
  name: "IMyOrderCard",
  components: {
    IPicker,
    Swiper,
    Slide
  },
  props: {
    opts: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isShowBT: false,
    NotPayList: []
  },
  data() {
    return {};
  },
  filters: {
    Country(val) {
      if (val) {
        if (val == "CN") {
          return "中国";
        } else if (val == "IR") {
          return "伊朗";
        }
      }
    },
    type(val) {
      if (val == "B") {
        return "包裹";
      } else if (val == "P") {
        return "文件";
      }
    },
    Orderstatus(val) {
      if (val == 10) {
        return "已预报";
      } else if (val == 20) {
        return "待付款";
      } else if (val == 11) {
        return "待收货";
      } else if (val == 99) {
        return "已完成";
      } else if (val == 100) {
        return "已取消";
      }
    }
  },
  mounted() {},
  methods: {
    selectd() {
      if (this.opts.service == "on") {
        this.opts.service = "off";
      } else if (this.opts.service == "off") {
        this.opts.service = "on";
      }
      this.$emit("onSelectd", this.opts);
    },
    optsOrder() {
      this.$emit("optsOrder", this.opts.orderId);
    },
    toDetail() {
      this.$emit("toDetail", this.opts);
    },
    toTrack() {
      this.$emit("toTrack", this.opts);
    },
    Modify() {
      this.$router.push({
        path: "/ModifyOrder",
        query: { orderId: this.opts.orderId }
      });
    },
    FillOrder() {
      this.$router.push({ path: "/FillOrderNo" });
    },
    RefundSecurity() {
      this.$router.push({ path: "/RefundSecurity" });
    },
    Delivery() {
      let data = {
        theDeliveryModel: true
      };
      this.$emit("theDelivery", data);
      // this.$router.push({ path: "/Problema" });//问题件路由
    },
    lookInvoice(item) {
      if (item.IsOpenInvoice) {
        this.$router.push({
          path: "/InvoiceDetails",
          query: { recordID: item.IsOpenInvoice }
        });
      } else {
        this.$vux.toast.show({
          type: "text",
          text: "无法查看发票信息"
        });
      }
    },
    DeleteOrder(item) {
      this.$emit("DeleteOrder", item.orderId);
    },
    goPayfor(item) {
      GetOrderDetail(item.orderId).then(res => {
        if (res) {
          let ObjectDetail = res;
          //获取账单信息
          if (ObjectDetail.OrderBill.length > 0) {
            for (let i = 0; i < ObjectDetail.OrderBill.length; i++) {
              if (ObjectDetail.OrderBill[i].isPay == 0) {
                this.NotPayList.push(ObjectDetail.OrderBill[i]);
              }
            }
            if (this.NotPayList.length > 0) {
              this.$router.push({
                name: "ToPayfor",
                params: {
                  paylist: this.NotPayList
                }
              });
            } else {
              this.$vux.toast.show({
                type: "text",
                text: "无支付款项"
              });
            }
          } else {
            this.$vux.toast.show({
              type: "text",
              text: "无账单信息"
            });
          }
        }
      });
    },
    placeOrder(item) {
      this.$router.push({
        path: "/Delivery",
        query: {
          orderId: this.opts.orderId,
          isModify: "0"
        }
      });
    },
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        !(
          bIsIpad ||
          bIsIphoneOs ||
          bIsMidp ||
          bIsUc7 ||
          bIsUc ||
          bIsAndroid ||
          bIsCE ||
          bIsWM
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    print(data) {
      let ua = this.browserRedirect();
      if (!ua) {
        if (data) {
          let url = `http://192.168.50.222:7500/OrderOnline/api/Order/GetPDFFile?number=${
            data.number
          }`;
          var wind = window.open(
            url,
            "newwindow",
            "height=500, width=800, top=100, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no"
          );
          wind.print();
        }
      }
    }
  },
  computed: {
    optsService() {
      if (!this.opts.service) return [""];
      else if (this.opts.service === "on") return ["opts-on"];
      else return ["opts-off"];
    },
    invoice() {
      return this.opts.IsOpenInvoice > 0 ? ["icon-invoice"] : [""];
    },
    _status() {
      if (this.opts.Status === "已取消") return ["status-error"];
      else return ["status-normal"];
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
@import "../../main.less";
.card-box {
  position: relative;
  padding: 0.5rem;
  border-radius: 0.3rem;
  background: @background;
}
.card-head,
.card-body,
.card-amount,
.card-foot {
}
.card-head {
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
}
.swiper-demo-img img {
  width: 100%;
}
.car-head-left {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.card-head h5,
.card-amount {
  font-weight: bold;
}
.card-head h5 {
  font-size: 1rem;
  color: rgba(0, 0, 0, 1);
  p {
    font-size: 0.8rem;
    color: #666;
    font-weight: normal;
  }
}
.card-status {
  font-size: 0.9rem;
}
.card-body {
  box-sizing: border-box;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 1rem;
}
.card-body-left {
  width: 6rem;
  height: 6rem;
  margin: 0 0.6rem;
  border-radius: 5px;
  background: #ebebeb;
  img {
    width: 80%;
    height: 80%;
    margin-top: 10%;
    margin-left: 10%;
  }
}
.card-body-center {
  line-height: 1.5rem;
  font-size: 0.8rem;
  width: 12rem;
  .arrow-right {
    position: absolute;
    top: 3.5rem;
    right: 1rem;
    fill: #0562be;
  }
}
.Fillfill {
  color: #ff0000;
  border: 1px solid #ff0000;
  border: 1px solid #ff0000;
  padding: 0.2rem 0.5rem;
  border-radius: 50px;
  margin-left: 1rem;
}
.card-amount {
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  color: rgba(0, 0, 0, 1);
}
.card-amount em::before {
  content: "￥";
}
.card-foot {
  display: flex;
  justify-content: flex-end;
}
.card-foot-button-group {
  display: flex;
  justify-content: space-around;
}
.button {
  box-sizing: border-box;
  font-size: 0.83rem;
  line-height: 1.5rem;
  color: rgba(153, 153, 153, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  padding: 0 0.5rem;
  margin-left: 0.5rem;
}

.status-error {
  color: rgba(255, 0, 0, 1);
}
.status-normal {
  color: rgba(44, 122, 199, 1);
}
.opts {
  width: 2rem;
  height: 2rem;
}
/*分票*/
.opts-on {
  .bg-img("OrderManage/icon-9-2@2x");
  background-size: contain;
  margin-left: 1.5rem;
}
/*合票*/
.opts-off {
  .bg-img("OrderManage/ico-8-2@2x");
  background-size: contain;
  margin-left: 1.5rem;
}
.invoice {
  width: 5rem;
  height: 3rem;
  position: absolute;
  top: 0;
  left: 50%;
}
.icon-invoice {
  .bg-img("OrderManage/icon-1-1");
}
</style>
