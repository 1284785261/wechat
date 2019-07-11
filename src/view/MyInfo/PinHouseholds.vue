<template>
  <div>
  	<Box gap="10px 50px">
      <div class="Title">
          <h1>重要提醒</h1>
      </div>
      <div class="context">
          <h3>尊敬的用户:</h3>
          <div class="txt">
            一旦注销IPS智慧包裹会员账号，您将无法通过IPS智慧包裹APP.IPS微信公众号.
            IPS官网等登录渠道查看及查找回账户等级
            略略略略略略略略略略略略略略略略略略略略略略略略略略
          </div>
      </div>
      <AgreedGgreement></AgreedGgreement>
  	</Box>
  </div>
</template>

<script>
import { AgreedGgreement,MyInfoMenu, OpMyInfoHead } from '@/components/MyInfo'
import { Confirm, Box, Group, Cell } from 'vux'
export default {
  components: {
    OpMyInfoHead,
    MyInfoMenu,
    AgreedGgreement,
    Confirm,
    Box,
    Group,
    Cell
  },
  data() {
  	return {
  		Menus:[
  			{
  				title:'绑定手机号',
  				txt:'15421546542',
  				path:'/'
  			},
  			{
  				title:'注销',
  				txt:'注销后无法恢复，请谨慎操作',
  				path:'/'
  			}
  		]
  	}
  },
  methods:{
  	LoginOut(){
  		this.$vux.confirm.show({
		  // 组件除show外的属性
		  hideOnBlur: true,
		  content:`<p style="font-size:20px">确定要退出吗?</p>`,
		  onCancel : () => {
		    console.log(this) //当前 vm
		  },
		  onConfirm : () => {}
		})
  	}
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';
.Title h1{
  width:99px;
  font-size:24px;
  font-family:Segoe UI;
  font-weight:400;
  line-height:23px;
  color:rgba(51,51,51,1);
  margin: 30px auto;
}
.context h3{
  font-size:16px;
  font-family:Segoe UI;
  color:rgba(85,85,85,1);
}
.context .txt{
  margin-bottom:30px;
  font-size:@plainFontSize;
}
</style>
