<template>
  <div>
  	<div class="MobilePhone">
      <div class="phoneTitle">
         <h1>{{_step.tipsTitle}}</h1>
         <h5>{{_step.tipsText}}</h5>
      </div>
     <div class="phoneInput" v-if="stepNum === 0 || stepNum === 1">
       <XInput 
         ref="mobile"
         :placeholder="_step.tipsInput"
         mask="999 9999 9999" 
         v-model="mobile" 
         :max="13" 
         required
         is-type="china-mobile"
         @on-change="change('mobile')"
         @on-enter="nextStep"></XInput>
     </div>
     <div class="verifCodeInput" v-else>
          <XInput 
           type="text"
           required
           ref="VerifCode"
           :placeholder="_step.tipsInput"
           v-model="VerifCode"
           :min="4"
           :max="4"
           @on-change="change('VerifCode')"
           class="weui-vcode">
            <XButton slot="right" :disabled="sendBtn" type="primary" mini @click.native="getVerifCode">{{sendTimingText}}</XButton>
           </XInput>
     </div>
     <div class="submit">
        <XButton :disabled="disabled" @click.native="nextStep">{{_step.btnText}}</XButton>
     </div>
    </div>
  </div>
</template>

<script>
import { XInput, XButton, Group } from 'vux'
export default {
  components: {
  	XInput,
    XButton,
    Group
  },
  props:{
    step: Object,
  },
  data() {
    return {
      mobile: '',
      VerifCode: '',
      disabled: true,
      stepNum:0,
      sendTimingText:'发送验证码',
      sendBtn:false, //禁用
    }
  },
  computed:{
    _step(){
      this.step = this.step || {};
      this.stepNum = this.step.stepNum || 0;
      console.log(this.stepNum);
      return Object.assign(
        { stepNum: 0,
         btnText:'下一步',
         tipsInput:'请输入手机号码', 
         tipsTitle:'修改绑定手机号',
         tipsText:'' 
       }, this.step);
    }
  },
  methods:{
    change(name){
      this.disabled = !this.$refs[name].valid
    },
    getVerifCode(){
        this.sendTiming = 60;
        setInterval(()=>{
          this.sendTiming--;
          if(this.sendTiming <= 0){
            this.sendTimingText = '发送验证码';
            this.sendBtn = false;
            return;
          }
          this.sendBtn = true;
          this.sendTimingText = this.sendTiming + 's';
        }, 1000);
    },
    nextStep(){
      if(this.disabled) return;
      switch(this.stepNum){
        case 0:
          this.submitOldMobile();
        break;
        case 1:
          this.submitNewMobile();
        break;
        case 2:
          this.submitVerifCode();
        break;
      }
      this.mobile = '';
    },
    submitOldMobile(){
      this.$emit('submitOldMobile',this.mobile);
    },
    submitNewMobile(){
      this.$emit('submitNewMobile',this.mobile);
    },
    submitVerifCode(){
      this.$emit('submitVerifCode',this.VerifCode);
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
.phoneTitle {
  margin-bottom: 30px ;
}
.phoneTitle h1{
  height:40px;
  font-size:30px;
  font-family:Segoe UI;
  font-weight:bold;
  line-height:36px;
  color:rgba(0,0,0,1);
}
.phoneTitle h5{
  font-size:14px;
  font-family:Segoe UI;
  font-weight:bold;
  line-height:39px;
  color:rgba(153,153,153,1);
}
.phoneInput{
  border-bottom: 1px solid rgba(153,153,153,1);
}
.verifCodeInput{
  
}
.submit{
  margin-top: 30px;
}
</style>
