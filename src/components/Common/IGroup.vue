<template>
  <div class="group" :class="_groupClass">
    <slot class="cell"></slot>
  </div>
</template>

<script>
export default {
  name:'IGroup',
  props:{
    groupClass: Array
  },
  computed:{
    _groupClass() {
      return this.groupClass
    }
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';
.group{
  .boxshow()
}
.cell{
  border-width: 20rem;
  border-bottom: @border;
}
</style>
