<template>
  <div>
    <div class="myHead">
      <div class="circle-box">
        <img src="../../assets/delect.png" class="circle two" />
      </div>
      <div class="NickName">
        <NickName></NickName>
      </div>
    </div>
  </div>
</template>

<script>
import Wallet from "./Wallet.vue";
import NickName from "./NickName.vue";
export default {
  components: {
    Wallet,
    NickName
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.myHead {
  margin-top: 6.14rem;
  display: flex;
  align-items: center;
}
.circle-box {
  padding-left: 20px;
}
.circle {
  width: 66px;
  height: 66px;
  flex: 1;
  border: 1px solid rgba(201, 198, 198, 1);
  border-radius: 50%;
}
</style>
