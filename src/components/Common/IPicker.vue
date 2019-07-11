<template>
  <div>
    <div class="picker" :class="{ 'active': !value,'picker-mini': mini }" @click="onChange"></div>
  </div>
</template>

<script>
export default {
  name: "IPicker",
  props: {
    mini: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: {
        type: Boolean,
        default: false
      }
    };
  },
  methods: {
    onChange() {
      this.value = !this.value;
      this.$emit("onChange", !this.value);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.picker {
  .bg-img("icon-6-1");
  background-size: contain;
  min-width: 1.6rem;
  min-height: 1.6rem;
  display: flex;
}
.picker-mini {
  min-width: 1.5rem;
  min-height: 1.5rem;
}
.active {
  .bg-img("icon-6-2");
}
</style>
