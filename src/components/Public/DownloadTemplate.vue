<template>
  <div>
    <div @click="colosmasks" class="mask" :class="templateShow.classShow?'mask2':''">
    </div>
    <div class="parametersModel" :class="templateShow.classShow?'parametersModel2':''">
      <p class="title">下载模板</p>
      <div v-for="(item,index) in templateList" :key="index" class="template">
        <span>{{item.name}}</span>
        <a>下载</a>
      </div>
    </div>
  </div>
</template>
<script>
import { stop, move } from "@/libs/util";
export default {
  name: "DownloadTemplate",
  props: ["templateShow"],
  components: {},
  data() {
    return {
      templateList: [
        {
          name: "报关草单",
          url: "",
          id: 1
        },
        {
          name: "代理报关委托书",
          url: "",
          id: 2
        },
        {
          name: "合同",
          url: "",
          id: 3
        },
        {
          name: "装箱单",
          url: "",
          id: 4
        }
      ]
    };
  },
  mounted() {},
  methods: {
    colosmasks() {
      this.templateShow.classShow = false;
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
  z-index: -1;
}
.mask2 {
  opacity: 0.5;
  z-index: 501;
  filter: alpha(opacity=50);
}
.parametersModel {
  position: fixed;
  top: 50%;
  left: 0;
  width: 92%;
  background: #fff;
  border-radius: 10px;
  margin: 4%;
  opacity: 0;
  transform: translate(0, -50%);
  transition: opacity 300ms;
  padding-bottom: 1rem;
  z-index: -1;
  .title {
    color: #000;
    font-size: @menuFontSzie;
    margin-left: 0.71rem;
    margin-top: 0.57rem;
    text-align: center;
    line-height: 3rem;
  }
  .template {
    margin: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: #333;
      font-size: 1rem;
    }
    a {
      width: 5.3rem;
      height: 1.7rem;
      display: inline-block;
      border: 1px solid #2c7ac7;
      font-size: 1rem;
      color: #2c7ac7;
      text-align: center;
      line-height: 1.7rem;
      border-radius: 5px;
    }
  }
}
.parametersModel2 {
  opacity: 1;
  z-index: 501;
  filter: alpha(opacity=100);
}
</style>
