<template>
  <div class="bg-box">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <p><span>订单编号：</span>300011451</p>
      <p><span>保证金金额：</span>123</p>
      <p><span>申请退保金额：</span>123</p>
    </div>
    <a class="comiuts" @click="comiuts">提交申请</a>
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
      this.$router.push({ path: "/RefundSuccess" });
    }
  }
};
</script>
<style lang="less" scoped>
.bg-box {
  height: 100%;
  background: #eee;
}
.content-box {
  overflow: hidden;
  margin-top: 3.14rem;
  background: #fff;
  p {
    margin: 1rem 2rem;
    font-size: 1.1rem;
    color: #000;
    line-height: 2rem;
    span {
      color: #666;
    }
  }
}
</style>
