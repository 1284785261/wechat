<template>
  <div class="hint">
    <icon :type="_type" class="hint-icon" :class="[_opts.class]"></icon>
    <span>{{_opts.text}}</span>
  </div>
</template>

<script>
export default {
  name:'IHint',
  props:{
    opts: Object,
    type: String
  },
  computed:{
    _opts(){
      return Object.assign({
        text:'',
        class: 'error',
      }, this.opts);
    },
    _type(){
      return this.type || 'info-circle'
    }
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';

.hint{
  font-size:1rem;
  font-family:@fontFamily;
  font-weight:400;
  color:rgba(153,153,153,1);
  display: flex;
}
.hint-icon{
  display: block;
  font-size:1.02rem;
  line-height: 20px;
  margin-right: 3px;
}
.hint span{
  display: block;
  font-size:.8rem;
}
</style>
