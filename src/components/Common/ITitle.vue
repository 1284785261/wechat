<template>
  <div>
  	<XHeader :left-options="LeftOptions" class="Ititle"></XHeader>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name:'ITitle',
  components: {
  	XHeader
  },
  props:{
    LeftOptions: Object
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';
.Ititle{
	.Ititle();

}
</style>
