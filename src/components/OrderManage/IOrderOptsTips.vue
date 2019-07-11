<template>
  <div>
    <div class="order-tips-box">
      <div class="buttons">
        <a @click="clance">取消</a>
        <a @click="clance">确定</a>
      </div>
      <div class="opts-icon"></div>
      <div class="opts-tips">{{opts.tips}}</div>
      <div class="opts-reulst">
        <div class="opts-reulst-tips">生成新单号</div>
        <div class="opts-reulst-vaule">{{OrderNosStr}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNumber } from "@/libs/reg.util";
export default {
  name: "IOrderOptsTips",
  props: {
    opts: {
      type: Object,
      default: () => {
        return {
          tips: "",
          OrderNos: []
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    clance() {
      this.$emit("clanceOpt", true);
    }
  },
  computed: {
    OrderNosStr() {
      return this.opts.OrderNos;
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.order-tips-box {
  background: @background;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem 0 2rem;
}
.opts-icon {
  width: 8rem;
  height: 8rem;
  .bg-img("OrderManage/icon-2-1");
}
.opts-tips {
  font-size: 0.81rem;
  color: rgba(153, 153, 153, 1);
  margin-bottom: 1rem;
}
.opts-reulst {
  font-size: 1rem;
  color: rgba(0, 0, 0, 1);
}
.opts-reulst-tips {
  color: #666;
  margin-bottom: 0.7rem;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: #2c7ac7;
    padding: 1rem;
  }
}
</style>
