<template>
  <div>
    <div @click="colosmasks" class="mask" :class="shares.classShow?'mask2':''">
    </div>
    <div class="parametersModel" :class="shares.classShow?'parametersModel2':''">
      <div class="serviceListStyle">
        <div v-for="item in shareList">
          <img :src="item.img">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { stop, move } from "@/libs/util";
export default {
  name: "OrderShare",
  props: ["shares"],
  data() {
    return {
      shareList: [
        {
          img: require("../../assets/share-1.png"),
          title: "发送给朋友",
          id: 1
        },
        {
          img: require("../../assets/share-2.png"),
          title: "分享到QQ",
          id: 2
        },
        {
          img: require("../../assets/share-3.png"),
          title: "发送邮件",
          id: 3
        }
      ]
    };
  },
  methods: {
    colosmasks() {
      this.shares.classShow = false;
      move();
    },
    submit() {}
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
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
  bottom: -10rem;
  left: 0;
  width: 100%;
  height: 10rem;
  z-index: 501;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: bottom 300ms;
  .serviceListStyle {
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 2rem;
        max-height: 2rem;
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
      :nth-last-child(2) {
        min-height: 1.5rem;
      }
      p {
        font-size: 1rem;
        color: #000;
      }
    }
  }
}
.parametersModel2 {
  bottom: -1rem;
}
</style>

