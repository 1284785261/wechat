<template>
  <div style="overflow: hidden;">
    <Header :GOtitle="GOtitle"></Header>
    <div class="Delivery-box">
      <div class="delivery-type">
        <div class="delivery">
          <div class="type-box" :class="{'active': tabIndex }" @click="onChange()">
            <div class="type-icon typeone"></div>
            <div>上门取件</div>
          </div>
        </div>
        <div class="delivery">
          <div class="type-box" :class="{'active': !tabIndex }" @click="onChange()">
            <div class="type-icon typetwo"></div>
            <div>自行寄件</div>
          </div>
        </div>
      </div>
      <div class="bg-box">
        <div v-if="tabIndex">
          <div class="hint">
            <IHint :opts="Hint.opts"></IHint>
          </div>
          <IGroup :groupClass="groupClass">
            <Card>
              <div class="addrss-parse" slot="content">
                <h5>地址解析</h5>
                <div class="textarea">
                  <ITextarea :opts="addrssParse.opts" :type="addrssParse.type" :maxLen="addrssParse.maxlen" @submitAddress='submitAddress'></ITextarea>
                </div>
              </div>
            </Card>
          </IGroup>
          <IGroup :groupClass="groupClass">
            <ICell title="联系人">
              <div slot="right" class="input-box">
                <XInput placeholder="*先生(女生)" v-model="form.userName"></XInput>
              </div>
            </ICell>
            <ICell title="电话">
              <div slot="right" class="input-box">
                <XInput type="tel" placeholder="请输入***" v-model="form.telNumber"></XInput>
              </div>
            </ICell>
            <ICell title="取件地址">
              <div slot="right" class="input-box addrs-box">
                <div class="addrs-select-box">
                  <XInput placeholder="XX市-XX区-XX街道" v-model="form.addrsArea"></XInput>
                </div>
                <div class="addrs-btn-box">
                  <div class="addrs-btn" @click="getAddressList"></div>
                </div>
              </div>
            </ICell>
            <ICell>
              <div slot="right" class="input-box address-fill">
                <XInput placeholder="请填写详细地址(精确到门牌号)" v-model="form.detailInfo"></XInput>
              </div>
            </ICell>
          </IGroup>
          <IGroup :groupClass="groupClass">
            <ICell title="预约上门">
              <div slot="right" class="input-box visit-box">
                <div></div>
                <div class="visit-btn" @click="openPopup('visitTime')">
                  <div class="visit-time">{{form.visitTime}}</div>
                  <x-icon type="ios-arrow-right" size="28"></x-icon>
                </div>
              </div>
            </ICell>
          </IGroup>
        </div>
        <div v-else class="ChooseWarehouse">
          <IGroup :groupClass="groupClass" class="chooseclass">
            <span class="Chooseicon"></span>
            <ICell title="选择交货仓库">
              <div slot="right" class="input-box choose-box">
                <span class="theselected">{{ChooseData.message}}</span>
                <div class="visit-btn" :class="ChooseData.Listshow?'rotate-btn':''" @touchstart="touchList">
                  <x-icon type="ios-arrow-right" size="28" class="chooseicon-blue"></x-icon>
                </div>
              </div>
            </ICell>
          </IGroup>
          <ul class="slide" :class="ChooseData.Listshow?'animate':''">
            <li v-for="(item,index) in foreList" :key="item.wareId" @click="touchselect(index)" :class="ChooseData.Index == index?'aitss':''">
              <span></span>
              <p>{{item.detailAddress}}</p>
            </li>
          </ul>
          <IGroup :groupClass="groupClass" class="delivery-way">
            <ICell :title="item.title" v-for="(item,index) in ChooseWay" :key="index">
              <div slot="right" class="picker">
                <div class="line-ways"></div>
                <a :class="selectIndex == index?'selecta':''" @click="selcetWay(index)"></a>
              </div>
            </ICell>
          </IGroup>
          <waybill-Service @TheAwb="TheAwb" v-if="selectIndex == '1'"></waybill-Service>
          <div class="warning">
            <p><span></span>如沒有单号，可发货后到订单管理中补录</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer2">
      <a v-if="tabIndex" @click="submit" class="nextStep">下一步</a>
      <a v-else @click="submit" class="nextStep">提交</a>
    </div>
    <div>
      <div class="visit-select">
        <div v-transfer-dom>
          <Popup v-model="popupMode.visitTime">
            <PopupHeader left-text="取消" @on-click-left="popupMode.visitTime = false"></PopupHeader>
            <div>
              <div class="visit-select-box">
                <div class="visit-select-list">
                  <ul>
                    <li v-for="(item, index) in visitTimes" :key="index" @click="selectVisitTime(index)" :class="{ 'acitve': popupModeObj.visitTime.index === index }">{{item}}</li>
                  </ul>
                </div>
                <div class="visit-select-context">
                  <ul>
                    <li v-for="(item, index) in visitTimeVal" :key="index" @click="setVisitTime(index)" :class="{ 'acitve': popupModeObj.visitTime.timeIndex === index }">{{item}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {
  IPicker,
  IPopupHeader,
  IGroup,
  ICell,
  ITextarea,
  IHint,
  Header
} from "@/components/Common";
import waybillService from "@/components/Public/waybillService.vue";
import {
  setSession,
  getSession,
  MP,
  MapPOI,
  getMapPoint,
  getWeeks,
  dateFromat,
  addDay
} from "@/libs/util";
import Map from "@/libs/maputil";
import { getWxConfig, GetUser } from "@/api/common";
import { initWxConfig } from "@/libs/wechat";
import {
  TransferDom,
  Card,
  XDialog,
  XButton,
  Group,
  XInput,
  Selector,
  PopupHeader,
  Popup,
  Checklist
} from "vux";
import store from "@/store";
import { debuglog } from "util";

import { GetWareHousies } from "@/api/common/PlaceOrder";
let thisDate = new Date();
const visitTime = [
  dateFromat(thisDate),
  dateFromat(addDay(1)),
  dateFromat(addDay(2))
];
const visitTimes = [
  `今天(${getWeeks(thisDate.getDay())})`,
  `明天(${dateFromat(addDay(1))})`,
  `后天(${dateFromat(addDay(2))})`
];
const visitTimeVals = [
  [
    "两小时上门",
    "09:00-11:00",
    "09:00-11:00",
    "09:00-11:00",
    "09:00-11:00",
    "09:00-11:00"
  ],
  ["09:00-11:00", "09:00-11:00", "09:00-11:00", "09:00-11:00", "09:00-11:00"],
  ["09:00-11:00", "09:00-11:00", "09:00-11:00", "09:00-11:00", "09:00-11:00"]
];
let _map = new Map();
let pageKey = "page-delivery";

export default {
  directives: {
    TransferDom
  },
  components: {
    IHint,
    ITextarea,
    ICell,
    IGroup,
    IPopupHeader,
    Card,
    XDialog,
    Selector,
    Group,
    XInput,
    XButton,
    PopupHeader,
    Popup,
    IPicker,
    Checklist,
    swiper,
    swiperSlide,
    waybillService,
    Header
  },
  data() {
    return {
      Hint: {
        opts: {
          text:
            "提示：货物大于19KG且在某某某填写提示的信息内容在此处 编辑填写提示的信息内容在此处编辑填写"
        }
      },
      addrssParse: {
        opts: {
          tips: "将信息粘贴到输入框会自动识别地址无需再手动输入",
          hint:
            "例：张三，15*********，广东省深圳市某某区某某号 (仅支持单条解析)"
        },
        type: {
          type: "btn",
          text: "确定"
        },
        maxlen: 100
      },
      tabIndex: true,
      visitTimes: visitTimes,
      visitTimeVal: [],
      popupMode: {
        visitTime: false
      },
      popupModeObj: {
        visitTime: {
          index: 0,
          timeIndex: 0
        }
      },
      form: {
        userName: "",
        telNumber: "",
        province: "",
        city: "",
        region: "",
        addrsArea: "",
        detailInfo: "",
        visitTime: ""
      },
      ChooseData: {
        msgshow: false,
        message: "",
        id: "",
        showContent: false,
        Listshow: false,
        Index: null
      },
      foreList: [],
      GOtitle: "交货方式",
      ChooseWay: [
        {
          title: "自送到仓库"
        },
        {
          title: "快递到货"
        }
      ],
      //选中的方式
      selectIndex: 0,
      ThridExpressInfo: {},
      orderId: ""
    };
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  methods: {
    //获取收货仓库
    GetWares() {
      GetWareHousies().then(res => {
        if (res && res.length > 0) {
          this.foreList = res;
        }
      });
    },

    //获取地址字符串并解析
    submitAddress(data) {
      let PersonalInformation = {
        userName: "",
        IPhone: "",
        province: "",
        city: "",
        area: "",
        detail: ""
      };
      let reg = /^[0-9]+.?[0-9]*$/;
      let arr = [];
      if (
        data.indexOf(",") > -1 ||
        data.indexOf(" ") > -1 ||
        data.indexOf("，") > -1
      ) {
        if (data.indexOf(",") > -1) {
          arr = data.split(",");
        } else if (data.indexOf(" ") > -1) {
          arr = data.split(" ");
        } else if (data.indexOf("，") > -1) {
          arr = data.split("，");
        }
        for (let i = 0; i < arr.length; i++) {
          if (reg.test(arr[i])) {
            if (arr[i].indexOf("1") > -1) {
              PersonalInformation.IPhone = arr[i].substring(
                arr[i].indexOf("1"),
                arr[i].indexOf("1") + 11
              );
            }
          } else if (arr[i].indexOf("省") > -1) {
            PersonalInformation.province = arr[i].substring(
              0,
              arr[i].indexOf("省") + 1
            );
            if (arr[i].indexOf("市") > -1) {
              PersonalInformation.city = arr[i].substring(
                arr[i].indexOf("省") + 1,
                arr[i].indexOf("市") + 1
              );
            }
            if (arr[i].indexOf("区") > -1) {
              PersonalInformation.area = arr[i].substring(
                arr[i].indexOf("市") + 1,
                arr[i].indexOf("区") + 1
              );
              PersonalInformation.detail = arr[i].substring(
                arr[i].indexOf("区") + 1,
                arr[i].length
              );
            }
            if (arr[i].indexOf("县") > -1) {
              PersonalInformation.area = arr[i].substring(
                arr[i].indexOf("市") + 1,
                arr[i].indexOf("县") + 1
              );
              PersonalInformation.detail = arr[i].substring(
                arr[i].indexOf("县") + 1,
                arr[i].length
              );
            }
          }
        }

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].indexOf("省") > -1) {
          } else if (reg.test(arr[i])) {
          } else {
            PersonalInformation.userName = arr[i];
          }
        }

        //赋值解析出的个人信息
        this.form.userName = PersonalInformation.userName;
        this.form.telNumber = PersonalInformation.IPhone;
        this.form.province = PersonalInformation.province;
        this.form.city = PersonalInformation.city;
        this.form.region = PersonalInformation.area;
        this.form.addrsArea =
          PersonalInformation.province +
          "—" +
          PersonalInformation.city +
          "—" +
          PersonalInformation.area;
        this.form.detailInfo = PersonalInformation.detail;
      } else {
        this.$vux.toast.show({
          type: "text",
          text: "输入格式错误,解析失败"
        });
      }
    },
    onChange() {
      this.tabIndex = !this.tabIndex;
    },
    openPopup(ThisName) {
      this.popupMode[ThisName] = true;
    },
    selectVisitTime(index) {
      if (index === this.popupModeObj.visitTime.index) return;
      this.popupModeObj.visitTime.timeIndex = 0;
      this.popupModeObj.visitTime.index = index;
      this.visitTimeVal = visitTimeVals[index || 0];
    },
    setVisitTime(index) {
      this.popupModeObj.visitTime.timeIndex = index;
      this.form.visitTime = `${visitTime[this.popupModeObj.visitTime.index]} ${
        this.visitTimeVal[index]
      } `;
      this.popupMode.visitTime = false;
    },
    async getAddressList() {
      //获取坐标
      let point = await _map.getCurrentPoint();
      let mPoint = _map.getPoint(point.point.lng, point.point.lat);
      let result = await _map.getMapPOI(mPoint);
      if (!result) return;
      let str = "";
      this.form.province = result.addressComponents.province;
      this.form.city = result.addressComponents.city;
      this.form.region = result.addressComponents.district;
      this.form.addrsArea =
        result.addressComponents.province +
        "—" +
        result.addressComponents.city +
        "—" +
        result.addressComponents.district;
      this.form.detailInfo =
        result.addressComponents.street +
        result.addressComponents.streetNumber +
        result.surroundingPois[0].title;
    },
    submit() {
      // setSession(pageKey, this.form);

      if (this.tabIndex) {
        //上门取件
        let IsGo = true;
        for (var i in this.form) {
          if (this.form[i] == "") {
            IsGo = false;
            break;
          }
        }
        console.log(this.form);
        if (IsGo) {
          if (this.$route.query.isModify) {
            this.$router.push({
              path: "/PlaceOrder",
              query: { form: this.form, orderId: this.orderId, isModify: "1" }
            });
          } else {
            this.$router.push({
              path: "/PlaceOrder",
              query: { form: this.form, orderId: this.orderId }
            });
          }
        } else {
          this.$vux.toast.show({
            type: "text",
            text: "信息未填写完整，请填写完整"
          });
        }
      } else {
        //自行寄件
        let IsGom = true;
        if (!this.ChooseData.message) {
          IsGom = false;
          this.$vux.toast.show({
            type: "text",
            text: "未选择交货仓库"
          });
          return;
        }
        if (this.selectIndex == "1") {
          if (JSON.stringify(this.ThridExpressInfo) == "{}") {
            IsGom = false;
          }
          for (var i in this.ThridExpressInfo) {
            if (this.ThridExpressInfo[i] == "") {
              IsGom = false;
              break;
            }
          }
        } else {
          IsGom = true;
        }
        if (IsGom) {
          let datas = {};
          datas.wareId = this.ChooseData.id;
          datas.selectIndex = this.selectIndex;
          if (datas.selectIndex == "1") {
            datas.ThridExpressInfo = this.ThridExpressInfo;
          }
          if (this.orderId) {
            if (this.$route.query.isModify) {
              this.$router.push({
                path: "/PlaceOrder",
                query: { datas: datas, orderId: this.orderId, isModify: "1" }
              });
            } else {
            }
          } else {
            this.$router.push({
              path: "/PlaceOrder",
              query: { datas: datas }
            });
          }
        } else {
          this.$vux.toast.show({
            type: "text",
            text: "信息未填写完整，请填写完整"
          });
        }
      }
    },
    change(val, label) {
      console.log("change", val, label);
    },
    selcetWay(index) {
      this.selectIndex = index;
    },
    TheAwb(data) {
      console.log(data);
      this.ThridExpressInfo = data;
    },
    touchList() {
      this.ChooseData.showContent = !this.ChooseData.showContent;
      this.ChooseData.Listshow = !this.ChooseData.Listshow;
    },
    touchselect(index) {
      this.ChooseData.Index = index;
      this.ChooseData.message = this.foreList[index].simpleName;
      this.ChooseData.id = this.foreList[index].wareId;
      this.ChooseData.Listshow = false;
    },
    goReturn() {
      this.$router.go(-1);
    }
    // UserList() {
    //   GetUser(1)
    //     .then(res => {})
    //     .catch(err => {});
    // }
  },
  mounted() {
    // this.UserList();
    this.GetWares();
    if (this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId;
    }
    //初始化数据
    this.visitTimeVal = visitTimeVals[0];
    // 会话存储 获取数据
    let form = getSession(pageKey);
    if (form) this.form = form;

    initWxConfig(this.$wechat);
    this.$wechat.ready(async () => {
      try {
        this.$wechat.openAddress({
          success: res => {
            let {
              userName,
              provinceName,
              cityName,
              countryName,
              detailInfo,
              telNumber
            } = res;
            let addrArea = `${provinceName}-${cityName}-${countryName}`;
            this.form.userName = userName;
            this.form.addrsArea = addrArea;
            this.form.telNumber = telNumber;
            this.form.detailInfo = detailInfo;
          }
        });
      } catch (e) {
        this.$vux.toast.show({
          text: e,
          time: 6000
        });
      }
    });
    // this._initSwpiper();
  }
};
</script>

<style scoped lang="less">
@import "../../../main.less";
.Delivery-box {
  position: absolute;
  right: 0;
  left: 0;
  top: 3.14rem;
  bottom: 3.14rem;
  overflow: scroll;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
  background: #eee;
}
.delivery-type {
  display: flex;
  background: #fff;
}
.delivery {
  display: flex;
  justify-content: center;
  align-items: center;
}
.type-box {
  width: 5rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
}
.type-box.active {
  color: @theme-color;
}
.type-icon {
  width: 3rem;
  height: 7rem;
}
.typeone {
  .bg-img("icon-1-1");
}
.type-box.active .typeone {
  .bg-img("icon-1-2");
}
.typetwo {
  .bg-img("icon-2-1");
}
.type-box.active .typetwo {
  .bg-img("icon-2-2");
}
.delivery-type > div {
  flex: 1;
  height: 9.61rem;
  // box-shadow: 0rem 0rem 1rem rgba(187, 187, 187, 0.16);
}
.bg-box {
  background: #eee;
  padding: 0.3rem 1rem;
}
.hint {
  margin: 10px 0;
}
.addrss-parse-box,
.addrssFrom {
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.16);
  border-radius: 0rem;
}
.addrss-parse-box h5 {
  padding: 0.5rem;
  font-size: 1rem;
  margin-left: 0.5rem;
  padding-left: 1.3rem;
  font-family: @fontFamily;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  .bg-img("icon-5-1");
  background-position: left;
}
.addrss-parse {
  height: 13rem;
}
.textarea {
  margin: 0 0.4rem;
  border: 1px solid rgba(210, 210, 210, 1);
}
.addrss-parse .label {
  font-size: 1rem;
  font-family: @fontFamily;
  font-weight: 400;
  color: rgba(136, 136, 136, 1);
}
.addrssFrom {
  margin: 0.7rem 0 0 0;
}
.weui-cell {
  padding: 0;
}
.address-fill {
  width: 100%;
}
.input-box {
  box-sizing: border-box;
}
.addrs-box {
  flex: 1;
  display: flex;
  align-items: center;
}
.addrs-select-box,
.addrs-btn-box {
  flex: 1;
}
.addrs-select-box {
}
.addrs-btn-box {
  height: 100%;
  flex: 0 3rem;
  display: flex;
  justify-content: right;
  align-items: center;
}
.addrs-btn {
  flex: 1;
  height: 2rem;
  border-left: @border;
  .bg-img("icon-3-1");
}
.visit-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.visit-btn {
  fill: #2676ce;
  color: #2676ce;
  display: flex;
  align-items: center;
  transition: all 0.5s;
}
.rotate-btn {
  transform: rotate(90deg);
}
.visit-select {
  background: #fff;
}
.visit-select-box {
  display: flex;
  background: #fff;
  text-align: center;
  height: 16rem;
}
.visit-select-context {
  flex: 1;
}
.visit-select-list {
  width: 9rem;
  background: rgba(238, 238, 238, 1);
}
.visit-select-list li {
  padding: 10px;
}
.visit-select-list li.acitve {
  background: #fff;
}
.visit-select-context ul {
  height: 14.5rem;
  overflow: auto;
}
.visit-select-context li {
  padding: 10px;
}
.visit-select-context li.acitve {
  color: @theme-color;
}
.visit-select-context li.acitve::after {
  content: ">";
  position: relative;
  left: 1.5rem;
  font-size: 12px;
}

.picker {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  flex: 1;
  justify-content: start;
}
.picker a {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-size: contain;
  .bg-img("icon-6-1@2x");
}
.picker .selecta {
  .bg-img("icon-6-2@2x");
}
.picker .opts {
  width: 3rem;
}
.picker .value {
  flex: 1;
}
.bg-box {
  .ChooseWarehouse {
    .chooseclass {
      position: relative;
      .Chooseicon {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        .bg-img("icon-4-1");
        position: absolute;
        left: 0.7rem;
        top: 1rem;
      }
      /deep/ .cell {
        .left {
          margin-left: 1.3rem;
          max-width: 6rem;
        }
        .choose-box {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
          .theselected {
            color: #2c7ac7;
            font-size: 1rem;
            font-weight: 500;
          }
        }
      }
    }
    .delivery-way {
      .cell {
        .picker {
          position: relative;
          .line-ways {
            width: 1px;
            height: 2.1rem;
            background: #bbbbbb;
            position: absolute;
            right: 4rem;
          }
        }
      }
    }
    .warning {
      p {
        span {
          .bg-img("8-1");
          width: 1rem;
          background-size: contain;
          height: 1rem;
          display: inline-block;
          vertical-align: text-top;
          margin: 0 0.35rem 0 0.2rem;
        }
        font-size: 12px;
        color: #999999;
        margin-top: 0.71rem;
        margin-bottom: 1rem;
      }
    }
  }
  .slide {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
    li {
      width: 100%;
      height: 3.4rem;
      border-bottom: 1px solid #bbbbbb;

      span {
        display: inline-block;
        vertical-align: text-bottom;
        width: 1.3rem;
        height: 1.3rem;
        font-family: @fontFamily;
        margin: 0.07rem 0.7rem 0 1.5rem;
        .bg-img("icon-7-1");
      }
      p {
        display: inline-block;
        font-size: @plainFontSize;
        margin-top: 1.15rem;
        color: #666666;
        font-family: @fontFamily;
      }
    }
    .aitss {
      span {
        transition: all 0.5s;
        .bg-img("icon-7-2");
      }
      p {
        color: #0562be;
      }
    }
    :nth-last-child(1) {
      border: none;
    }
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
}
</style>
