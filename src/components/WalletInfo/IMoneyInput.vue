<template>
  <div class="input-box">
    <div class="money" @click="inputFocus">
      <div class="currency">￥</div>
      <div class="input"  :style="{width: _width}">
        <input ref="input" type="number" pattern="[0-9]*" v-model="inputVal" @input="input" @focus="inputFocus">
      </div>
    </div>
    <div class="tool">
      <div class="btn" @click="allMoney" v-if="type">全部提取</div>
      <div class="tips-box" v-else>
        <span>最低：￥10</span>
        <span>最高：￥150</span>
      </div>
    </div>
    
    </div>
  </div>
</template>

<script>
import { isMoney } from '@/libs/reg.util'
import { Countup } from 'vux'
const status = ['Income','spending']
export default {
  name: "IMoneyInput",
  props: {
    opts: {
      type: Object,
      default: ()=>{
        return {
          allMoney: 12
        }
      }
    },
    type: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 999999
    }
  },
  components: {
    Countup
  },
  data() {
    return {
      inputVal: '',
      inputWidth: 1,
      show: 2
    }
  },
  methods: {
    input(e) {
      if(!isMoney(e.target.value)){
        e.target.value.slice(0, -1)
      }
      let num = Number(e.target.value)
      console.info(num > this.max);
      if(num > this.max) {
        num = String(e.target.value).slice(0, -1)
      } 
      this.inputVal = num;
    },
    inputFocus() {
      this.$refs.input.focus();
    },
    allMoney() {
      this.inputVal = this.opts.allMoney;
    }
  },
  computed: {
    inputText() {
      return "￥" + this.inputVal;
    },
    _width() {
      return ((String(this.inputVal).length || this.inputWidth) * 0.59) + 'em';
    }
  },
  mounted(){
    this.inputVal = 0.00;
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.input-box {
  box-sizing: border-box;
  padding: 0 1rem;
}
.money{
  font-size:2.5rem;
}
.money {
  color: @theme-color;
  margin: 1.5rem 0 0;
  display: flex;
  border-bottom: 1px solid #AAAAAAFF;
  justify-content: center;
}
.currency{
  width: 3rem;
}
.input{
  width: auto;
}
input{
  display: inline-block;
  box-sizing: border-box;
  font-size: 2.5rem;
  outline: none;
  border-width: 0;
  text-align: center;
  line-height: 3rem;
  width: 100%;
  color: @theme-color;
}
.tool {
  height: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.3rem 0;
}
.tips-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
}
.btn {
  font-size: 0.8rem;
  color: @theme-color;
}
</style>
 