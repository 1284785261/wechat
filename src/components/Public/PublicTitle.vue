<template>
  <div>
    <div @click="colosmasks" class="mask" :class="maskList.PublicTitleShow?'mask2':''">
    </div>
    <div class="title-box" :class="maskList.PublicTitleShow?'parametersModel2':''">
      <p class="bt">{{maskList.title}}</p>
      <div class="content">{{maskList.titleMessage}}</div>
      <div class="fonter-button">
        <XButton @click.native="colosmasks">我知道了</XButton>
      </div>
    </div>
  </div>
</template>
<script>
import { XButton } from "vux";
import { stop, move } from "@/libs/util";
export default {
  name: "PublicTitle",
  components: {
    XButton
  },
  props: ["maskList"],
  data() {
    return {
      //   maskShow: true
    };
  },
  methods: {
    colosmasks() {
      console.log(this.maskList);
      //   this.$emit("closemask", this.maskList);
      this.maskList.PublicTitleShow = false;
      if (this.maskList.type) {
        this.$emit("Agreed", true);
      }
      move();
    }
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
  overflow: hidden;
  z-index: -1;
}
.mask2 {
  opacity: 0.5;
  z-index: 500;
  filter: alpha(opacity=50);
}
.title-box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 92%;
  opacity: 0;
  transform: translate(-50%, -50%);
  min-height: 12rem;
  max-height: 90%;
  background: #fff;
  border-radius: 10px;
  transition: opacity 300ms;
  overflow: hidden;
  z-index: -1;
  .bt {
    font-size: @titleFontSize;
    color: #000;
    font-weight: 500;
    text-align: center;
    margin-top: 1.1rem;
    margin-bottom: 1.1rem;
  }
  .content {
    margin: 0 1.43rem;
    line-height: 1.5rem;
    text-indent: 28px;
    max-height: 70%;
  }
  .fonter-button {
    margin-top: 1.8rem;
    padding: 0 1.43rem;
    margin-bottom: 1.8rem;
  }
}
.parametersModel2 {
  opacity: 1;
  z-index: 501;
}
</style>

