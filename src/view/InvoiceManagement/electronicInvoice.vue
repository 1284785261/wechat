<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="bg-box">
      <div class="content-box">
        <div class="type-title">
          <a :class="{'selects':index == tableIndex}" @click="tableselect(index)" v-for="(iten,index) in type" :key="index">{{iten.name}}</a>
        </div>
        <IGroup :groupClass="groupClass" v-if="tableIndex == '0'" class="personalGroup">
          <ICell title="发票类型">
            <div slot="right" class="input-box">
              <p class="name">增值税普通发票（电子）</p>
              <p class="title">开票后发送至您的邮箱</p>
            </div>
          </ICell>
          <ICell title="发票抬头">
            <div slot="right" class="input-box">
              <XInput title=" " ref="head" placeholder="请输入" v-model="datas.invoicesHead"></XInput>
              <span class="iconmt" @touchstart="touchList1"></span>
            </div>
          </ICell>
          <ul class="slide" :class="ChooseData1.Listshow?'animate':''">
            <li v-for="(item,index) in foreList1" :key="item.invoiceId" @click="touchselect(index)" :class="ChooseData1.Index == index?'aitss':''">
              <span></span>
              <p>{{item.invoicesHead}}</p>
            </li>
          </ul>
          <p class="accept-date">发票接受信息</p>

          <ICell title="电子邮箱">

            <div slot="right" class="input-box">
              <span class="icon-s">*</span>
              <XInput title=" " placeholder="用于向您发送电子发票" v-model="datas.email"></XInput>
            </div>
          </ICell>
          <ICell title="开票总额" class="bg-topborder">
            <div slot="right" class="input-box">
              <p class="price">￥{{TotolMoney}}</p>
            </div>
          </ICell>
        </IGroup>

        <!-- 公司部分 -->
        <IGroup :groupClass="groupClass" v-if="tableIndex == '1'" class="enterpriseGroup">
          <div class="enterprisetype">
            <a :class="{'selectenterprise':index == selectIndex}" @click="enterpriseselect(index)" v-for="(iten,index) in enterprisetype" :key="index">
              <p class="p1">{{iten.name}}</p>
              <p>(开票后发送至您的邮箱)</p>
            </a>
          </div>
          <!-- 普通发票 -->
          <div v-if="selectIndex == 0">
            <ICell title="名称" class="bgs" :class="ChooseData2.Listshow?'noborder':''">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请输入企业名称" v-model="datas.invoicesHead"></XInput>
                <span class="iconmt" @touchstart="touchList2"></span>
              </div>
            </ICell>
            <ul class="slide" :class="ChooseData2.Listshow?'animate':''">
              <li v-for="(item,index) in foreList2" :key="item.invoiceId" @click="touchselect2(item,index)" :class="ChooseData2.Index == index?'aitss':''">
                <span></span>
                <p>{{item.invoicesHead}}</p>
              </li>
            </ul>
            <ICell title="公司税号">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请输入纳税人识别号" v-model="datas.invoiceContent"></XInput>
              </div>
            </ICell>
            <p class="accept-date">发票接受信息</p>

            <ICell title="电子邮箱">
              <div slot="right" class="input-box">
                <span class="icon-s">*</span>
                <XInput title=" " placeholder="请输入邮箱" v-model="datas.email"></XInput>
              </div>
            </ICell>
            <ICell title="开票总额" class="bg-topborder">
              <div slot="right" class="input-box">
                <p class="price">￥{{TotolMoney}}</p>
              </div>
            </ICell>
          </div>
          <!-- 公司专用发票 -->
          <div v-if="selectIndex == 1" class="companyclass">
            <ICell title="名称" class="bgs" :class="ChooseData2.Listshow?'noborder':''">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请输入企业名称" v-model="datas.invoicesHead"></XInput>
                <span class="iconmt" @touchstart="touchList2"></span>
              </div>
            </ICell>
            <ul class="slide" :class="ChooseData2.Listshow?'animate':''">
              <li v-for="(item,index) in foreList2" :key="item.invoicesHead" @click="touchselect2(item,index)" :class="ChooseData2.Index == index?'aitss':''">
                <span></span>
                <p>{{item.invoicesHead}}</p>
              </li>
            </ul>
            <ICell title="纳税人税号" class="bgs">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请填写纳税人识别号" v-model="datas.invoiceContent"></XInput>
              </div>
            </ICell>
            <ICell title="地址" class="bgs">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请填写企业地址" v-model="datas.registPlaceAddress"></XInput>
              </div>
            </ICell>
            <ICell title="电话" class="bgs">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请填写企业电话" v-model="datas.registPlaceTel"></XInput>
              </div>
            </ICell>
            <ICell title="开户行">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请填写企业开户行" v-model="datas.openAccountBank"></XInput>
              </div>
            </ICell>
            <ICell title="开户行账号">
              <div slot="right" class="input-box">
                <XInput title=" " placeholder="请填写企业开户行账号" v-model="datas.openAccount"></XInput>
              </div>
            </ICell>
            <p class="accept-date">发票接受信息</p>

            <ICell title="电子邮箱" class="bgs">
              <div slot="right" class="input-box">
                <span class="icon-s">*</span>
                <XInput title=" " placeholder="用于向您发送电子发票" v-model="datas.email"></XInput>
              </div>
            </ICell>
            <ICell title="开票总额" class="bg-topborder">
              <div slot="right" class="input-box">
                <p class="price">￥{{TotolMoney}}</p>
              </div>
            </ICell>
          </div>
        </IGroup>

      </div>
    </div>
    <div class="footer2">
      <a class="nextStep" @click="confirmInformation">提交</a>
    </div>
    <confirm-Component :confirmData="confirmData"></confirm-Component>
  </div>
</template>
<script>
import { XInput, XButton, PopupPicker, Scroller, Spinner } from "vux";
import { IPicker, IGroup, ICell, Header } from "@/components/Common";
import confirmComponent from "../../view/InvoiceManagement/confirmComponent.vue";
import { stop, move } from "@/libs/util";
import { GetUserInvoicesHead } from "@/api/common/Invoices";
export default {
  components: {
    XInput,
    XButton,
    PopupPicker,
    Scroller,
    Spinner,
    ICell,
    IGroup,
    IPicker,
    confirmComponent,
    Header
  },
  data() {
    return {
      GOtitle: "申请发票",
      tableIndex: 0,
      selectIndex: 0,
      type: [
        {
          name: "个人"
        },
        {
          name: "企业"
        }
      ],
      enterprisetype: [
        {
          name: "增值税普通发票（电子）"
        },
        {
          name: "增值税专用发票（电子）"
        }
      ],
      ChooseData1: {
        Listshow: false,
        Index: null
      },
      ChooseData2: {
        Listshow: false,
        Index: null
      },
      foreList1: [],
      foreList2: [],
      confirmData: {
        confirmShow: false,
        Data: {},
        OrderIds: ""
      },
      TotolMoney: 0,
      datas: {
        invoicesHead: "",
        email: "",
        invoiceType: "OE",
        invoiceContent: "",
        registPlaceAddress: "",
        registPlaceTel: "",
        openAccountBank: "",
        openAccount: ""
      }
    };
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  mounted() {
    if (this.$route.query.OrderId) {
      this.confirmData.OrderIds = this.$route.query.OrderId;
      this.TotolMoney = this.$route.query.TotolMoney;
    }
    this.GetUser(0);
  },
  methods: {
    GetUser(id) {
      let data = {
        uId: 1,
        headType: id
      };
      GetUserInvoicesHead(data).then(res => {
        console.log(res);
        if (res.length > 0) {
          if (id == 0) {
            this.foreList1 = res;
          } else if (id == 1) {
            this.foreList2 = res;
          }
        }
      });
    },
    tableselect(index) {
      this.tableIndex = index;
      this.datas.invoicesHead = "";
      if (this.tableIndex == "0") {
        this.GetUser(0);
      } else {
        this.GetUser(1);
      }
    },
    enterpriseselect(index) {
      this.selectIndex = index;
      if (this.selectIndex == "0") {
        this.datas.invoiceType = "OE";
      } else {
        this.datas.invoiceType = "SE";
      }
    },
    goReturn() {
      this.$router.go(-1);
    },
    touchList1() {
      this.ChooseData1.Listshow = !this.ChooseData1.Listshow;
    },
    touchList2() {
      this.ChooseData2.Listshow = !this.ChooseData2.Listshow;
    },
    touchselect(index) {
      this.ChooseData1.Index = index;
      this.$refs.head.blur();
      this.datas.invoicesHead = this.foreList1[index].invoicesHead;
      this.ChooseData1.Listshow = !this.ChooseData1.Listshow;
    },
    touchselect2(item, index) {
      this.ChooseData2.Index = index;
      if (this.selectIndex == "0") {
        this.datas.invoiceContent = item.registrationNumber;
      } else {
        this.datas.invoiceContent = item.registrationNumber;
        this.datas.registPlaceAddress = item.registPlaceAddress;
        this.datas.registPlaceTel = item.registPlaceTel;
        this.datas.openAccountBank = item.openAccountBank;
        this.datas.openAccount = item.openAccount;
      }
      this.datas.invoicesHead = this.foreList2[index].invoicesHead;
      this.ChooseData2.Listshow = !this.ChooseData2.Listshow;
    },
    confirmInformation() {
      let data = {};
      if (this.tableIndex == "0") {
        data.invoiceType = "OE";
        data.invoiceHeadType = "0";
        data.cEmail = this.datas.email;
        data.invoiceHead = this.datas.invoicesHead;
        this.confirmData.Data = data;
        if (!data.cEmail || !data.invoiceHead) {
          this.$vux.toast.show({
            type: "text",
            text: "请填写完个人发票信息!"
          });
          return;
        } else {
          this.confirmData.confirmShow = !this.confirmData.confirmShow;
        }
      }
      if (this.tableIndex == "1") {
        data.invoiceHeadType = "1";
        if (this.selectIndex == "0") {
          data.invoiceType = this.datas.invoiceType;
          data.cEmail = this.datas.email;
          data.invoiceHead = this.datas.invoicesHead;
          data.invoiceContent = this.datas.invoiceContent;
          this.confirmData.Data = data;
          if (!data.cEmail || !data.invoiceHead || !data.invoiceContent) {
            this.$vux.toast.show({
              type: "text",
              text: "请填写完企业发票信息!"
            });
            return;
          } else {
            this.confirmData.confirmShow = !this.confirmData.confirmShow;
          }
        } else {
          data.invoiceType = this.datas.invoiceType;
          data.cEmail = this.datas.email;
          data.invoiceHead = this.datas.invoicesHead;
          data.invoiceContent = this.datas.invoiceContent;
          data.registPlaceAddress = this.datas.registPlaceAddress;
          data.registPlaceTel = this.datas.registPlaceTel;
          data.openAccountBank = this.datas.openAccountBank;
          data.openAccount = this.datas.openAccount;
          this.confirmData.Data = data;
          if (
            !data.cEmail ||
            !data.invoiceHead ||
            !data.invoiceContent ||
            !data.registPlaceAddress ||
            !data.registPlaceTel ||
            !data.openAccountBank ||
            !data.openAccount
          ) {
            this.$vux.toast.show({
              type: "text",
              text: "请填写完整企业发票信息!"
            });
            return;
          } else {
            this.confirmData.confirmShow = !this.confirmData.confirmShow;
          }
        }
      }
      stop();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.bg-box {
  background: #eee;
  position: absolute;
  width: 100%;
  right: 0;
  left: 0;
  top: 3.14rem;
  bottom: 3.14rem;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}
//下拉公共样式
.slide {
  overflow: hidden;
  max-height: 0;
  padding: 0 30px;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
  text-align: left;
  background: #eee;
  li {
    width: 100%;
    height: 3.4rem;
    border-bottom: 1px solid #bbbbbb;

    span {
      display: inline-block;
      vertical-align: text-bottom;
      width: 1.3rem;
      height: 1.3rem;
      font-family: @fontFamily;
      margin: 0.07rem 0.7rem 0 1.5rem;
      .bg-img("759-1");
    }
    p {
      display: inline-block;
      font-size: @plainFontSize;
      margin-top: 1.15rem;
      color: #666666;
      font-family: @fontFamily;
    }
  }
  .aitss {
    span {
      transition: all 0.5s;
      .bg-img("759-2");
    }
    p {
      color: #0562be;
    }
  }
}
.animate {
  max-height: 280px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
  overflow: auto;
}

.content-box {
  text-align: center;
  .type-title {
    height: 3.4rem;
    display: flex;
    justify-content: center;
    border-bottom: 10px solid #eee;
    a {
      display: inline-block;
      width: 50%;
      line-height: 3.4rem;
      font-size: @menuFontSzie;
      font-weight: 500;
      background: #fff;
      &:nth-child(1) {
        border-right: 1px solid #bbb;
      }
    }
    .selects {
      color: #2c7ac7;
    }
  }
  .personalGroup {
    background: #fff;
    .cell {
      height: 3.6rem;
      margin: 0 0.78rem;
      line-height: 3.6rem;
      border: none;
      /deep/ .left {
        margin-right: 2rem;
        flex: none;
        color: #666;
        min-width: 4rem;
        text-align: left;
      }
      .input-box {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        .name {
          font-size: 1rem;
          color: #000;
          line-height: 2.5rem;
          text-align: left;
        }
        .title {
          font-size: 0.7rem;
          line-height: 0.7rem;
          text-align: left;
        }
        .weui-cell {
          padding: 0;
          &::before {
            border: none;
          }
          .weui-cell__primary {
            input {
              point-events: none;
            }
          }
        }
        .price {
          text-align: right;
          font-size: 1rem;
          color: #000;
        }
        .icon-s {
          position: absolute;
          left: -103px;
          top: 0;
          color: #ff0000;
        }
        .iconmt {
          width: 16px;
          height: 20px;
          display: inline-block;
          .bg-img("757");
          background-size: contain;
          position: absolute;
          right: 0;
          top: 1.2rem;
        }
      }
      &:nth-child(1) {
        border-bottom: 1px solid #ebebeb;
      }
    }
    .accept-date {
      text-align: left;
      font-size: 1rem;
      color: #666;
      background: #eee;
      padding: 0.8rem 0 0.8rem 1.5rem;
    }
  }
  .enterpriseGroup {
    background: #fff;
    .enterprisetype {
      background: #eee;
      a {
        width: 11rem;
        height: 4rem;
        display: inline-block;
        border: 1px solid #bbb;
        border-radius: 5px;
        // text-align: center;
        margin: 1rem 10px;
        .p1 {
          font-size: 0.9rem;
          text-align: center;
          margin-left: 7px;
          margin-top: 1rem;
          // line-height: 2.4rem;
        }
        p {
          font-size: 0.7rem;
          text-align: center;
        }
      }
      .selectenterprise {
        border: 1px solid #2c7ac7;
        background: #2c7ac7;
        color: #fff;
      }
    }
    .bgs {
      border-bottom: 1px solid #ebebeb !important;
    }
    .noborder {
      border: none !important;
    }
    .cell {
      height: 3.6rem;
      margin: 0 0.78rem;
      line-height: 3.6rem;
      border: none;
      /deep/ .left {
        margin-right: 2rem;
        flex: none;
        color: #666;
        min-width: 4rem;
        text-align: left;
      }
      .input-box {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        .name {
          font-size: 1rem;
          color: #000;
          line-height: 2.5rem;
          text-align: left;
        }
        .title {
          font-size: 0.7rem;
          line-height: 0.7rem;
          text-align: left;
        }
        .weui-cell {
          padding: 0;
          &::before {
            border: none;
          }
          .weui-cell__primary {
            input {
              point-events: none;
            }
          }
        }
        .price {
          text-align: right;
          font-size: 1rem;
          color: #000;
        }
        .icon-s {
          position: absolute;
          left: -103px;
          top: 0;
          color: #ff0000;
        }
        .iconmt {
          width: 16px;
          height: 20px;
          display: inline-block;
          .bg-img("757");
          background-size: contain;
          position: absolute;
          right: 0;
          top: 1.2rem;
        }
      }
    }

    .accept-date {
      text-align: left;
      font-size: 1rem;
      color: #666;
      background: #eee;
      padding: 0.8rem 0 0.8rem 1.5rem;
    }
    .companyclass {
      position: relative;
      /deep/ .cell {
        .left {
          min-width: 6rem;
          max-width: 7.6rem;
        }
        .input-box {
          .icon-s {
            left: -135px;
          }
        }
      }
    }
  }
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
  .nextStep {
    margin-top: 5.57rem;
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
  }
}
/deep/ .weui-label {
  width: 6rem !important;
  height: 3rem;
  position: absolute;
  left: 0;
  top: 4px;
}
/deep/ .weui-cell__ft {
  margin-right: 20px;
}
</style>
