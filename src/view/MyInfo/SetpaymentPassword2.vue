<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <p class="Pay-title">请再次填写以确认</p>
      <PayBox></PayBox>
    </div>
    <div class="footer">
      <a @click="submit" class="nextStep">确定</a>
    </div>
  </div>
</template>
<script>
import { Header } from "@/components/Common";
import { PayBox } from "@/components/MyInfo";
export default {
  components: {
    Header,
    PayBox
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  data() {
    return {
      GOtitle: "设置支付密码",
      ChooseData: {
        msgshow: false,
        message: "深圳仓库",
        showContent: false,
        Listshow: false,
        Index: null
      },
      foreList: [
        {
          name: "中国银行储蓄卡",
          img: require("../../assets/Bankcard/icon-1.png")
        },
        {
          name: "招商银行信用卡",
          img: require("../../assets/Bankcard/icon-2.png")
        },
        {
          name: "工商银行",
          img: require("../../assets/Bankcard/icon-3.png")
        },
        {
          name: "建设银行信用卡",
          img: require("../../assets/Bankcard/icon-4.png")
        }
      ]
    };
  },
  mounted() {},
  methods: {
    key(index) {
      var aInput = $(".keyWord input");
      if (aInput[index].value == "") {
        if (index == 0) {
          return;
        }
        aInput[index - 1].removeAttribute("readonly");
        aInput[index - 1].value = "";
        aInput[index - 1].focus();
        return;
      }
      if (index + 1 > aInput.length - 1) {
        return;
      }
      aInput[index + 1].focus();
      aInput[index].setAttribute("readonly", true);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  margin-top: 3.14rem;
  overflow: hidden;
  .Pay-title {
    font-size: 1rem;
    text-align: center;
    color: #999;
    position: absolute;
    left: 50%;
    top: 10%;
    width: 100%;
    transform: translate(-50%, 0);
  }
}
</style>
