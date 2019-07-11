<template>
  <div>
    <IGroup :groupClass="groupClass" class="chooseclass">
      <ICell title="收款账户">
        <div slot="right" class="input-box choose-box">
          <span class="theselected" v-if="ChooseData.msgshow">{{ChooseData.message}}</span>
          <div class="visit-btn" :class="ChooseData.Listshow?'rotate-btn':''" @touchstart="touchList">
            <x-icon type="ios-arrow-down" size="28" class="chooseicon-blue"></x-icon>
          </div>
        </div>
      </ICell>
    </IGroup>
    <div class="parametersModel" :class="ChooseData.Listshow?'parametersModel2':''">
      <div class="operation">
        <a @click="cancel">取消</a>
        <a>确定</a>
      </div>
      <Picker :data='years' :columns="1" v-model='year1' @on-change='change'></Picker>
    </div>
  </div>
</template>
<script>
import { IGroup, ICell } from "@/components/Common";
import { Picker } from "vux";
export default {
  components: {
    IGroup,
    ICell,
    Picker
  },
  data() {
    return {
      ChooseData: {
        msgshow: false,
        message: "深圳仓库",
        showContent: false,
        Listshow: false,
        Index: null
      },
      year1: [],
      years: [
        {
          name: "工商银行[****]",
          value: 1
        },
        {
          name: "工商银行[****]",
          value: 2
        },
        {
          name: "添加银行卡",
          value: 3
        }
      ]
    };
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  mounted() {},
  methods: {
    touchList() {
      this.ChooseData.showContent = !this.ChooseData.showContent;
      this.ChooseData.Listshow = !this.ChooseData.Listshow;
    },
    cancel() {
      this.ChooseData.Listshow = !this.ChooseData.Listshow;
    },
    change(value) {
      console.log("new Value", value);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.input-box {
  box-sizing: border-box;
}
.addrss-parse-box,
.addrssFrom {
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.16);
  border-radius: 0rem;
}
.group {
  position: relative;
  box-shadow: none !important;
  margin-top: 2rem;
  .Chooseicon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    .bg-img("icon-4-1");
    position: absolute;
    left: 0.7rem;
    top: 1rem;
  }
  /deep/ .cell {
    border: none;
    .left {
      max-width: 6rem;
      color: #000;
      font-weight: bold;
    }
    .choose-box {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      .theselected {
        color: #2c7ac7;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
}
.slide {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
  li {
    width: 100%;
    height: 3.4rem;
    border-bottom: 1px solid #bbbbbb;

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
      margin-top: 1.15rem;
      color: #666666;
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
  transform: rotate(-180deg);
}
.parametersModel {
  position: fixed;
  bottom: -18rem;
  left: 0;
  width: 100%;
  height: 18rem;
  z-index: -1;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: bottom 400ms;
  .operation {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bbb;
    a {
      font-size: 1rem;
      margin: 10px;
      color: #0562be;
    }
  }
  .vux-picker {
    height: 100%;
  }
}
.parametersModel2 {
  bottom: -1rem;
  z-index: 501;
}
</style>
