<template>
  <div>
    <div @click="colosmasks" class="mask" :class="maskList.classShow?'mask2':''">
    </div>
    <div class="parametersModel" :class="maskList.classShow?'parametersModel2':''">
      <div class="buttonstyle">
        <a @click="colosmasks">取消</a>
        <a @click="additionalFrom">确定</a>
      </div>
      <div class="serviceListStyle">
        <div v-for="(item,index) in serviceList" :key="item.serverId" :class="item.isShow?'selectShow':''" @click="selectOperation(index)">{{item.serverName}}</div>
      </div>
      <p class="title">*需要添加备注提示信息，在此处添加</p>
    </div>
  </div>
</template>
<script>
import { GetOrderServices } from "@/api/common/PlaceOrder";
export default {
  name: "PublicPrompt",
  props: ["maskList"],
  data() {
    return {
      //   maskShow: true
      serviceList: []
    };
  },
  mounted() {
    this.getOrder();
  },
  watch: {
    "maskList.OrderServer"() {
      for (let i = 0; i < this.serviceList.length; i++) {
        for (let j = 0; j < this.maskList.OrderServer.length; j++) {
          if (
            this.serviceList[i].serverCode ==
            this.maskList.OrderServer[j].serviceCode
          ) {
            this.$set(this.serviceList[i], "isShow", true);
          }
        }
      }
    }
  },
  methods: {
    getOrder() {
      GetOrderServices().then(res => {
        if (res && res.length > 0) {
          this.serviceList = res;
          for (let i = 0; i < this.serviceList.length; i++) {
            this.$set(this.serviceList[i], "isShow", false);
          }
        }
      });
    },
    colosmasks() {
      for (let i = 0; i < this.serviceList.length; i++) {
        this.$set(this.serviceList[i], "isShow", false);
      }
      this.maskList.classShow = false;
    },
    additionalFrom() {
      let arr = [];
      for (let i = 0; i < this.serviceList.length; i++) {
        if (this.serviceList[i].isShow) {
          arr.push(this.serviceList[i].serverCode);
        }
      }
      this.$emit("serviceList", arr);
      this.maskList.classShow = false;
    },
    selectOperation(index) {
      this.$set(
        this.serviceList[index],
        "isShow",
        !this.serviceList[index].isShow
      );
    }
  }
};
</script>
<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #666;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}
.mask2 {
  opacity: 0.5;
  z-index: 500;
  filter: alpha(opacity=50);
}
.parametersModel {
  position: fixed;
  bottom: -20rem;
  left: 0;
  width: 100%;
  height: 20rem;
  z-index: -1;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: bottom 400ms;
  .buttonstyle {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    a {
      color: #2c7ac7;
      font-size: 0.8rem;
      padding: 20px;
    }
  }
  .serviceListStyle {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
    div {
      width: 6rem;
      height: 2.14rem;
      text-align: center;
      color: #999999;
      font-size: 1rem;
      line-height: 2.14rem;
      border: 1px solid #bbbbbb;
      margin: 0.71rem;
      box-sizing: border-box;
      transition: all 500ms;
    }
    .selectShow {
      border: 1px solid #2c7ac7;
      background: #2c7ac7;
      color: #ffffff;
    }
  }
  .title {
    color: #999999;
    font-size: 0.71rem;
    margin-left: 0.71rem;
    margin-top: 0.57rem;
  }
}
.parametersModel2 {
  bottom: -1rem;
  z-index: 501;
}
</style>

