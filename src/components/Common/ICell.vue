<template>
  <div class="cell">
    <slot name="left">
      <div class="left" v-if="title">
        {{title}}
      </div>
    </slot>
    <slot name="right">
      <div class="right">
        <span>{{_opts.text}}</span>
        <x-icon type="ios-arrow-right" size="30" v-if="_opts.icon"></x-icon>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name:'ICell',
  props:{
    title: String,
    opts: Object
  },
  data () {
    return {
      
    }
  },
  computed:{
    _opts() {
      return Object.assign({
        text:'',
        icon:false
      }, this.opts)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';
.cell{
  display: flex;
  height:3rem;
  background:rgba(255,255,255,1);
  border-radius:0rem 0rem 0rem 0rem;
  line-height: 3rem;
  box-sizing: border-box;
  padding: 0 .7rem;
}
.left ,
.right{
  flex: 1;
  font-size:1rem;
  font-family:@fontFamily;
}
.left {
  max-width: 5.6rem;
  color:rgba(153,153,153,1);
}
.right{
  color:rgba(0,0,0,1);
  display: flex;
  align-items: center;
}
</style>
