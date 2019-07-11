<template>
  <div class="box">
    <popup-picker confirm-text="确定" :show.sync="showPopupPicker" :title="year1[0] +'-'+(year1[1]>=10?year1[1]:'0'+year1[1])" :data="yearList" v-model="year1" ref="picker3" @on-change="onChange" class="wish"></popup-picker>
    <!-- <datetime title="datetime" v-model="date"></datetime> -->
    <span class="ib"></span>
  </div>
</template>
<script>
import { stop, move } from "@/libs/util";
import { Picker, PopupPicker, Cell, Datetime } from "vux";
import { setTimeout } from "timers";
export default {
  components: {
    Picker,
    PopupPicker,
    Cell,
    Datetime
  },
  props: ["date", "years", "isA"],
  data() {
    return {
      yearList: this.years,
      showPopupPicker: false,
      year1: []
    };
  },
  mounted() {
    this.year1 = this.date;
    let date = new Date();
    this.year1[0] = date.getFullYear() + "";
    this.year1[1] = date.getMonth() + 1 + "";
    console.log(this.isA);
  },
  watch: {
    isA(value, newvalue) {
      console.log(value, newvalue);
      if (value) {
        this.year1 = this.date;
      }
    }
  },
  methods: {
    onChange(value) {
      this.money = this.year1[0];
      let money = this.year1[1] >= 10 ? this.year1[1] : "0" + this.year1[1];
      let date = this.year1[0] + "-" + money + "-01";
      this.$emit("lock", date);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 3.5rem;
  .wish {
    overflow: hidden;
    /deep/ .weui-cell {
      padding: 0 !important;
      display: flow-root;
      .weui-cell__hd {
        .weui-label {
        }
      }
      .vux-cell-primary {
        display: none;
      }
      .weui-cell__ft {
        display: none;
      }
    }
  }
  .ib {
    .bg-img("xibia");
    width: 26px;
    height: 26px;
    display: inline-block;
    background-position: right 8px;
    font-size: 1rem;
  }
}
</style>

