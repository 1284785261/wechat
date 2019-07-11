<template>
  <div>
    <div class="Orderbox">

      <IOrderHeadStatus :opts="orderDetail"></IOrderHeadStatus>
      <div class="card-list">
        <div class="item">
          <IGroup>
            <div class="Method-box" v-if="orderDetail.status == '20'">
              <span class="title">支付方式</span>
              <p v-if="orderDetail.payTypeCode">{{orderDetail.payTypeCode | Code}}<a @click="showMethod"></a></p>
            </div>
          </IGroup>
        </div>
        <div class="item">
          <IGroup>
            <IMyOrderCard :opts="orderDetail" :isShowBT="isShowBT"></IMyOrderCard>
          </IGroup>
        </div>
        <div class="item" v-if="orderDetail.ThridExpressInfo">
          <IGroup>
            <IOrderTrackCard></IOrderTrackCard>
          </IGroup>
        </div>
        <div class="item" v-if="orderDetail.status == '10'">
          <IGroup>
            <div class="invoice-box">
              <div class="download">
                <span class="title">上传随货发票</span>
                <a>下载随货发票模板<x-icon type="ios-arrow-thin-down" size="20" class="down"></x-icon></a>
              </div>
              <div class="invoice-file-box">
                <div class="invoice-upload">
                  <div class="image-container">
                    <figure v-if="fileList.type =='image'">
                      <img :src="fileList.annexObjNetworkPath" class="fileimg">
                    </figure>
                    <div v-if="fileList.type =='word'" class="words">
                      <img src="../../assets/upload2.png">
                      <a v-if="fileList.annexObjName">{{fileList.annexObjName}}</a>
                    </div>
                  </div>
                </div>
                <a class="Modify" @click="Modify">修改 <x-icon type="ios-arrow-right" class="right" size="30"></x-icon></a>
              </div>
            </div>
          </IGroup>
        </div>
        <div class="item" v-if="InvoiceInfo && InvoiceInfo.invoiceType">
          <IGroup>
            <div class="Invoice">
              <p class="title">发票</p>
              <p>发票类型： {{InvoiceInfo.invoiceType | invoiceType}} </p>
              <p>发票抬头： {{InvoiceInfo.invoiceHead}}</p>
              <p><a @click="lookInvoice">查看发票 >></a></p>
            </div>
          </IGroup>
        </div>
        <div class="item" v-if="billList.length > 0">
          <IGroup>
            <div class="Bill-box">
              <p class="title">账单信息</p>
              <div v-for="(item,index) in billList" :key="index" class="bill">
                <div>
                  <p>费用生成时间: {{item.payDate}}</p>
                  <p>{{item.feeName}}: ￥{{item.totalFee}}</p>
                </div>
                <p :class="item.isPay == 1?'state1':'state2'">{{item.isPay | ispay}}</p>
              </div>
              <p class="combined">合计：￥{{TotleMoney}}</p>
            </div>
          </IGroup>
        </div>
      </div>
      <div v-transfer-dom>
        <MethodBox :method="method" @SetPay="PayType"></MethodBox>
      </div>

    </div>
    <ITabbar>
      <div class="btn-list" slot="list">
        <div class="btn-box" slot="item">
          <div class="btn btn-theme">
            <div class="icon-btn kf"></div>
            <div>联系客服</div>
          </div>
        </div>
        <!-- <div class="btn-box" slot="item">
          <div class="btn">取消订单</div>
        </div> -->
        <div class="btn-box" slot="item" v-if="orderDetail.status == '20'">
          <div class="btn btn-theme" @click="goPayfor">去支付</div>
        </div>
        <div class="btn-box" slot="item" v-if="orderDetail.status == '99'">
          <div class="btn" @click="DeleteOrder">删除订单</div>
        </div>
        <div class="btn-box" slot="item" v-if="orderDetail.status == '10' || orderDetail.status == '20'">
          <div class="btn" @click="optsOrder">取消订单</div>
        </div>
        <!-- <div class="btn-box" slot="item">
          <div class="btn">再次订单</div>
        </div> -->
      </div>
    </ITabbar>
  </div>
</template>

<script>
import { TransferDom, Tab, XButton } from "vux";
import {
  IOrderHeadStatus,
  IMyOrderCard,
  IOrderTrackCard,
  MethodBox
} from "@/components/OrderManage";
import { IGroup, ICell, ITabbar } from "@/components/Common";
import { stop, move } from "@/libs/util";
import {
  GetOrderDetail,
  SetOrderPayType,
  GetAnnex,
  CancelOrder,
  DeleteOrder
} from "@/api/common/order";
export default {
  directives: {
    TransferDom
  },
  components: {
    ITabbar,
    IOrderHeadStatus,
    IMyOrderCard,
    IGroup,
    ICell,
    XButton,
    IOrderTrackCard,
    MethodBox
  },
  data() {
    return {
      isShowBT: true,
      fileList: {
        name: "111",
        url: require("../../assets/upload2.png"),
        type: "image/png"
      },
      billList: [],
      method: {
        classShow: false,
        index: 0
      },
      OrderId: "",
      orderDetail: {},
      TotleMoney: 0,
      InvoiceInfo: {},
      NotPayList: []
    };
  },
  filters: {
    Code(val) {
      if (val == "HDFK") {
        return "货到付款";
      }
      if (val == "ZXZF") {
        return "在线支付";
      }
      if (val == "GSZZ") {
        return "公司转账";
      }
    },
    ispay(val) {
      if (val == "1") {
        return "已支付";
      } else if (val == "0") {
        return "未支付";
      }
    },
    invoiceType(val) {
      if (val == "OE") {
        return "增值税普通发票（电子）";
      }
      if (val == "SE") {
        return "增值税专用发票（电子）";
      }
    }
  },
  mounted() {
    this.OrderId = this.$route.query.orderId;
    if (this.OrderId) {
      this.getOrder(this.OrderId);
    }
  },
  methods: {
    Modify() {
      this.$router.push({
        path: "/ModifyInvoice",
        query: {
          OrderId: this.OrderId
        }
      });
    },
    goPayfor() {
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
    },
    showMethod() {
      this.method.classShow = !this.method.classShow;
      stop();
    },
    getOrder(id) {
      GetOrderDetail(id).then(res => {
        if (res) {
          this.orderDetail = res;
          console.log(this.orderDetail);
          //获取支付方式
          if (this.orderDetail.payTypeCode == "HDFK") {
            this.method.index = 0;
          } else if (this.orderDetail.payTypeCode == "ZXZF") {
            this.method.index = 1;
          } else if (this.orderDetail.payTypeCode == "GSZZ") {
            this.method.index = 2;
          }

          //获取随货发票文件
          if (this.orderDetail.goodsInvoiceId) {
            this.getFiles(this.orderDetail.goodsInvoiceId);
          }

          //获取账单信息
          if (this.orderDetail.OrderBill.length > 0) {
            this.billList = this.orderDetail.OrderBill;
            for (let i = 0; i < this.billList.length; i++) {
              this.TotleMoney += this.billList[i].totalFee;

              if (this.billList[i].isPay == 0) {
                this.NotPayList.push(this.billList[i]);
              }
            }
          }

          //获取发票信息
          if (this.orderDetail.OpenInvoiceInfo) {
            this.InvoiceInfo = this.orderDetail.OpenInvoiceInfo;
          }
        }
      });
    },
    PayType(val) {
      this.orderDetail.payTypeCode = val.payTypeCode;
      this.setPayType(val.payTypeCode);
    },
    getFiles(id) {
      GetAnnex(id).then(res => {
        if (res) {
          this.fileList = res;
          if (
            res.annexObjNetworkPath.indexOf("jpg") > 0 ||
            res.annexObjNetworkPath.indexOf("png") > 0 ||
            res.annexObjNetworkPath.indexOf("jpeg") > 0
          ) {
            this.fileList.type = "image";
          } else {
            this.fileList.type = "word";
          }
        }
      });
    },
    setPayType(code) {
      let data = {
        orderId: this.OrderId,
        payType: code
      };
      SetOrderPayType(data).then(res => {
        if (res) {
          this.$vux.toast.show({
            type: "text",
            text: "设置付款方式成功"
          });
          this.getOrder(this.OrderId);
        }
      });
    },
    optsOrder() {
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
            orderId: this.OrderId,
            note: note
          };
          CancelOrder(data).then(res => {
            if (res) {
              this.$vux.toast.show({
                type: "text",
                text: "取消订单成功"
              });
              setTimeout(() => {
                this.$router.push({ path: "/MyOrderManage" });
              }, 2000);
            }
          });
        },
        onCancel: () => {
          this.$vux.confirm.hide();
        }
      });
    },
    DeleteOrder() {
      let data = {
        orderId: this.OrderId
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
                this.$router.push({ path: "/MyOrderManage" });
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
    lookInvoice() {
      if (this.orderDetail && this.orderDetail.OpenInvoiceInfo) {
        this.$router.push({
          path: "/InvoiceDetails",
          query: { recordID: this.orderDetail.OpenInvoiceInfo.recordID }
        });
      } else {
        this.$vux.toast.show({
          type: "text",
          text: "无法查看发票信息"
        });
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang="less">
@import "../../main.less";
body {
  background: rgba(246, 246, 246, 1);
}
.Orderbox {
  position: absolute;
  width: 100%;
  top: 3rem;
  bottom: 3.14rem;
  left: 0;
  right: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.card-list {
  margin-top: -1.6rem;
  overflow: scroll;
}
.item {
  margin-top: 0.6rem;
}
.btn-list {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem;
}
.btn {
  font-size: 0.9rem;
  border: 1px solid rgba(187, 187, 187, 1);
  padding: 0.6rem 1rem;
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.btn-theme {
  border: 1px solid @theme-color;
  color: @theme-color;
  position: relative;
}
.icon-btn {
  display: block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.3rem;
}
.kf {
  .bg-img("OrderDetail/icon-kf@2x");
  background-size: contain;
}
.download {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    display: inline-block;
    font-size: 1rem;
    margin: 1.07rem 0 0.85rem 0.78rem;
    .warning {
      left: 5.8rem;
      .bg-img("8-1");
      width: 0.86rem;
      background-size: contain;
      height: 0.86rem;
      display: inline-block;
      vertical-align: text-top;
      margin: 0.2rem 0.35rem 0.2rem 0.35rem;
    }
  }
  a {
    font-size: 1rem;
    color: #0979c4;
    margin-right: 1rem;
    .down {
      fill: #0979c4;
      vertical-align: sub;
    }
  }
}
.invoice-file-box {
  position: relative;
  min-height: 5rem;
  margin: 0 0.78rem;
  padding-bottom: 4rem;
  .invoice-upload {
    position: relative;
    margin: 0.5rem 1rem;
    .invoice-file {
      margin: 0.5rem;
      width: 4.4rem;
      height: 4.4rem; // background: #666;
      position: absolute;
      left: -8px;
      top: -8px; // opacity: 0.6;
      // filter: alpha(opacity=60);
      z-index: 100;
      img {
        position: absolute;
        left: 61px;
        top: 0px;
        width: 58px;
        height: 54px;
      }
    }
    .image-container {
      position: relative;
      .file-uploads {
        width: 7rem;
        height: 7rem;
        input {
          width: 100px;
          height: 100px;
        }
      }
      .upload1 {
        position: absolute;
        left: 0;
        top: 0;
        width: 7rem;
        height: 7rem;
      }
      .fileimg {
        position: absolute;
        left: 0;
        top: 0;
        width: 7rem;
        height: 7rem;
        text-align: center;
      }
      .words {
        position: absolute;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 7rem;
          height: 7rem;
        }
        a {
          position: absolute;
          bottom: -8.5rem;
          left: 0rem;
          font-size: 0.8rem;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
          margin-left: 1.5rem;
        }
      }
      .titles {
        position: absolute;
        left: 9rem;
        bottom: 4rem;
        display: inline-block;
        min-width: 9rem;
        span {
          color: #ff0000;
        }
      }
    }
  }
  .Modify {
    position: absolute;
    right: 0.3rem;
    top: 0;
    font-size: 0.9rem;
    color: #0979c4;
    .right {
      fill: #0562be;
      vertical-align: middle;
      margin-bottom: 4px;
    }
  }
}
.Invoice {
  overflow: hidden;
  .title {
    color: #000;
    line-height: 3rem;
  }
  p {
    font-size: 1rem;
    color: #666;
    margin-left: 0.78rem;
    line-height: 1.8rem;
    a {
      float: right;
      color: #2c7ac7;
      font-size: 1rem;
      margin-right: 1rem;
    }
  }
  margin-bottom: 1.5rem;
}
.Bill-box {
  .title {
    color: #000;
    line-height: 3rem;
    font-size: 1rem;
    margin-left: 0.78rem;
  }
  .bill {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.7rem 1rem;
    div {
      margin-bottom: 1rem;
      p {
        color: #000;
        line-height: 1.8rem;
      }
    }
    .state1 {
      color: #0088ff;
    }
    .state2 {
      color: #ff0000;
    }
  }
  .combined {
    text-align: right;
    font-size: @menuFontSzie;
    margin-right: 1rem;
    color: #000;
    margin-bottom: 1rem;
  }
}
.Method-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .title {
    font-size: 1rem;
    color: #000;
    margin-left: 1.2rem;
    line-height: 3rem;
  }
  p {
    font-size: 1rem;
    line-height: 3rem;
    a {
      color: #2c7ac7;
      vertical-align: top;
      line-height: 2.7rem;
      .bg-img("icon-mrge");
      width: 48px;
      height: 47px;
      display: inline-block;
    }
  }
}
</style>
