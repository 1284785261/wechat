<template>
  <div class="order-status-box">
    <img v-if="opts.status == '99'" src="../../assets/OrderDetail/yiwanc.png">
    <img v-if="opts.status == '100'" src="../../assets/OrderDetail/icon-1@2x.png">
    <div v-if="opts.status == '100'" class="cancel">
      <p>取消原因</p>
      <p>{{opts.CancelOrderNote}}</p>
    </div>
    <div class="status-box" v-else>
      <div class="s-icon" :class="statusIcon"></div>
      <div class="s-text">{{opts.status | status}}</div>
    </div>
    <div class="status-tips">
      <div class="s-tips">{{opts.statusTips}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IOrderHeadStatus",
  components: {},
  props: {
    opts: {
      type: Object,
      default: () => {
        return {
          // status: 0,
          // statusText: "已预报",
          // statusTips: "请点击发货"
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
  filters: {
    status(val) {
      if (val == 10) {
        return "已预报";
      } else if (val == 20) {
        return "待付款";
      } else if (val == 11) {
        return "待收货";
      } else if (val == 99) {
        return "已完成";
      } else if (val == 100) {
        return "已取消";
      }
    }
  },
  methods: {},
  computed: {
    statusIcon() {
      return [`status-${this.opts.status}`];
    },
    BgStatusimg() {
      return [`BG-${this.opts.status}`];
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.order-status-box {
  height: 8rem;
  color: #fff;
  padding: 0 1rem 1rem;
  background: linear-gradient(
    360deg,
    rgba(5, 22, 111, 1) -50%,
    rgba(45, 117, 242, 1) 70%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    position: absolute;
    right: 0;
    top: -5px;
    width: 100px;
    height: 80px;
  }
}
.cancel {
  p {
    font-size: 1rem;
    line-height: 2rem;
    &:nth-child(2) {
      color: #cbdbf9;
    }
  }
}
.status-box {
  display: flex;
}
.s-icon {
  width: 3rem;
  height: 2.5rem;
}
.s-text {
  font-size: 1.5rem;
  flex: 1;
  margin-left: 0.5rem;
}
.status-10 {
  .bg-img("OrderDetail/icon-2");
}
.status-11 {
  .bg-img("OrderDetail/icon-5@2x");
  background-size: contain;
}
.status-99 {
  .bg-img("OrderDetail/icon-6@2x");
  background-size: contain;
}
.status-20 {
  .bg-img("OrderDetail/icon-7@2x");
  background-size: contain;
}
</style>
