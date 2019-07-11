<template>
  <header id="header">
    <a>
      <x-icon type="ios-arrow-left" size="28" class="chooseicon-blue" @click="goReturn"></x-icon>
      <p>{{GOtitle}}</p>
    </a>
  </header>
</template>
<script>
export default {
  props: ["GOtitle"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goReturn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../main.less";
</style>
