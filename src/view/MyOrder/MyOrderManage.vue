<template>
  <div class="Order-box">
    <tab :line-width="1" :scroll-threshold="3">
      <tab-item :selected="index===tabIndexIndex" :key="index" v-for="(item,index) in tabItem" @on-item-click="tabIndex(index)">{{item}}</tab-item>
    </tab>
    <div class="content-box">
      <scroller height="100%" :on-refresh="refresh" :on-infinite="infinite" ref="scrollerBottom" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
        <!-- 上拉刷新动画 -->
        <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
          <g stroke-width="7" stroke-linecap="round">
            <line x1="10" x2="10" y1="27.3836" y2="36.4931">
              <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
              <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
            </line>
            <line x1="24" x2="24" y1="18.6164" y2="45.3836">
              <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
              <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
            </line>
            <line x1="38" x2="38" y1="16.1233" y2="47.8767">
              <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
              <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
            </line>
            <line x1="52" x2="52" y1="16" y2="48">
              <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
              <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate>
            </line>
          </g>
        </svg>
        <div class="card-box">
          <div class="card-tool" v-if="tabIndexIndex===1">
            <span class="tool-bnt" :class="{'active': item.selectd}" @click="optsService(index)" v-for="(item, index) in optsServiceList">{{item.text}}</span>
          </div>
          <div class="card-box-item" v-for="item in OrderList">
            <IMyOrderCard :opts="item" @onSelectd="selectdChange" @optsOrder="optsOrder" @toDetail="toDetail" @theDelivery="theDelivery" @DeleteOrder="DeleteOrder"></IMyOrderCard>
          </div>
        </div>
        <!-- 下拉加载动画 -->
        <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
          <g>
            <circle cx="16" cy="32" stroke-width="0" r="3">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="32" cy="32" stroke-width="0" r="3.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="48" cy="32" stroke-width="0" r="4.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
            </circle>
          </g>
        </svg>
      </scroller>
    </div>
    <!-- <div v-transfer-dom v-if="!popupShowMask && shows">
      <popup v-model="serviceOpts" :show-mask="false" :hide-on-blur="true">
        <div class="opts-service-btn-box">
          <span class="opts-service-btn" @click="clearOptsService">取消</span>
          <span class="opts-service-btn active" @click="nextOpts">确定</span>
        </div>
      </popup>
    </div> -->
    <div>
      <Buttons :maskList='maskListShow' @nextOpts='nextOptss' @cancel="cancel"></Buttons>
    </div>
    <div v-transfer-dom>
      <popup v-model="popupShowMask" :show-mask="true" :hide-on-blur="true">
        <div>
          <IOrderOn v-if="optsServiceIndex===0" :opts="OrderOn" @submit="SeparateOrder"></IOrderOn>
          <IOrderOff v-if="optsServiceIndex===1" :opts="OrderOff" @submit="optsServiceSubmit"></IOrderOff>
          <IOrderOptsTips v-if="optsServiceIndex===2" :opts="OrderResult" @clanceOpt="clearOpts"></IOrderOptsTips>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="theDeliveryModel" :show-mask="true" :hide-on-blur="true">
        <div class="btn-boxs">
          <a @click="UnBtn">取消</a>
          <a v-if="selectBtn">确定</a>
        </div>
        <waybill-Service @TheAwb="TheAwb" @onItemBtn="onItemBtn"></waybill-Service>
      </popup>
    </div>
  </div>
</template>

<script>
import { delArryItem } from "@/libs/tools";
import busCfg from "@/config/BusinessConfig";
import waybillService from "@/components/Public/waybillService.vue";
import { TransferDom, Tab, TabItem, Popup } from "vux";
import {
  GetUserOrderList,
  CancelOrder,
  DeleteOrder,
  SeparateOrder,
  FuseOrder
} from "@/api/common/order";
import {
  IMyOrderCard,
  IOrderOn,
  IOrderOff,
  IOrderOptsTips,
  Buttons
} from "@/components/OrderManage";
import { join } from "path";
const optsServiceList = [
  { text: "拆票", selectd: false },
  { text: "合票", selectd: false }
];
const tabItem = ["全部", "已预报", "待付款", "待收货", "已完成", "已取消"];
const serviceType = busCfg.serviceType || ["on", "off"];
// const opts_cancel_btn = (that, orderId) => {
//   that.$vux.confirm.show({
//     title: "提醒",
//     content: "确定取消该订单?",
//     onCancel: () => {
//       console.log(that);
//     },
//     onConfirm: () => {
//       console.log(this);
//     }
//   });
//   console.log(`取消订单成功${orderId}`);
// };

// const opts_order_again_btn = orderId => {
//   console.log(`再次下单${orderId}`);
// };

// const opts_to_pay_btn = orderId => {
//   console.log(`去支付${orderId}`);
// };

// const opts_shipments_btn = orderId => {
//   console.log(`发货成功${orderId}`);
// };

// const opts_edit_order_btn = orderId => {
//   console.log(`修改订单${orderId}`);
// };
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Popup,
    IMyOrderCard,
    IOrderOn,
    IOrderOff,
    IOrderOptsTips,
    waybillService,
    Buttons
  },
  data() {
    return {
      optsServiceList: optsServiceList,
      optsServiceIndex: -1,
      tabItem: tabItem,
      tabIndexIndex: 0,
      selectdOrders: [],
      popupShowMask: false,
      OrderOn: {
        orderId: "",
        number: "",
        Weight: 0,
        num: 0
      },
      OrderOff: {
        OrderNos: []
      },
      OrderResult: {
        tips: "",
        OrderNos: []
      },
      OrderList: [
        // {
        //   OrderId: 1,
        //   OrderNo: "123123123",
        //   Status: "已取消",
        //   GoodsImg: [],
        //   Weight: 12.2,
        //   Num: 1,
        //   GoodsType: "包裹",
        //   OtherOrderNo: "--",
        //   Amount: 0,
        //   service: "off",
        //   Buttons: [{ text: "取消订单", fn: opts_cancel_btn }]
        // },
      ],
      theDeliveryModel: false,
      selectBtn: false,
      orderstatus: 0,
      pageIndex: 0,
      pageSize: 10,
      fns: "",
      maskListShow: {
        classShow: false
      }
    };
  },
  mounted() {},
  methods: {
    //下拉刷新
    refresh(done) {
      this.pageIndex = 1;
      setTimeout(() => {
        this.GetOrderList(1, done);
      }, 1500);
    },
    //上拉加载数据
    infinite(done) {
      setTimeout(() => {
        this.pageIndex++;
        this.GetOrderList(this.pageIndex, done);
      }, 1500);
    },
    //获取当前用户订单
    GetOrderList(offset, fn) {
      this.pageIndex = offset;
      let str1 = {
        orderstatus: this.orderstatus,
        userId: 1,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      GetUserOrderList(str1).then(res => {
        if (res && res.Total > 0) {
          let maxNum = Math.ceil(res.Total / this.pageSize); //判断总共有多少页
          if (offset > maxNum) {
            fn(true);
            return;
          } else {
            if (fn) {
              fn();
            }
          }
          if (this.pageIndex == 1) {
            this.OrderList = res.DataList;
          } else {
            this.OrderList = this.OrderList.concat(res.DataList);
          }
          if (this.orderstatus == 10) {
            for (let i = 0; i < this.OrderList.length; i++) {
              if (this.OrderList[i].Orderstatus == "10") {
                this.$set(this.OrderList[i], "service", "off");
                if (this.optsServiceIndex > -1) {
                  this.$set(this.OrderList[i], "show", true);
                } else {
                  this.$set(this.OrderList[i], "service", "off");
                  this.$set(this.OrderList[i], "show", false);
                }
              }
            }
          }
          setTimeout(() => {
            this.$vux.loading.hide();
          }, 500);
        } else {
          this.OrderList = [];
          setTimeout(() => {
            this.$vux.loading.hide();
          }, 500);
          fn(true);
        }
      });
    },
    tabIndex(index) {
      //  ["全部", "已预报", "待付款", "待收货", "已完成", "已取消"];
      this.tabIndexIndex = index;
      this.$vux.loading.show({
        text: "Loading"
      });
      if (this.tabIndexIndex == 0) {
        this.orderstatus = 0;
        this.refresh();
      } else if (this.tabIndexIndex == 1) {
        this.orderstatus = 10;
        this.refresh();
      } else if (this.tabIndexIndex == 2) {
        this.orderstatus = 20;
        this.refresh();
      } else if (this.tabIndexIndex == 3) {
        this.orderstatus = 11;
        this.refresh();
      } else if (this.tabIndexIndex == 4) {
        this.orderstatus = 99;
        this.refresh();
      } else if (this.tabIndexIndex == 5) {
        this.orderstatus = 100;
        this.refresh();
      }
    },
    toDetail(item) {
      const route = {
        name: "OrderDetail"
      };
      this.$router.push({
        path: "/OrderDetail",
        query: {
          orderId: item.orderId
        }
      });
    },
    nextOptss(val) {
      if (val) {
        this.nextOpts();
      }
    },
    cancel(val) {
      if (val) {
        this.clearOptsService();
      }
    },
    optsService(index) {
      if (this.optsServiceList[index].selectd) {
        this.clearOptsService();
        return;
      }
      for (let i = 0; i < this.OrderList.length; i++) {
        this.$set(this.OrderList[i], "show", true);
      }

      this.optsServiceList.forEach(item => {
        item.selectd = false;
      });
      this.optsServiceIndex = index;

      this.optsServiceList[index].selectd = !this.optsServiceList[index]
        .selectd;
      for (let i = 0; i < this.optsServiceList.length; i++) {
        if (this.optsServiceList[i].selectd) {
          this.maskListShow.classShow = true;
        }
      }
    },
    clearOpts(value) {
      this.clearOptsService();
      this.selectdOrders = [];
      this.popupShowMask = false;
      this.refresh();
    },
    clearOptsService() {
      for (let i = 0; i < this.OrderList.length; i++) {
        this.$set(this.OrderList[i], "show", false);
      }
      // this.OrderOn = {
      //   orderId: "",
      //   number: "",
      //   Weight: 0,
      //   num: 0
      // };
      this.optsServiceList.forEach(item => {
        item.selectd = false;
      });
      this.maskListShow.classShow = false;
      this.optsServiceIndex = -1;
    },
    selectdChange(opts) {
      let Exist = false;
      let index = -1;
      if (opts.service != "on")
        this.selectdOrders = delArryItem(this.selectdOrders, opts.orderId);
      else this.selectdOrders.push(opts.orderId);
    },
    nextOpts() {
      this.maskListShow.classShow = true;
      let tips = {
        type: "text",
        text: "",
        width: "18em"
      };
      if (this.selectdOrders.length === 0) {
        tips.text = "请选择运单进行拆合票";
        this.$vux.toast.show(tips);
        return;
      }
      if (this.optsServiceIndex === 0 && this.selectdOrders.length > 1) {
        tips.text = "最多只可选择一个订单进行拆票!";
        this.$vux.toast.show(tips);
        return;
      }
      if (this.optsServiceIndex === 0) {
        this.OrderList.forEach(item => {
          if (item.orderId === this.selectdOrders[0]) {
            this.OrderOn.orderId = item.orderId;
            // this.OrderOn.Weight = item.bill
            this.OrderOn.Weight = 100;
            this.OrderOn.number = item.number;
            this.maskListShow.classShow = false;
          }
        });
      }
      console.log(this.selectdOrders);
      if (this.optsServiceIndex === 1) {
        for (let i = 0; i < this.OrderList.length; i++) {
          for (let j = 0; j < this.selectdOrders.length; j++) {
            if (this.OrderList[i].orderId == this.selectdOrders[j]) {
              this.OrderOff.OrderNos.push({
                orderId: this.OrderList[i].orderId,
                number: this.OrderList[i].number
              });
            }
          }
        }
        this.maskListShow.classShow = false;
      }
      this.popupShowMask = true;
    },
    //拆票订单
    SeparateOrder(data) {
      let Datas = {
        orderId: data.orderId,
        num: data.num
      };
      if (data) {
        let text1 = "";
        SeparateOrder(Datas).then(res => {
          if (res) {
            console.log(res);
            this.optsServiceIndex = 2;
            this.OrderResult.tips = data.number + "已拆票成功!";
            this.OrderResult.OrderNos = res.join("、");
            console.log(this.OrderResult);
          }
        });
      }
    },
    //合票订单
    optsServiceSubmit(data) {
      console.log(data);
      let list = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          list.push(data[i].orderId);
        }
        FuseOrder({ list }).then(res => {
          console.log(res);
          if (res) {
            this.optsServiceIndex = 2;
            let arr = [];
            for (let i = 0; i < data.length; i++) {
              arr.push(data[i].number);
            }
            this.OrderResult.tips = arr.join("、") + "已合票成功！";
            this.OrderResult.OrderNos = res;
            console.log(this.OrderResult);
          }
        });
      }
      // if (!result) return
      // this.OrderResult = {
      //   tips: `${this.selectdOrders.join("、")}已${
      //     this.optsServiceList[this.optsServiceIndex].text
      //   }成功!`,
      //   OrderNos: Array.from(result)
      // };
      this.optsServiceIndex = -1;
    },
    optsOrder(Id) {
      if (Id) {
        let note = "订单信息有误";
        this.$vux.confirm.show({
          // 组件除show外的属性
          title: "提醒",
          hideOnBlur: true,
          showCancelButton: true,
          content: `<p style="font-size:16px">确定取消该订单？(取消后可在取消件中再次下单)</p>`,
          onConfirm: () => {
            // CancelOrder
            let data = {
              orderId: Id,
              note: note
            };
            CancelOrder(data).then(res => {
              if (res) {
                this.$vux.toast.show({
                  type: "text",
                  text: "取消订单成功"
                });
                setTimeout(() => {
                  this.refresh();
                }, 2000);
              }
            });
          },
          onCancel: () => {
            this.$vux.confirm.hide();
          }
        });
      }
    },
    DeleteOrder(id) {
      let data = {
        orderId: id
      };
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: "提醒",
        hideOnBlur: true,
        showCancelButton: true,
        content: `<p style="font-size:16px">确定删除该订单？(删除后不可恢复订单)</p>`,
        onConfirm: () => {
          DeleteOrder(data).then(res => {
            if (res) {
              this.$vux.toast.show({
                type: "text",
                text: "删除订单成功"
              });
              setTimeout(() => {
                this.refresh();
              }, 2000);
            } else {
              this.$vux.toast.show({
                type: "text",
                text: "删除失败，请联系客服中心!"
              });
            }
          });
        },
        onCancel: () => {
          this.$vux.confirm.hide();
        }
      });
    },
    theDelivery(data) {
      this.theDeliveryModel = data.theDeliveryModel;
    },
    onItemBtn(data) {
      this.selectBtn = data;
    },
    UnBtn() {
      this.theDeliveryModel = false;
    },
    TheAwb(data) {}
  },
  computed: {
    serviceType() {
      return serviceType[this.optsServiceIndex];
    }
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.Order-box {
  position: relative;
  z-index: 1;
  height: 100%;
  /deep/ .vux-tab-wrap {
    .vux-tab-container {
      position: fixed;
      z-index: 100;
    }
  }
}
.content-box {
  position: absolute;
  width: 100%;
  top: 3.14rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
}
.card-box {
  padding: 0.5rem 1rem;
  overflow: auto;
  background: #eee;
}
.card-box-item {
  margin-top: 0.8rem;
}
.card-tool {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 2rem;
}
.tool-bnt {
  font-size: 0.9rem;
  color: rgba(153, 153, 153, 1);
  border: 1px solid #2c7ac7;
  padding: 0.2rem 1.3rem;
  margin-left: 0.5rem;
  background: #fff;
  border-radius: 5px;
  color: #2c7ac7;
}
.active {
  background: @theme-color;
  color: #fff;
}

.opts-service-btn-box {
  background: @background;
  padding: 3rem 0 5rem;
  box-shadow: 0.3rem 0.3rem 1rem rgba(187, 187, 187, 0.16);

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.opts-service-btn {
  padding: 0.3rem 1.8rem;
  border: 1px solid rgba(187, 187, 187, 1);
}

.vux-popup-dialog {
  border-radius: 0 0 0 0;
}
.btn-boxs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 0.5rem;
  a {
    color: #2c7ac7;
    font-size: 1rem;
    margin: 1rem;
  }
}
/deep/ .vux-popup-show {
  .select-service {
    margin: 0;
    box-shadow: none;
    border-radius: initial;
  }
}
</style>
