<template>
  <div>
    <PopupHeader 
      :left-text="leftText"
      :right-text="rightText"
      :title="title"
      >
    </PopupHeader>
  </div>
</template>

<script>
import { PopupHeader } from 'vux'
export default {
  name:'IPopupHeader',
  components:{
    PopupHeader
  },
   props: {
    leftText: String,
    rightText: String,
    title: String
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';

</style>
