<template>
  <div>
    <XButton :disabled = "disabled">{{_opts.text}}</XButton>
  </div>
</template>

<script>
import { XButton } from 'vux'

export default {
  components: {
    XButton
  },
  name:'IButton',
  props:{
    opts: Object,
    disabled: Boolean
  },
  data () {
    return {
      blockedBalances:'0.00',
      individualBalance:'0.00',
      accountBalance:'0.00',
    }
  },
  computed:{
    _opts(){
      return Object.assign({ 
        text:' 确定'
      }, this.opts);
    },
    _disabled(){
      return this.disabled || false;
    }
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';

.card-flex {
  display: flex;
}
.card-wallet {
}
.card-padding {
  padding: 15px;
}
.card-flex > div {
  text-align: center;
  padding: 10px 0;
  flex: 1;
  font-size: @titleFontSize;
}
.card-flex span {
  text-align: center;
  color: @color;
  font-weight: 400;
  font-size: @titleFontSize;
}
.card-flex .txt
{
  font-size: 11px;
} 
.weui-panel{
  background: transparent;
}
.vux-1px-r::after{
  border-right: 2px solid #fff;
  color: #fff;
}
</style>
