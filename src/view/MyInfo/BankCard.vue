<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div v-for="item in BankList" class="BankList">
        <img :src="item.img">
        <p class="bankname">{{item.bankName}}</p>
        <p><span> {{item.bankCardNo | bank(item.bankCardNo)}} </span></p>
      </div>
      <div class="BankList addBank" @click="addBank">
        <x-icon type="ios-plus-outline" size="60" class="icons"></x-icon>
        <span>添加银行卡</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Header } from "@/components/Common";
import { GetBankCards } from "@/api/common/wallat";
import { BankCard } from "../../libs/comms";
import store from "@/store";
export default {
  components: {
    Header
  },
  data() {
    return {
      GOtitle: "银行卡",
      BankList: []
    };
  },
  mounted() {
    if (store.state.app.UserData) {
      this.getData(store.state.app.UserData.userId);
    }
    this.getData(1);
  },
  filters: {
    bank(data) {
      return BankCard(data);
    }
  },
  methods: {
    addBank() {
      this.$router.push({ path: "/addBank" });
    },
    getData(id) {
      GetBankCards(id)
        .then(res => {
          if (res) {
            this.BankList = res;
            for (let i = 0; i < this.BankList.length; i++) {
              this.$set(
                this.BankList[i],
                "img",
                require("../../assets/Bankcard/1012.png")
              );
            }
            console.log(this.BankList);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  margin-top: 3.14rem;
  overflow: hidden;
  .BankList {
    margin: 2rem 1.5rem;
    position: relative;
    border-radius: 5px;
    img {
      width: 100%;
      height: 8rem;
    }

    .bankname {
      bottom: 5.5rem;
      left: 4.5rem;
      font-size: 1.2rem;
    }
    p {
      font-size: 1.4rem;
      position: absolute;
      left: 1rem;
      bottom: 1.5rem;
      color: #fff;
    }
    .icons {
      fill: #0562be;
      margin: 0.8rem 0;
    }
  }
  .addBank {
    border: 1px solid #0562be;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      color: #0562be;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
}
</style>
