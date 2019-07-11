<template>
  <div>
    <div class="order-off">
      <div class="tips">
        对单号<span class="opts-tips">{{OrderNosStr}}</span>进行合票?
      </div>
      <div class="submit">
        <XButton mini style="width: 80%" @click.native="submit">确定</XButton>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  name: "IOrderOff",
  components: {
    XButton
  },
  props: {
    opts: {
      type: Object,
      default: () => {
        return {
          OrderNos: []
        };
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.opts);
  },
  methods: {
    submit() {
      this.$emit("submit", this.opts.OrderNos);
    }
  },
  computed: {
    OrderNosStr() {
      let arr = [];
      for (let i = 0; i < this.opts.OrderNos.length; i++) {
        arr.push(this.opts.OrderNos[i].number);
      }
      return arr.join("、");
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.order-off {
  background: @background;
  display: flex;
  min-height: 6rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem 3rem;
}
.tips {
  font-size: 1rem;
  color: rgba(102, 102, 102, 1);
}
.opts-tips {
  color: @theme-color;
}
.submit {
  width: 80%;
}
</style>
