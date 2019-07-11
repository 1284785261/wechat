<template>
  <div class="bg-box">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="waybill-service">
        <img :src="waybill.img">
        <p v-if="waybill.othershow" class="waybill-title">{{waybill.title}}</p>
        <!-- <b></b> -->
        <ICell title="运单号">
          <div slot="right" class="input-box">
            <XInput placeholder="请输入运单号" v-model="waybill.waybillnumber"></XInput>
          </div>
        </ICell>
      </div>
    </div>
    <div class="footer">
      <a @click="submit" class="nextStep">保存</a>
    </div>
  </div>
</template>
<script>
import { Header, IGroup, ICell } from "@/components/Common";
import { XInput } from "vux";
export default {
  components: {
    Header,
    IGroup,
    ICell,
    XInput
  },
  data() {
    return {
      GOtitle: "补填单号",
      waybill: {
        img: "",
        title: "顺风款第",
        waybillnumber: "",
        othershow: true
      }
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.$router.push({ path: "/OrderDetail" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.bg-box {
  height: 100%;
  background: #eee;
}
.content-box {
  overflow: hidden;
  margin: 3.14rem 0 0 0;
  //运单号样式
  .waybill-service {
    position: relative;
    margin-top: 0.6rem;
    background: #fff;
    img {
      width: 2.6rem;
      height: 2.6rem;
      margin: 0.43rem 0 0.43rem 0.7rem;
      vertical-align: top;
    }
    .inputs {
      position: absolute;
      left: 5.3rem;
      top: 1rem;
      &::before {
        border-top: none;
      }
    }
    .waybill-title {
      display: inline-block;
      font-size: @plainFontSize;
      font-family: @fontFamily;
      color: #000000;
      line-height: 3.43rem;
      margin-left: 1.85rem;
      font-weight: 600;
      letter-spacing: 0.1rem;
    }
    /deep/ .cell {
      border-bottom: none;
      height: 3.42rem;
      border-top: 10px solid #eee;
      line-height: 3.42rem;
      .left {
        max-width: 4.6rem;
      }
    }
  }
}
.weui-cell {
  padding: 0;
}
</style>
