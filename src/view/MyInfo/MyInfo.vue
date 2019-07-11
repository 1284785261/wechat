<template>
  <div>
    <div class="MyInfoHead">
      <MyInfoHead></MyInfoHead>
    </div>
    <div class="MyInfoMenu">
      <MyInfoMenu :Menus="Menus"></MyInfoMenu>
    </div>
  </div>
</template>

<script>
import { MyInfoMenu, MyInfoHead } from "@/components/MyInfo";
import { GetUser } from "@/api/common";
import { Group, Cell } from "vux";
export default {
  components: {
    MyInfoHead,
    MyInfoMenu,
    Group,
    Cell
  },
  data() {
    return {
      Menus: [
        {
          title: "实名认证",
          txt: "未认证",
          path: "",
          img: require("../../assets/personal/sm-1.png")
        },
        {
          title: "企业认证",
          txt: "未认证",
          path: "",
          img: require("../../assets/personal/qy.png")
        },
        {
          title: "设置支付密码",
          path: "/SetpaymentPassword",
          img: require("../../assets/personal/pass-2.png")
        },
        {
          title: "钱包",
          path: "/MyWallet",
          img: require("../../assets/personal/qb-3.png")
        },
        {
          title: "银行卡",
          path: "/BankCard",
          img: require("../../assets/personal/yhk-4.png")
        },
        {
          title: "开票资料",
          path: "/",
          img: require("../../assets/personal/kp-5.png")
        },
        {
          title: "优惠券",
          path: "/",
          img: require("../../assets/personal/yhq-6.png")
        }
      ]
    };
  },
  mounted() {
    this.$wechat.ready(() => {
      this.$wechat.checkJsApi({
        jsApiList: ["checkJsApi", "openLocation"],
        success: function(res) {
          console.log("1");
          console.log("success", res);
        }
      });
    });
    this.$wechat.error(function(res) {
      console.log("error", res);
    });
    this.getUserData(15);
  },
  methods: {
    getUserData(uid) {
      GetUser(uid).then(res => {
        if (res) {
          if (
            res.IsRealNameAuthentication == "1" ||
            res.IsRealNameAuthentication == "10"
          ) {
            this.Menus[0].path = "/RealnameAuthentication?IsBind=1";
            this.Menus[0].txt = "已提交";
          } else if (res.IsRealNameAuthentication == "20") {
            this.Menus[0].path = "/RealnameAuthentication?IsBind=1";
            this.Menus[0].txt = "已认证";
          } else {
            this.Menus[0].path = "/RealName?IsBind=1";
          }
          if (res.IsBindEnterprise == 1 || res.IsBindEnterprise == "10") {
            this.Menus[1].path = "/RealnameAuthentication?IsBind=2";
            this.Menus[1].txt = "已提交";
          } else if (res.IsBindEnterprise == "20") {
            this.Menus[1].path = "/RealnameAuthentication?IsBind=2";
            this.Menus[1].txt = "已认证";
          } else {
            this.Menus[1].path = "/RealName?IsBind=2";
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.MyInfoHead {
  padding: 16px;
  .bg-img("Wallet/icon-1@2x");
  background-position: right;
}
</style>
