<template>
  <div>
    <div class="tips" :class="{'disabled':_disabled}" @click="showTips">
        <strong v-if="_opts.required">*</strong>
      {{_opts.text}}
    </div>
  </div>
</template>

<script>
export default {
  name:'ITips',
  props:{
    opts: Object,
    disabled: Boolean
  },
  computed:{
    _opts(){
      return Object.assign({
        text:'',
        required:true
      }, this.opts);
    },
    _disabled(){
      return this.disabled || false
    }
  },
  methods:{
    showTips(){
      this.$emit('showTips');
    }
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';
.tips{
  height:44px;
  font-size:16px;
  font-family:PingFang SC;
  font-weight:400;
  line-height:44px;
  color:rgba(0,93,255,1);
  background:rgba(246,246,246,1);
  padding: 0 20px;
}
.tips strong{
  color:rgba(255, 0, 0, 1);
}
.disabled{
  color:rgba(111, 111, 111, 1);
}
.disabled strong{
  color:rgba(111, 111, 111, 1);
}
</style>
