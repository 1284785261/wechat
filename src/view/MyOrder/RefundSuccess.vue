<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <x-icon type="ios-checkmark" class="icon-success-color" size="150"></x-icon>
      <a>退保证金申请提交成功</a>
      <span>退款将在2小时之内按原路退回 [工商银行****]
        请注意查收！</span>
    </div>
    <a class="comiuts" @click="comiuts">确定</a>
  </div>
</template>
<script>
import { Header } from "@/components/Common";
export default {
  components: {
    Header
  },
  data() {
    return {
      GOtitle: "申请退保证金"
    };
  },
  mounted() {},
  methods: {
    comiuts() {
      this.$router.push({ path: "/MyOrderManage" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  text-align: center;
  margin-top: 3.14rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: @menuFontSzie;
    color: #666;
    margin-top: 1.5rem;
  }
  a {
    color: #0562be;
    font-size: @menuFontSzie;
    margin-top: 1.5rem;
    display: inline-block;
    margin-bottom: 2rem;
  }
  span {
    max-width: 18rem;
  }
  .icon-success-color {
    display: block;
    fill: #07b90e;
    margin: 3rem 0 1rem 0;
  }
}
</style>
