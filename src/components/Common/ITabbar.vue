<template>
  <div class="tabbar-box">
        <div class="tabbar-fixed" :style="{height:_height}">
          <slot name="list">
            <slot name="item"></slot>
          </slot>
        </div>
  </div>
</template>

<script>
export default {
  name:'ITabbar',
  props:{
    height: {
      type: Number,
      default:3.5
    }
  },
  data() {
    return {
        
    }
  },
  computed:{
    _height() {
      return this.height + 'rem';
    }
  },
  methods:{
    
  }
}
</script>

<style scoped lang="less">
@import './index.less';
.tabbar-box {
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0rem 0rem 1rem .2rem rgba(153,153,153,0.16);
  padding: .5rem 0;
  height: 3.5rem;
  position: relative;
}
.tabbar-fixed{
  background: @background;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 3.5rem;
  width: 100%;
}
</style>
