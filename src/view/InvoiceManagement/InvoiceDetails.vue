<template>
  <div style="overflow: hidden;">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content">
      <span v-if="!tis" class="noInformation">暂无开票历史信息~</span>
      <div class="content-box">
        <div class="electronic-look">
          <span>电子发票已开</span>
          <a @click="top">查看</a>
        </div>
        <div class="receive">
          <p>接收信息</p>
          <div>
            <span>电子邮箱</span>
            <span>{{personal.cEmail}}</span>
            <a></a>
          </div>
        </div>
        <div class="invoiceData" v-if="type==2">
          <p>发票信息</p>
          <IGroup>
            <ICell title="发票抬头">
              <div slot="right" class="input-box">
                <span>{{personal.invoiceHead}}</span>
              </div>
            </ICell>
            <ICell title="纳税人识别号">
              <div slot="right" class="input-box">
                <span>{{personal.invoiceContent}}</span>
              </div>
            </ICell>
            <ICell title="地址" v-if="personal.registPlaceAddress">
              <div slot="right" class="input-box">
                <span>{{personal.registPlaceAddress}}</span>
              </div>
            </ICell>
            <ICell title="电话" v-if="personal.registPlaceTel">
              <div slot="right" class="input-box">
                <span>{{personal.registPlaceTel}}</span>
              </div>
            </ICell>
            <ICell title="开户银行" v-if="personal.openAccountBank">
              <div slot="right" class="input-box">
                <span>{{personal.openAccountBank}}</span>
              </div>
            </ICell>
            <ICell title="银行账号" v-if="personal.openAccount">
              <div slot="right" class="input-box">
                <span>{{personal.openAccount}}</span>
              </div>
            </ICell>
            <ICell title="发票金额">
              <div slot="right" class="input-box">
                <span style="color:#FF7700;">{{personal.invoiceMoney}}</span>
              </div>
            </ICell>
            <ICell title="申请时间">
              <div slot="right" class="input-box">
                <span>{{personal.openInvoiceTime}}</span>
              </div>
            </ICell>
          </IGroup>
        </div>
        <div class="invoiceData" v-if="type==1">
          <p>发票信息</p>
          <IGroup>
            <ICell title="发票抬头">
              <div slot="right" class="input-box">
                <span>{{personal.invoiceHead}}</span>
              </div>
            </ICell>
            <ICell title="发票金额">
              <div slot="right" class="input-box">
                <span style="color:#FF7700;">{{personal.invoiceMoney}}</span>
              </div>
            </ICell>
            <ICell title="申请时间">
              <div slot="right" class="input-box">
                <span>{{personal.openInvoiceTime}}</span>
              </div>
            </ICell>
          </IGroup>
        </div>
        <div class="replaceData">
          <p>换开申请</p>
          <IGroup class="replaceData-group">
            <ICell title="开票进度">
              <div slot="right" class="input-box">
                <span :class="personal.change>= 0?'title1':'title2'">已提交</span>
                <span :class="personal.change>= 0?'progress-1':'personal-2'"></span>
                <span>————</span>
                <span :class="personal.change== 2?'progress-1':'progress-2'"></span>
                <span :class="personal.change== 2?'title1':'title2'" style="margin-right:1rem;">已开票</span>
              </div>
            </ICell>
          </IGroup>
        </div>
      </div>

    </div>
    <div class="footer2">
      <a class="nextStep" v-if="type==1 && personal.change =='0'" @click="nextStep">换开申请</a>
    </div>
  </div>
</template>
<script>
import { XInput, XButton, PopupPicker } from "vux";
import { IPicker, IGroup, ICell, Header } from "@/components/Common";
import { GetInvoiceDetail } from "@/api/common/Invoices";
export default {
  components: {
    XInput,
    XButton,
    PopupPicker,
    IPicker,
    IGroup,
    ICell,
    Header
  },
  data() {
    return {
      tis: true,
      type: "1",
      GOtitle: "申请发票",
      personal: {
        invoiceHead: "",
        invoiceMoney: "",
        openInvoiceTime: "",
        invoiceHeadType: "",
        change: "",
        cEmail: "",
        invoiceContent: "",
        registPlaceAddress: "",
        registPlaceTel: "",
        openAccountBank: "",
        openAccount: ""
      },
      orderId: ""
    };
  },
  mounted() {
    if (this.$route.query.recordID) {
      this.GetInvoice(this.$route.query.recordID);
    }
  },
  methods: {
    GetInvoice(id) {
      GetInvoiceDetail(id).then(res => {
        console.log(res);
        if (res.invoiceHeadType == "0") {
          this.type = "1";
        } else if (res.invoiceHeadType == "1") {
          this.type = "2";
        }
        this.personal.invoiceHead = res.invoiceHead;
        this.personal.invoiceMoney = res.invoiceMoney;
        this.personal.openInvoiceTime = res.openInvoiceTime;
        this.personal.invoiceHeadType = res.invoiceHeadType;
        this.personal.change = res.change;
        this.personal.cEmail = res.cEmail;
        this.personal.invoiceContent = res.invoiceContent;
        this.personal.registPlaceAddress = res.registPlaceAddress;
        this.personal.registPlaceTel = res.registPlaceTel;
        this.personal.openAccountBank = res.openAccountBank;
        this.personal.openAccount = res.openAccount;
        this.orderId = res.orderId;
      });
    },
    top() {
      this.$router.push({ path: "/withdrawalSubsidiary" });
    },
    nextStep() {
      this.$router.push({
        path: "/electronicInvoice",
        query: {
          OrderId: "[" + this.orderId + "]",
          TotolMoney: this.personal.invoiceMoney
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content {
  overflow: auto;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 3.14rem;
  left: 0;
  right: 0;
  bottom: 3.14rem;
  .content-box {
    .electronic-look {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2.8rem;
      margin-left: 1.2rem;
      margin-top: 0.7rem;
      a {
        font-size: 0.8rem;
        color: #999;
        padding-right: 2.5rem;
        margin-right: 1rem;
        .bg-img("right-jt");
        background-position: right;
      }
    }
    .receive {
      margin-left: 1.2rem;
      text-align: left;
      p {
        font-size: 0.8rem;
        color: #999;
        line-height: 2rem;
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.8rem;
        span {
          font-size: 0.8rem;
          color: #666;
        }
        a {
          width: 70px;
          height: 24px;
          display: inline-block;
          margin-right: 1rem;
          .bg-img("send");
          background-size: contain;
        }
      }
    }
    .invoiceData {
      p {
        font-size: 0.8rem;
        color: #999;
        line-height: 2rem;
        text-align: left;
        margin-left: 1.2rem;
      }
      .group {
        margin-left: 1.2rem;
        box-shadow: none;
        .cell {
          padding: 0;
          border-bottom: 1px solid #bbb;
          /deep/ .left {
            min-width: 6rem;
            margin-right: 1.4rem;
            color: #666666;
            text-align: left;
            font-size: 0.8rem;
          }
          .input-box {
            span {
              color: #000;
            }
          }
          &:nth-last-child(1) {
            border: none;
          }
        }
      }
    }
    .replaceData {
      p {
        font-size: 0.8rem;
        color: #999;
        line-height: 2rem;
        text-align: left;
        margin-left: 1.2rem;
      }
      /deep/ .replaceData-group {
        margin-left: 1.2rem;
        box-shadow: none;
        .cell {
          padding: 0;
          border: none;
          .left {
            min-width: 4rem;
            color: #666666;
            text-align: left;
            font-size: 0.8rem;
          }
          .input-box {
            box-sizing: border-box;
            position: relative;
            width: 100%;
            padding: 0;
            text-align: right;
            .progress-1 {
              width: 15px;
              height: 15px;
              display: inline-block;
              .bg-img("progress-1");
              background-size: contain;
              vertical-align: sub;
            }
            .progress-2 {
              width: 15px;
              height: 15px;
              display: inline-block;
              .bg-img("progress-2");
              background-size: contain;
              vertical-align: sub;
            }
            .title1 {
              color: #20a517;
            }
          }
        }
      }
    }
  }
}
</style>
