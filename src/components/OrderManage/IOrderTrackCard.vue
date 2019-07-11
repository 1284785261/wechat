<template>
  <div class="track-card-box">
    <div class="track-left">
      <div class="t-icon"></div>
    </div>
    <div class="track-center">
      <div class="t-title">物流信息</div>
      <div class="t-text">最新的物流信息</div>
    </div>
    <div class="track-right">
      <x-icon type="ios-arrow-right" size="30" class="arrow-right" @click="toTrack"></x-icon>
      <!-- <div class="mrge"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "IOrderTrackCard",
  props: {
    opts: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    toTrack() {}
  },
  computed: {}
};
</script>

<style scoped lang="less">
@import "./index.less";
.track-card-box {
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: relative;
}
.track-center {
  flex: 1;
}
.track-left {
  width: 1.5rem;
}
.t-icon {
  width: 1rem;
  height: 1rem;
  .bg-img("OrderDetail/icon-3");
}
.t-title {
  font-size: 1rem;
  color: rgba(3, 3, 3, 1);
  line-height: 1rem;
}
.t-text {
  font-size: 0.8rem;
  color: rgba(51, 51, 51, 1);
  margin: 0.7rem 0 0;
}
.t-text::before {
  content: "●";
  font-size: 0.5rem;
  color: @theme-color;
  margin-right: 0.1rem;
}
.track-right {
  width: 2rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  .arrow-right {
    fill: #0562be;
    position: absolute;
    top: 25%;
    right: 1rem;
  }
}
</style>
