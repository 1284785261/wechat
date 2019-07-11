<template>
  <div>
    <div class="myHead">
      <div class="circle-box">
        <div class="circle one">
          <!-- <div></div> -->
        </div>
        <img :src="headimgurl" class="circle twos" @click="toEditMyInfo">
        <div class="circle three">
          <img src="../../assets/personal/v-1.png">
        </div>
      </div>
      <div class="NickName">
        <NickName :User='UserData'></NickName>
      </div>
      <Wallet :User='UserData'></Wallet>
    </div>
  </div>
</template>

<script>
import Wallet from "./Wallet.vue";
import NickName from "./NickName.vue";
import store from "@/store";

export default {
  components: {
    Wallet,
    NickName
  },
  data() {
    return {
      headimgurl: "",
      UserData: ""
    };
  },
  mounted() {
    console.log(store.state.app.UserData);
    if (store.state.app.UserData) {
      this.UserData = store.state.app.UserData;
      this.headimgurl = this.UserData.headimgurl;
      console.log(this.headimgurl);
    }
  },
  methods: {
    toEditMyInfo() {
      const route = {
        path: "/OpMyInfo"
      };
      this.$router.push(route);
    }
  }
};
</script>

<style scoped lang="less">
.myHead {
  margin-top: 50px;
  background: #ededed;
  border-radius: 10px;
  box-shadow: 0px 2px 9px rgba(68, 68, 68, 0.16);
  position: relative;
}
.circle-box {
  width: 223px;
  display: flex;
  margin: 0 auto;
}
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 78px;
  flex: 1;
  border-radius: 50%;
  margin-top: -39px;
}
.twos {
  width: 75px;
  height: 75px;
  display: inline-block;
  background: rgba(201, 198, 198, 1);
}
.one div,
.three img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(201, 198, 198, 1);
}
.NickName {
  border-bottom: 1px solid #fff;
}
</style>
