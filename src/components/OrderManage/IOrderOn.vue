<template>
  <div>
    <div class="order-on">
      <div class="tips">
        <h5>对单号<span class="order-no">{{opts.number}}</span>进行拆票?</h5>
        <div class="num-interval">可拆票区间为 2-{{maxNum}}票</div>
      </div>
      <div class="input-num">
        <input type="number" :value="num" @keyup="inputChange">票
      </div>
      <div class="submit">
        <XButton mini style="width: 80%" @click.native="submit">确定</XButton>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
import { isNumber } from "@/libs/reg.util";
export default {
  name: "IOrderOn",
  components: {
    XButton
  },
  props: {
    opts: {
      type: Object,
      default: () => {
        return {
          orderId: "",
          Weight: 0,
          number: "",
          num: 0
        };
      }
    }
  },
  data() {
    return {
      num: 2
    };
  },
  methods: {
    inputChange(e) {
      // debugger;
      let num = parseFloat(e.target.value);
      let str = "";
      if (num) {
        if (!isNumber(num)) {
          e.target.value = num.slice(0, -1);
          return;
        }
        if (num > this.maxNum) {
          e.target.value = this.maxNum;
          return;
        }
        //
      } else {
        if (num > 10) {
        } else {
          e.target.value = e.target.value.slice(0, -1);
          // e.target.value = "0";
        }
      }
      this.num = e.target.value;
      //  let num = e.target.value;
      //       if(!isNumber(num) || num > this.maxNum || this.num < 2) {
      //         e.target.value = num.slice(0,-1)
      //         this.num = e.target.value
      //         return
      // "this.value=this.value.replace(/\D/g,'')"
    },
    submit() {
      if (this.num >= 2) {
        this.opts.num = parseFloat(this.num);
        if (this.opts.orderId) {
          this.$emit("submit", this.opts);
        }
      } else {
        this.$vux.toast.show({
          text: "最少拆票数量为2票"
        });
        this.num = 2;
      }
    }
  },
  computed: {
    maxNum() {
      return Math.floor(this.opts.Weight / 0.5);
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.order-on {
  background: @background;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.tips h5 {
  font-size: 1rem;
  line-height: 2.5rem;
  color: rgba(102, 102, 102, 1);
}
.tips .order-no {
  color: @theme-color;
}
.num-interval {
  font-size: 0.9rem;
}
.input-num {
  font-size: 1.2rem;
  color: #000;
  margin: 1.5rem 0;
  box-sizing: border-box;
}
.input-num input {
  font-size: 1.5rem;
  width: 6rem;
  padding: 0 1.5rem;
  outline: none;
  border-width: 0;
  border-bottom: 1px solid #999;
  text-align: center;
}
.submit {
  width: 80%;
}
.button.weui-btn {
  width: 100%;
}
</style>
