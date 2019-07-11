<template>
  <div>
    <x-icon type="ios-arrow-left" size="28" class="chooseicon-blue" @click="gore" v-if="vpayList.show"></x-icon>
    <span class="titles">使用余额，支付￥495.00的****</span>
    <vpay ref="pays" v-model="vpayList.show" @close="close" @forget="forget" @input-end="inputEnd">
    </vpay>

  </div>
</template>
<script>
export default {
  props: ["vpayList"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    gore() {
      this.$parent.vpayList.show = false;
    },
    //密码弹窗关闭后
    close() {},
    //点击忘记密码
    forget() {},
    //密码输入完成后
    inputEnd() {
      //支付成功
      this.$refs.pays.$success(true).then(res => {
        console.log("支付成功");
        this.$router.push("/TransferSuccess");
      });
      //支付失败
      //   this.$refs.pays.$fail("可以自定义错误提示，默认：支付密码错误");
    }
  }
};
</script>
<style lang="less" scoped>
.chooseicon-blue {
  position: fixed;
  bottom: 360px;
  z-index: 999;
  left: 8px;
  fill: #2c7ac7;
}
.titles {
  position: fixed;
  bottom: 246px;
  left: 28px;
  z-index: 999;
  color: #2c7ac7;
}
/deep/ .zfb-pay {
  .content {
    .pass-box {
      .pass-area {
        height: 55px;
      }
    }
  }
}
</style>