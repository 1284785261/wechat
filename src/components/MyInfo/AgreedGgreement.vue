<template>
  <div>
      <div class="AgreedGgreement">
        <div class="confirm">
          <input type="checkbox" id="Agreed" @click="change">
          <label for="Agreed" class="_checkbox.class" @click="change">
            我已阅读并同意
          </label>
          <a href="javascript:;"  @click="popupShow = true">{{_checkbox.title}}</a>
        </div>
        <div class="confirm-btn">
          <XButton :disabled="_btn.disabled">{{_btn.txt}}</XButton>
        </div>
      </div>
      <div v-transfer-dom>
        <popup v-model="popupShow" position="bottom" should-scroll-top-on-show>
           <div class="popup">
             <div class="popupHead">
               <h3>{{_checkbox.title}}</h3><a href="javascript:;" @click="popupShow = false">关闭</a>
             </div>
             <div class="popupBody">
               <ul>
                   <li v-for="item in _checkbox.context">
                     {{item}}
                   </li>
               </ul>
             </div>
             <div class="popupfoot">
               <XButton  :disabled="_btn.disabled" @click.native="popupShow = false">我已知晓</XButton>
             </div>
           </div>
        </popup>
      </div>
  </div>
</template>

<script>
import { TransferDom,  Popup , XButton} from 'vux'

export default {
  name:'AgreedGgreement',
  directives: {
    TransferDom
  },
  components:{
    Popup,
    XButton
  },
  props:{
    checkbox: Object,
    btn: Object
  },
  data(){
    return {
      disabled: true,
      popupShow: false
    }
  },
  methods:{
    change(){
      this.disabled = !this.disabled
    }
  },
  computed:{
    _checkbox (){
      return Object.assign(
      {
          class:'',
          title:'《用户协议》',
          context:['1. 申请注销表示文案内容，注销协议文案内容注销协议文案内容',
             '2. 申请注销表示文案内容，注销协议文案内容注销协议文案内容',
             '3. 申请注销表示文案内容，注销协议文案内容注销协议文案内容',
             '4. 申请注销表示文案内容，注销协议文案内容注销协议文案内容'
          ]
      }, this.checkbox)
    },
    _btn (){
      let def = {
        txt: '确定',
        disabled: this.disabled
      }
      return Object.assign(def, this.btn)
    }
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/close.less';
@import './index.less';
.AgreedGgreement{
  text-align: center;
}
.confirm {
  font-size: @plainFontSize;
  margin-bottom: 10px;
}
.confirm a{
  color: @warnColor;
}
.confirm input[type=checkbox]{
  background: red;
}
.confirm input[type=checkbox] + label{
  height: 20px;
  cursor: pointer;
}
.confirm input[type=checkbox]{
  /* visibility: hidden; */
}
.popup{
  background: #fff;
  padding: 10px 15px;
}
.popupHead{
  display: flex;
}
.popup h3{
  flex: 1;
  text-align: center;
  color: @warnColor;
  font-family: @fontFamily;
  margin-bottom: 20px;
}
.popup a{
  width: 30px;
  font-size: 12px;
  line-height: 30px;
}
.popup .popupBody{
  max-height: 350px;
  overflow: auto;
  color: rgba(51,51,51,1);
  line-height:24px;
  font-size: @plainFontSize;
  margin-bottom: 20px;
}
.popup .popupBody li{
  margin-bottom: 10px;
}
</style>
