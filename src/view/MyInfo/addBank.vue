<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <IGroup :groupClass="groupClass" class="bank-box">
        <div>
          <ICell title="银行卡号" class="bgs">
            <div slot="right" class="input-box">
              <XInput placeholder="请输入"></XInput>
            </div>
          </ICell>
          <ICell title="卡类型" class="bgs">
            <div slot="right" class="input-box touchList">
              <span class="theselected" v-if="ChooseData.msgshow">{{ChooseData.message}}</span>
              <div class="visit-btn " :class="ChooseData.Listshow?'rotate-btn':''" @touchstart="touchList">
                <x-icon type="ios-arrow-right" size="28" class="chooseicon-blue"></x-icon>
              </div>
            </div>
          </ICell>
          <ul class="slide" :class="ChooseData.Listshow?'animate':''">
            <li v-for="(item,index) in foreList" :key="item.name" @touchstart="touchselect(index)" :class="ChooseData.Index == index?'aitss':''">
              <img :src="item.img">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </IGroup>
      <IGroup :groupClass="groupClass" class="bank-box">
        <ICell title="持卡人姓名" class="bgs">
          <div slot="right" class="input-box">
            <XInput placeholder="请输入"></XInput>
          </div>
        </ICell>
        <ICell title="身份证号" class="bgs">
          <div slot="right" class="input-box">
            <XInput placeholder="请输入"></XInput>
          </div>
        </ICell>
      </IGroup>
    </div>
    <div class="footer">
      <a @click="submit" class="nextStep">提交</a>
    </div>
  </div>
</template>
<script>
import { Header, IGroup, ICell } from "@/components/Common";
import { XInput } from "vux";
export default {
  components: {
    Header,
    IGroup,
    ICell,
    XInput
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  data() {
    return {
      GOtitle: "添加银行卡",
      ChooseData: {
        msgshow: false,
        message: "深圳仓库",
        showContent: false,
        Listshow: false,
        Index: null
      },
      foreList: [
        {
          name: "中国银行储蓄卡",
          img: require("../../assets/Bankcard/icon-1.png")
        },
        {
          name: "招商银行信用卡",
          img: require("../../assets/Bankcard/icon-2.png")
        },
        {
          name: "工商银行",
          img: require("../../assets/Bankcard/icon-3.png")
        },
        {
          name: "建设银行信用卡",
          img: require("../../assets/Bankcard/icon-4.png")
        }
      ]
    };
  },
  mounted() {},
  methods: {
    touchList() {
      this.ChooseData.showContent = !this.ChooseData.showContent;
      this.ChooseData.Listshow = !this.ChooseData.Listshow;
    },
    touchselect(index) {
      this.ChooseData.Index = index;
    },
    submit() {}
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  margin-top: 3.14rem;
  overflow: hidden;
  .addrss-parse-box,
  .addrssFrom {
    box-shadow: none;
    border-radius: 0rem;
  }
  .bank-box {
    margin: 1rem;
    box-shadow: 0px 0px 5px #ccc;
    /deep/.cell {
      height: 3.6rem;
      margin: 0 0.78rem;
      line-height: 3.6rem;
      border: none;
      border-bottom: 1px solid #ebebeb;
      .left {
        flex: none;
        color: #000;
        min-width: 5rem;
        text-align: left;
        font-size: 1rem;
      }
    }
  }
}
.input-box {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  .weui-cell {
    padding: 0 15px;
  }
}
.touchList {
  justify-content: flex-end;
}
.slide {
  overflow: hidden;
  max-height: 0;
  position: absolute;
  left: 1.1rem;
  top: 12rem;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
  width: 92%;
  background: #fff;
  box-shadow: 9px 0px 27px #ccc;
  -webkit-z-index: 99;
  -moz-z-index: 99;
  -ms-z-index: 99;
  -o-z-index: 99;
  z-index: 99;
  li {
    height: 3.4rem;
    margin: 0 1rem;
    border-bottom: 1px solid #bbbbbb;
    display: flex;
    justify-content: left;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
    }
    span {
      display: inline-block;
      vertical-align: text-bottom;
      width: 1.3rem;
      height: 1.3rem;
      font-family: @fontFamily;
      margin: 0.07rem 0.7rem 0 1.5rem;
      .bg-img("icon-7-1");
    }
    p {
      display: inline-block;
      font-size: @plainFontSize;
      margin-left: 1.15rem;
      color: #000;
      font-family: @fontFamily;
    }
  }
  .aitss {
    span {
      transition: all 0.5s;
      .bg-img("icon-7-2");
    }
    p {
      color: #0562be;
    }
  }
  :nth-last-child(1) {
    border: none;
  }
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.visit-btn {
  fill: @theme-color;
  color: @theme-color;
  display: flex;
  align-items: center;
  transition: all 0.5s;
}
.rotate-btn {
  transform: rotate(270deg);
}
</style>
