<template>
  <div>
  	<div class="update-mobile-phone">
     <MobilePhone 
      :step="step"
      @submitOldMobile="getOldMobile"
      @submitNewMobile="getNewMobile"
      @submitVerifCode="getVerifCode"
      ></MobilePhone> 
    </div>
  </div>
</template>

<script>
import { MobilePhone } from '@/components/MyInfo'
import { Group, Cell } from 'vux'
export default {
  components: {
    MobilePhone,
    Group,
    Cell
  },
  data() {
  	return {
  		step:{ stepNum: 0,
         btnText:'下一步',
         tipsInput:'请输入手机号码', 
         tipsTitle:'修改绑定手机号',
         tipsText:'' 
       },
       OldMobile:'',
       NewMobile:'',
       VerifCode:''
  	}
  },
  methods:{
    getOldMobile(OldMobile){
      this.OldMobile = OldMobile;
      this.step = {
         stepNum: 0,
         btnText:'获取验证码',
         tipsInput:'请输入新手机号码', 
         tipsTitle:'修改绑定手机号',
         tipsText:'' 
      }
      this.step.stepNum++;
    },
    getNewMobile(NewMobile){
      this.NewMobile = NewMobile;
      this.step = {
         stepNum: 1,
         btnText:'验证',
         tipsInput:'请输入验证码', 
         tipsTitle:'请输入验证码',
         tipsText:'验证码已发送至' + this. OldMobile
      }
      this.step.stepNum++;
    },
    getVerifCode(VerifCode){
      this.$vux.confirm.show({
        // 组件除show外的属性
        hideOnBlur: true,
        showCancelButton: false,
        content:`<p style="font-size:20px">换绑成功!</p>`,
        onConfirm : () => {}
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../../main.less';
.update-mobile-phone{
  margin: 100px 30px auto;
}
</style>
