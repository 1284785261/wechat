<template>
  <div>
    <IGroup :groupClass="groupClass" class="select-service">
      <div v-if="!TheAwbshow">
        <p class="service-title">选择快递服务商</p>
        <div class="swiper-father">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in serviceList" :key="index"><img :src="item.price" @click="touchservice(item)"></swiper-slide>
            <!-- Optional controls -->
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
      </div>
      <div class="waybill-service" v-else>
        <img :src="waybill.img" @touchstart="NOtouchservice()">
        <p v-if="waybill.othershow" class="waybill-title">{{waybill.title}}</p>
        <XInput placeholder="请输入快递服务商" v-model="waybill.title" class="inputs"></XInput>
        <!-- <b></b> -->
        <ICell title="运单号">
          <div slot="right" class="input-box">
            <XInput placeholder="请输入运单号" v-model="waybill.waybillnumber" @on-blur="waybillservice"></XInput>
          </div>
        </ICell>
      </div>
    </IGroup>
  </div>
</template>
<script>
import { ITextarea, IGroup, ICell } from "@/components/Common";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Card, XDialog, XButton, Group, XInput } from "vux";
import { GetThirdServices } from "@/api/common/PlaceOrder";
export default {
  components: {
    ITextarea,
    ICell,
    IGroup,
    XInput,
    XButton,
    swiper,
    swiperSlide
  },
  data() {
    return {
      serviceList: [],
      TheAwbshow: false,
      waybill: {
        img: "",
        title: "",
        waybillnumber: "",
        othershow: false
      },
      //swiper配置
      swiperOption: {
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置,
        slidesPerView: "auto",
        autoplay: 3000,
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        // pagination: ".swiper-pagination",
        paginationClickable: true,
        navigation: {
          prevEl: ".swiper-button-prev", //上一张
          nextEl: ".swiper-button-next" //下一张
        },
        // scrollbar: ".swiper-scrollbar", //滚动条
        mousewheelControl: true,
        observeParents: true,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
      }
    };
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  mounted() {
    this.GetThird();
  },
  methods: {
    //获取第三方快递方
    GetThird() {
      GetThirdServices().then(res => {
        if (res && res.length > 0) {
          this.serviceList = res;
          this.serviceList[0].price = require("../../assets/fw-1.png");
          this.serviceList[1].price = require("../../assets/fw-2.png");
        }
      });
    },
    touchservice(item) {
      if (item) {
        this.TheAwbshow = !this.TheAwbshow;
        this.waybill.img = item.price;
        this.waybill.title = item.name;
      }
    },
    NOtouchservice() {
      this.TheAwbshow = !this.TheAwbshow;
    },
    waybillservice() {
      let data = {
        thridName: "",
        thridNum: ""
      };
      data.thridName = this.waybill.title;
      data.thridNum = this.waybill.waybillnumber;
      this.$emit("TheAwb", data);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../main.less";
.weui-cell {
  padding: 0;
}
.addrssFrom {
  margin: 0.7rem 0 0 0;
}
.select-service {
  min-height: 7rem;
  //swiper插件样式修改
  background: #fff;
  .service-title {
    font-size: 1rem;
    color: #999999;
    margin-top: 1.21rem;
    text-align: center;
  }
  //运单号样式
  .waybill-service {
    position: relative;
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
      line-height: 3.42rem;
      border-top: 1px solid #ebebeb;
      .left {
        max-width: 4.6rem;
      }
    }
  }
}
.swiper-button-prev {
  width: 1.64rem;
  height: 1.07rem;
  background-size: 16px 29px;
  top: 2.9rem;
  left: 0.9rem;
  outline: none;
}
.swiper-button-next {
  width: 1.64rem;
  height: 1.07rem;
  background-size: 16px 29px;
  top: 2.9rem;
  right: 0.9rem;
  outline: none;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0;
  transition: all 1s;
}
.service-title {
  font-size: @plainFontSize;
  color: #999999;
  margin-top: 1.21rem;
  text-align: center;
}
.swiper-container {
  margin: 0;
  padding: 0;
  margin-top: 1.36rem;
  width: 17.35rem;
  overflow: hidden;
  margin-left: 3.2rem;
  height: 5.93rem;
}
.swiper-wrapper {
  height: 200px;
}
.swiper-slide img {
  max-width: 100%;
  width: 4.2rem;
  height: 4.2rem;
}
.swiper-slide {
  width: 5.2rem !important;
  text-align: center;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-father {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
