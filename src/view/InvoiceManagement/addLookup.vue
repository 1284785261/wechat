<template>
  <div style="overflow: hidden;">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="lookup-type">
        <span>抬头类型</span>
        <div>
          <a :class="{'tit':selectIndex == 1}"><span :class="selectIndex == 1?'select2':'select1'" @click="lookUp1()"></span>企业</a>
          <a :class="{'tit':selectIndex == 2}"><span :class="selectIndex == 2?'select2':'select1'" @click="lookUp2()"></span>个人</a>
        </div>
      </div>
      <IGroup class="personal" v-if="selectIndex == 2">
        <ICell title="个人">
          <div slot="right" class="input-box">
            <span class="icon-s">*</span>
            <XInput title=" " placeholder="请输入发票抬头" v-model="personal.name"></XInput>
          </div>
        </ICell>
        <x-switch title="设为默认" v-model="show" class="switchclass"></x-switch>
      </IGroup>
      <IGroup class="personal enterprise" v-if="selectIndex == 1">
        <ICell title="名称">
          <div slot="right" class="input-box">
            <span class="icon-s">*</span>
            <XInput title=" " placeholder="请输入企业名称" v-model="enterprise.invoicesHead"></XInput>
          </div>
        </ICell>
        <ICell title="纳税人识别号">
          <div slot="right" class="input-box">
            <span class="icon-s">*</span>
            <XInput title=" " placeholder="请输入纳税人识别号" v-model="enterprise.registrationNumber"></XInput>
          </div>
        </ICell>
        <p class="move-title">输入完整信息，以开增值税专用发票</p>
        <ICell title="地址">
          <div slot="right" class="input-box">
            <XInput title=" " placeholder="请输入企业地址" v-model="enterprise.registPlaceAddress"></XInput>
          </div>
        </ICell>
        <ICell title="电话">
          <div slot="right" class="input-box">
            <XInput title=" " placeholder="请输入企业电话" v-model="enterprise.registPlaceTel"></XInput>
          </div>
        </ICell>
        <ICell title="开户银行">
          <div slot="right" class="input-box">
            <XInput title=" " placeholder="请输入开户银行" v-model="enterprise.openAccountBank"></XInput>
          </div>
        </ICell>
        <ICell title="银行账号">
          <div slot="right" class="input-box">
            <XInput title=" " placeholder="请输入银行账号" v-model="enterprise.openAccount"></XInput>
          </div>
        </ICell>
        <!-- <ICell title="设为默认">
          <div slot="right" class="input-box"> -->
        <x-switch title="设为默认" v-model="show1" class="switchclass"></x-switch>
        <!-- </div>
        </ICell> -->
      </IGroup>
    </div>
    <a class="nextStep" @click="confirmInformation">保存</a>
  </div>

</template>
<script>
import { IPicker, IGroup, ICell, Header } from "@/components/Common";
import { Checklist, XInput, XSwitch } from "vux";
import { setTimeout } from "timers";
import { EditUserInvoice, GetUserInvoicesDetail } from "@/api/common/Invoices";
export default {
  name: "InvoiceLookup",
  components: {
    IGroup,
    ICell,
    IPicker,
    Checklist,
    XInput,
    XSwitch,
    Header
  },
  data() {
    return {
      GOtitle: "申请发票",
      selectIndex: "1",
      radioValue: "",
      commonList: ["企业", "个人"],
      show: false,
      show1: false,
      personal: {
        name: ""
      },
      enterprise: {
        invoicesHead: "",
        registrationNumber: "",
        registPlaceAddress: "",
        registPlaceTel: "",
        openAccountBank: "",
        openAccount: ""
      }
    };
  },
  computed: {},
  mounted() {
    console.log(this.$route.query);
    if (this.$route.query.invoiceId) {
      this.GetUserDetail(this.$route.query.invoiceId);
    }
  },
  methods: {
    GetUserDetail(id) {
      GetUserInvoicesDetail(id).then(res => {
        console.log(res);
        if (res) {
          if (res.headType == "1") {
            this.selectIndex = "1";
            this.enterprise.invoicesHead = res.invoicesHead;
            this.enterprise.registrationNumber = res.registrationNumber;
            this.enterprise.registPlaceAddress = res.registPlaceAddress;
            this.enterprise.registPlaceTel = res.registPlaceTel;
            this.enterprise.openAccountBank = res.openAccountBank;
            this.enterprise.openAccount = res.openAccount;
            if (res.isDefault == "0") {
              this.show1 = true;
            } else {
              this.show1 = false;
            }
          } else {
            this.selectIndex = "2";
            this.personal.name = res.invoicesHead;
            if (res.isDefault == "0") {
              this.show = true;
            } else {
              this.show = false;
            }
          }
        }
      });
    },

    lookUp1() {
      this.selectIndex = 1;
      if (!this.$route.query.invoiceId) {
        this.personal = {
          name: ""
        };
      }
    },
    lookUp2() {
      this.selectIndex = 2;
      if (!this.$route.query.invoiceId) {
        this.enterprise = {
          invoicesHead: "",
          registrationNumber: "",
          registPlaceAddress: "",
          registPlaceTel: "",
          openAccountBank: "",
          openAccount: ""
        };
      }
    },
    confirmInformation() {
      let data = {};
      if (this.selectIndex == "2") {
        if (!this.personal.name) {
          this.$vux.toast.show({
            type: "text",
            text: "请填写完个人发票抬头!"
          });
          return;
        } else {
          data.userId = 1;
          data.invoicesHead = this.personal.name;
          data.headType = "0";
          data.invoicesType = "OE";
          if (this.show) {
            data.isDefault = "0";
          } else {
            data.isDefault = "9999";
          }
          EditUserInvoice(data).then(res => {
            console.log(res);
            if (res) {
              this.$vux.toast.show({
                type: "text",
                text: "添加个人抬头成功！"
              });
              setTimeout(() => {
                this.$router.push({ path: "/InvoiceLookup" });
              }, 2000);
            }
          });
        }
      }
      if (this.selectIndex == "1") {
        let isgo = true;
        for (let key in this.enterprise) {
          if (!this.enterprise[key]) {
            isgo = false;
            this.$vux.toast.show({
              type: "text",
              text: "请填写完企业发票抬头信息!"
            });
            return;
          }
        }
        if (isgo) {
          data.userId = 1;
          data.invoicesHead = this.enterprise.invoicesHead;
          data.registrationNumber = this.enterprise.registrationNumber;
          data.registPlaceAddress = this.enterprise.registPlaceAddress;
          data.registPlaceTel = this.enterprise.registPlaceTel;
          data.openAccountBank = this.enterprise.openAccountBank;
          data.openAccountBank = this.enterprise.openAccountBank;
          data.headType = "1";
          data.invoicesType = "SE";
          if (this.show1) {
            data.isDefault = "0";
          } else {
            data.isDefault = "9999";
          }
          EditUserInvoice(data).then(res => {
            if (res) {
              this.$vux.toast.show({
                type: "text",
                text: "添加企业抬头成功！"
              });
              setTimeout(() => {
                this.$router.push({ path: "/InvoiceLookup" });
              }, 2000);
            }
          });
        } else {
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  margin-top: 3.14rem;
  overflow: hidden;
  .lookup-type {
    margin-left: 1.2rem;
    border-bottom: 1px solid #bbbbbb;
    min-height: 3.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    span {
      line-height: 3.4rem;
      color: #000;
      font-size: 1rem;
    }
    div {
      a {
        color: #999;
        margin-right: 2rem;
        font-size: 1rem;
        line-height: 3.4rem;
        .select1 {
          width: 20px;
          height: 20px;
          display: inline-block;
          .bg-img("type-sel-1");
          background-size: contain;
          margin-right: 0.3rem;
          margin-bottom: -2px;
          vertical-align: text-top;
        }
        .select2 {
          width: 20px;
          height: 20px;
          display: inline-block;
          .bg-img("type-sel-2");
          background-size: contain;
          margin-right: 0.3rem;
          margin-bottom: -2px;
          vertical-align: text-top;
        }
      }
      .tit {
        color: #000;
      }
    }
  }
  .personal {
    margin-left: 1.2rem;
    box-shadow: none;
    .cell {
      border: none;
      /deep/ .left {
        min-width: 2rem;
        margin-right: 1.4rem;
        color: #666666;
      }
      .input-box {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        padding: 0;
        .weui-cell {
          padding: 0;
          &::before {
            border: none;
          }
          // /deep/ .weui-cell__primary {
          //   input {
          //     height: 2.5em;
          //     line-height: 2.5;
          //     font-size: 1rem;
          //   }
          // }
        }
        .icon-s {
          position: absolute;
          left: -64px;
          top: 0;
          color: #0a65bf;
        }
      }
    }
  }
  .enterprise {
    .cell {
      border-bottom: 1px solid #bbb;
      /deep/ .left {
        min-width: 6rem;
        margin-right: 1.4rem;
        color: #666666;
      }
      .input-box {
        .icon-s {
          position: absolute;
          left: -126px;
          top: 0;
          color: #0a65bf;
        }
      }
      &:nth-last-child(2) {
        border: none;
      }
    }
    .move-title {
      font-size: 0.8rem;
      height: 3rem;
      line-height: 3rem;
      border-bottom: 1px solid #bbb;
    }
  }
}
.nextStep {
  margin-top: 4rem;
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

//修改vux默认按钮样式
.switchclass {
  padding: 10px;
  margin-top: 10px;
  font-size: 1rem;
  color: #666666;
  &::before {
    border: none;
  }
  /deep/ .weui-cell__ft {
    .weui-switch {
      width: 46px;
      height: 26px;
      &::before {
        width: 44px;
        height: 24px;
      }
      &::after {
        width: 24px;
        height: 24px;
      }
    }
  }
}
/deep/ .weui-label {
  width: 4rem !important;
  height: 3rem;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
