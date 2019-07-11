
<template>
  <div>
    <div class="place-box">
      <IGroup :groupClass="groupClass" class="placeclass">
        <ICell title="目的国家">
          <div slot="right" class="input-box countries-box">
            <popup-picker :data="CountrysLists" v-model="countries.message" @on-show="countriesonShow" @on-hide="countriesonHide" @on-change="countriesChange" class="popupcalss">
            </popup-picker>
          </div>
        </ICell>
      </IGroup>
      <IGroup :groupClass="groupClass" class="parcelparameters">
        <ICell title="预估重量">
          <div slot="right" class="input-box parameters-box">
            <x-input title=" " v-model="parameters.parameterKG" class="parameters-input"></x-input>
            <span class="theselected">KG</span>
          </div>
        </ICell>
        <ICell title="包裹件数">
          <div slot="right" class="input-box parameters-box">
            <x-input title=" " v-model="parameters.parameterNumber" class="parameters-input"></x-input>
            <span class="theselected">件</span>
          </div>
        </ICell>
        <ICell title="物品类型">
          <div slot="right" class="input-box parameters-countries-box">
            <span class="warning" @click="warningShow"></span>
            <p class="types">{{typesStr}}</p>
            <div class="visit-btn" @click="TypeTouch">
              <x-icon type="ios-arrow-right" size="28" class="countries-blue"></x-icon>
            </div>
          </div>
        </ICell>
        <ICell title="更多服务">
          <div slot="right" class="input-box parameters-countries-box">
            <span class="warning"></span>
            <div class="visit-btn" @click="parametersTouch">
              <x-icon type="ios-arrow-right" size="28" class="countries-blue"></x-icon>
            </div>
          </div>
        </ICell>
        <div class="type-way">
          <div class="left">
            <span class="title">产品类型</span><span class="warning"></span>
            <p class="types">{{productType}}</p>

          </div>
          <div class="right">
            <span class="title">支付方式</span>
            <p class="types">{{parameters.pay}}</p>
            <div class="visit-btn" @click="paymentTouch">
              <x-icon type="ios-arrow-right" size="28" class="countries-blue"></x-icon>
            </div>
          </div>
        </div>
      </IGroup>
      <IGroup>
        <div class="rebates-box">
          <span class="title">单独报关退税</span><span class="warning"></span>
          <div class="select">
            <a v-for="(item,index) in rebatesLlist" :key="item.str" :class="Index == index?'selcets':''" @click="selcets(item,index)">{{item.str}}</a>
          </div>
          <div class="uploads" v-if="Index == '0'">
            <div class="title-box">
              <p>请上传报关所需基本资料</p>
              <a @click="ShowTemplate">下载模板<x-icon type="ios-arrow-thin-down" size="20" class="down"></x-icon></a>
            </div>

            <span>支持 word、pdf、excel格式</span>
            <div v-for="(item,index) in UploadModule" class="Upload" :key="index">
              <span>{{item.title}}</span>
              <div>
                <a class="fill" v-if="item.files1">{{item.files1.name}}</a>
                <a v-if="!item.IsButton" class="button1">{{item.button}}</a>
                <a v-if="item.IsButton" class="button2">{{item.button2}}</a>
                <input type="file" class="inputfiles" @change='uploadFile($event,index)'>
              </div>
            </div>
          </div>
        </div>
      </IGroup>
      <IGroup class="tie">
        <div class="invoice-box">
          <div class="download">
            <span class="title">上传随货发票</span>
            <a>下载随货发票模板<x-icon type="ios-arrow-thin-down" size="20" class="down"></x-icon></a>
          </div>
          <div class="invoice-file-box">
            <div class="invoice-upload">
              <div class="invoice-file" v-show="fileList.name">
                <img src="../../assets/upload3.png" @click="delectImg">
              </div>
              <div class="image-container">

                <img src="../../assets/upload1.png" class="upload1" v-if="Object.keys(files).length == 0">
                <figure v-else-if="files.length && (files[0].type =='image/png' || files[0].type =='image/jpeg' || files[0].type =='image/jpg')">
                  <img width="100%" :src="files.length ? files[0].url : null" class="fileimg">
                </figure>

                <div v-else class="words">
                  <img v-if="files.length" src="../../assets/upload2.png">
                  <a v-if="fileList.name">{{fileList.name}}</a>
                </div>
                <File-Upload name="file" input-id="file2" class="btn btn-primary" post-action="http://192.168.50.222:7500/OrderOnline/api/Common/uploadProject/upload?typeId=1" v-model="files" @input-filter="invoiceInputFilter" @input-file="invoiceInputFile" ref="invoiceupload">
                </File-Upload>
                <a class="titles"><span>*</span>支持上传文件(pdf/word/excel 格式)
                  照片请保持字体清晰可信息完整</a>
              </div>
            </div>
          </div>
        </div>
      </IGroup>
      <div class="Thetreaty">
        <a v-show="!Agreed" class="items as" @click="onChangepk1"></a>
        <a v-show="Agreed" class="items-selected as" @click="onChangepk1"></a>
        <span>我同意 <a @click="treatyShow">《*****服务条约》</a></span>
      </div>

    </div>

    <Public-Prompt @serviceList="serviceList" :maskList="maskList"></Public-Prompt>
    <Package-Type @typeList="typeList" :maskList="maskList2"></Package-Type>
    <Method-Payment @paymentList="paymentList" :maskList="maskList3"></Method-Payment>
    <Public-Title :maskList="Publictitle" @Agreed="Agreeds"></Public-Title>
    <Download-Template :templateShow="templateShow"></Download-Template>
    <div class="footer2">
      <a class="nextStep" @click="submit">提交</a>
    </div>
  </div>
</template>

<script>
import PublicPrompt from "@/components/Public/PublicPrompt.vue";
import PackageType from "@/components/Public/PackageType.vue";
import MethodPayment from "@/components/Public/MethodPayment.vue";
import PublicTitle from "@/components/Public/PublicTitle.vue";
import DownloadTemplate from "@/components/Public/DownloadTemplate";
import { IPicker, IGroup, ICell } from "@/components/Common";
// import onloadFilter from "@/components/Public/onloadFilter.vue";
import FileUpload from "vue-upload-component";
import { XInput, XButton, PopupPicker, TransferDom } from "vux";
import { stop, move } from "@/libs/util";
import axios from "axios";
import qs from "qs";
import { setTimeout, clearTimeout, clearInterval } from "timers";
import {
  GetCountrys,
  GetProducts,
  PlaceAnOrder
} from "@/api/common/PlaceOrder";
import { GetOrderAllInfo, GetAnnex, UpdateAnOrder } from "@/api/common/order";
export default {
  directives: {
    TransferDom
  },
  components: {
    IGroup,
    ICell,
    XInput,
    XButton,
    IPicker,
    PopupPicker,
    PublicPrompt,
    PackageType,
    MethodPayment,
    PublicTitle,
    // onloadFilter,
    FileUpload,
    DownloadTemplate
  },
  data() {
    return {
      countries: {
        msgshow: true,
        message: [],
        Listshow: true
      },
      parameters: {
        parameterKG: "",
        parameterNumber: "",
        parameterAdditional: "",
        pay: "",
        ptyTypeId: ""
      },
      rebatesLlist: [
        {
          str: "是",
          choose: false
        },
        {
          str: "否(默认)",
          choose: true
        }
      ],
      Index: "1",
      img: "",
      Countrys: [],
      CountrysLists: [],
      maskList: {
        classShow: false,
        OrderServer: []
      },
      maskList2: {
        classShow: false,
        infos: []
      },
      maskList3: {
        classShow: false,
        isAr: 0
      },
      Publictitle: {
        title: "",
        PublicTitleShow: false,
        titleMessage: "1111",
        type: false
      },
      templateShow: {
        classShow: false
      },
      fileList: {},
      filesList: [],
      timeOutEvent: 0,
      files: [],
      edit: false,
      UploadModule: [
        {
          title: "报关草单",
          IsButton: false,
          button: "上传",
          button2: "重新上传",
          BaoGuanCaoDan: 0,
          files1: {}
        },
        {
          title: "代理报关委托书",
          IsButton: false,
          button: "上传",
          button2: "重新上传",
          WeiTuoShu: 0,
          files1: {}
        },
        {
          title: "合同",
          ref: "upload3",
          IsButton: false,
          button: "上传",
          button2: "重新上传",
          HeTong: 0,
          files1: {}
        },
        {
          title: "装箱单",
          IsButton: false,
          button: "上传",
          button2: "重新上传",
          ZhuangXiangDan: 0,
          files1: {}
        }
      ],
      showtitle: true,
      Types: {
        goodsType: "",
        carryFeature: []
      },
      typesStr: "",
      productType: "--",
      productCode: "",
      Agreed: true,
      TheDoor: null,
      SinceSend: null,
      featureCode: [],
      goodsInvoiceId: "",
      isModify: false
    };
  },
  computed: {
    groupClass() {
      return ["addrss-parse-box", "addrssFrom"];
    }
  },
  mounted() {
    this.CountrysList();
    console.log(this.$route.query);
    if (this.$route.query && this.$route.query.form) {
      this.TheDoor = this.$route.query.form;
      if (this.$route.query.orderId) {
        this.GetDetail(this.$route.query.orderId);
      }
      if (this.$route.query.isModify == "1") {
        this.isModify = true;
      }
    } else if (this.$route.query && this.$route.query.datas) {
      this.SinceSend = this.$route.query.datas;
      if (this.$route.query.orderId) {
        this.GetDetail(this.$route.query.orderId);
      }
      if (this.$route.query.isModify == "1") {
        this.isModify = true;
      }
    }
    console.log(this.SinceSend);
  },
  methods: {
    //获取目的国家
    CountrysList() {
      GetCountrys().then(res => {
        if (res && res.length > 0) {
          let arr = [];
          this.Countrys = res;
          res.map(i => {
            arr.push(i.countryName);
          });
          this.CountrysLists.push(arr);
        }
      });
    },
    //修改时获取下单数据
    GetDetail(orderId) {
      GetOrderAllInfo(orderId).then(res => {
        if (res) {
          console.log(res);
          let detailObj = res;
          //设置国家数据
          if (detailObj.toCountry == "CN") {
            this.countries.message.push("中国");
          }
          if (detailObj.toCountry == "IR") {
            this.countries.message.push("伊朗");
          }
          this.parameters.parameterKG = detailObj.estimatedWeight;
          this.parameters.parameterNumber = detailObj.packageCount;
          this.Types.goodsType = detailObj.goodsType;
          if (detailObj.goodsType == "B") {
            this.typesStr = `包裹`;
            if (detailObj.carryFeatures && detailObj.carryFeatures.length > 0) {
              this.maskList2.infos = detailObj.carryFeatures;
              this.Types.carryFeature = detailObj.carryFeatures;
              this.typesStr += "(";
              for (let i = 0; i < detailObj.carryFeatures.length; i++) {
                if (i == detailObj.carryFeatures.length - 1) {
                  if (detailObj.carryFeatures[i] == "DD") {
                    this.typesStr += "带电)";
                  } else if (detailObj.carryFeatures[i] == "DP") {
                    this.typesStr += "带牌)";
                  } else if (detailObj.carryFeatures[i] == "DC") {
                    this.typesStr += "带磁)";
                  }
                } else {
                  if (detailObj.carryFeatures[i] == "DP") {
                    this.typesStr += "带电/";
                  } else if (detailObj.carryFeatures[i] == "DP") {
                    this.typesStr += "带牌/";
                  } else if (detailObj.carryFeatures[i] == "DC") {
                    this.typesStr += "带磁/";
                  }
                }
              }
            }
          } else {
            this.typesStr = `文件`;
          }
          this.parameters.ptyTypeId = detailObj.payTypeCode;
          this.parameters.parameterAdditional = detailObj.carryFeatures;
          this.Types.carryFeature = detailObj.carryFeatures;
          if (detailObj.payTypeCode == "HDFK") {
            this.parameters.pay = "货到付款";
            this.$set(this.maskList3, "isAr", 0);
          } else if (detailObj.payTypeCode == "ZXZF") {
            this.parameters.pay = "在线支付";
            this.$set(this.maskList3, "isAr", 1);
          } else if (detailObj.payTypeCode == "GSZZ") {
            this.parameters.pay = "公司转账";
            this.maskList3.isAr = 2;
          }
          if (detailObj.serviceProductName) {
            this.productType = detailObj.serviceProductName;
            this.productCode = detailObj.serviceProduct;
          }
          if (detailObj.OrderServer.length > 0) {
            this.maskList.OrderServer = detailObj.OrderServer;
          }

          if (detailObj.isCustomsRebate > 0) {
            this.Index = "0";
          } else {
            this.Index = "1";
          }
          if (detailObj.CustomDeclarationInfo) {
            if (detailObj.CustomDeclarationInfo.baoGuanCaoDan) {
              this.getFiles(detailObj.CustomDeclarationInfo.baoGuanCaoDan, 0);
            }
            if (detailObj.CustomDeclarationInfo.weiTuoShu) {
              this.getFiles(detailObj.CustomDeclarationInfo.weiTuoShu, 1);
            }
            if (detailObj.CustomDeclarationInfo.heTong) {
              this.getFiles(detailObj.CustomDeclarationInfo.heTong, 2);
            }
            if (detailObj.CustomDeclarationInfo.zhuangXiangDan) {
              this.getFiles(detailObj.CustomDeclarationInfo.zhuangXiangDan, 3);
            }
          }
          if (detailObj.goodsInvoiceId > 0) {
            this.goodsInvoiceId = detailObj.goodsInvoiceId;
            this.getFiles(detailObj.goodsInvoiceId, 99);
          }
        }
      });
    },
    getFiles(id, index) {
      GetAnnex(id).then(res => {
        if (res) {
          if (index == 0) {
            this.UploadModule[0].BaoGuanCaoDan = res.annexObjId;
            this.UploadModule[0].files1.name = res.annexObjName;
            this.$set(this.UploadModule[0], "IsButton", true);
          } else if (index == 1) {
            this.UploadModule[1].WeiTuoShu = res.annexObjId;
            this.UploadModule[1].files1.name = res.annexObjName;
            this.$set(this.UploadModule[1], "IsButton", true);
          } else if (index == 2) {
            this.UploadModule[2].HeTong = res.annexObjId;
            this.UploadModule[2].files1.name = res.annexObjName;
            this.$set(this.UploadModule[2], "IsButton", true);
          } else if (index == 3) {
            this.UploadModule[3].ZhuangXiangDan = res.annexObjId;
            this.UploadModule[3].files1.name = res.annexObjName;
            this.$set(this.UploadModule[3], "IsButton", true);
          }

          if (index == 99) {
            if (
              res.annexObjNetworkPath.indexOf("jpg") > 0 ||
              res.annexObjNetworkPath.indexOf("png") > 0 ||
              res.annexObjNetworkPath.indexOf("jpeg") > 0
            ) {
              this.files.push({
                type: "",
                url: ""
              });
              this.files[0].type = "image/jpeg";
              this.files[0].url = res.annexObjNetworkPath;
              this.fileList.name = res.annexObjName;
            } else {
              this.files[0].type = "word";
              this.fileList.name = res.annexObjName;
            }
          }
        }
      });
    },
    Agreeds(value) {
      if (value) {
        this.Agreed = true;
      }
    },
    //发票上传
    invoiceInputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        this.$nextTick(function() {
          this.edit = true;
        });
      }
      if (!newFile && oldFile) {
        this.edit = false;
      }
      // 自动上传
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (!this.$refs.invoiceupload.active) {
          this.$refs.invoiceupload.active = true;
        }
      }
      // 上传成功
      if (newFile && newFile.response.code == 200) {
        this.goodsInvoiceId = newFile.response.body;
      }
    },
    //上传发票
    invoiceInputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(jpg|jpeg|png|doc|docx|xls|xlsx|pdf)$/i.test(newFile.name)) {
          this.$vux.toast.show({
            type: "cancel",
            text: "文件格式不正确，请重新上传"
          });
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
      this.fileList = newFile;
    },
    //上传单独报关文件
    uploadFile(e, index) {
      let url =
        "http://192.168.50.222:7500/OrderOnline/api/Common/uploadProject/upload?typeId=1";
      let param = new FormData();
      let file = e.target.files[0];

      // this.filelist.push(files);
      // if (file.size > 1024 * 521) {
      //   return false;
      // }
      // if (!/\.(doc|docx|xls|xlsx|pdf)$/i.test(newFile.name)) {
      //   console.log(newFile);
      //   this.$vux.toast.show({
      //     type: "cancel",
      //     text: "文件格式为doc/docx/xls/xlsx/pdf"
      //   });
      //   return prevent();
      // }
      param.append("file", file);
      axios
        .post(url, param)
        .then(res => {
          if (res.status == 200 && res.data.msg == "成功") {
            this.UploadModule[index].files1 = file;
            this.$set(this.UploadModule[index], "IsButton", true);

            if (index == 0) {
              this.UploadModule[0].BaoGuanCaoDan = res.data.body;
            } else if (index == 1) {
              this.UploadModule[1].WeiTuoShu = res.data.body;
            } else if (index == 2) {
              this.UploadModule[2].HeTong = res.data.body;
            } else if (index == 3) {
              this.UploadModule[3].ZhuangXiangDan = res.data.body;
            }
          }
        })
        .catch(err => {});
    },
    touchList() {},
    selcets(item, index) {
      this.Index = index;
    },
    filesLists(data) {
      this.fileList = data;
    },
    //获取选中的更多服务
    serviceList(data) {
      console.log(data);
      if (data) {
        this.parameters.parameterAdditional = data;
      }
    },
    typeList(data) {
      if (data.goodsType) {
        this.Types.goodsType = data.goodsType;
        this.Types.carryFeature = data.carryFeature;
        console.log(this.Types.carryFeature);
        if (this.Types.goodsType == "B") {
          this.typesStr = `包裹`;
          if (this.Types.carryFeature.length > 0) {
            this.typesStr += "(";
            for (let i = 0; i < this.Types.carryFeature.length; i++) {
              if (i == this.Types.carryFeature.length - 1) {
                this.typesStr += this.Types.carryFeature[i].name + ")";
              } else {
                this.typesStr += this.Types.carryFeature[i].name + "/";
              }
            }
          }
        } else {
          this.typesStr = `文件`;
        }
        this.Products();
      } else {
        this.typesStr = "";
      }
    },
    //获取产品类型数据
    Products() {
      let countryCode = "";
      if (this.countries.message.length > 0) {
        countryCode = this.Countrys[
          this.Countrys.findIndex(
            item => item.countryName == this.countries.message
          )
        ].countryCode;
      }
      let goodsType = this.Types.goodsType;
      this.featureCode = [];

      this.Types.carryFeature.map(item => {
        this.featureCode.push(item.type);
      });
      console.log(this.featureCode);
      let data = {};
      if (countryCode && goodsType && this.featureCode) {
        data = {
          countryCode: countryCode,
          goodsType: goodsType,
          featureCode: this.featureCode
        };
      } else {
        data = {};
      }
      if (data) {
        GetProducts(data).then(res => {
          if (res && res[0]) {
            this.productType = res[0].productName;
            this.productCode = res[0].productCode;
          } else {
            this.productType = "--";
            this.productCode = "";
          }
        });
      }
    },
    paymentList(data) {
      if (data) {
        this.parameters.pay = data.payTypeName;
        this.parameters.ptyTypeId = data.payTypeCode;
      }
    },
    InvoiceList(data) {},
    warningShow() {
      this.Publictitle.title = "提示";
      this.Publictitle.titleMessage =
        "提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容";
      this.Publictitle.PublicTitleShow = !this.Publictitle.PublicTitleShow;
      this.Publictitle.type = false;
      stop();
    },
    treatyShow() {
      this.Publictitle.title = "《*****服务条约》";
      this.Publictitle.titleMessage =
        "提示的信息内，提示的信息内容在此处编辑编辑，提辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容在此处编辑，提示的信息内容";
      this.Publictitle.PublicTitleShow = !this.Publictitle.PublicTitleShow;
      this.Publictitle.type = true;
      stop();
    },
    parametersTouch() {
      this.maskList.classShow = !this.maskList.classShow;
      stop();
    },
    TypeTouch() {
      this.maskList2.classShow = !this.maskList2.classShow;
    },
    paymentTouch() {
      this.maskList3.classShow = !this.maskList3.classShow;
      stop();
    },
    ShowTemplate() {
      this.templateShow.classShow = !this.templateShow.classShow;
    },
    countriesonShow() {},
    countriesonHide() {},
    countriesChange() {},
    //长按删除事件
    // gtouchstart() {
    //   clearInterval(this.Loop);
    //   this.Loop = setTimeout(() => {
    //     this.$set(this.fileList, "delectShow", !this.fileList.delectShow);
    //   }, 1000);
    // },
    // gtouchend() {
    //   clearTimeout(this.Loop);
    // },
    delectImg(index) {
      this.files = [];
      this.fileList = [];
    },
    onChangepk1() {
      this.Agreed = !this.Agreed;
    },
    submit() {
      let isButton = true;
      if (
        this.countries.message.length == 0 ||
        !this.parameters.parameterKG ||
        !this.parameters.parameterNumber ||
        !this.typesStr ||
        !this.parameters.pay ||
        !this.fileList ||
        !this.Agreed
      ) {
        isButton = false;
      }
      if (this.Index == "0") {
        for (let i = 0; i < this.UploadModule.length; i++) {
          if (this.UploadModule[i].files1 == {}) {
            // isButton = false;
          }
        }
      }
      if (!isButton) {
        this.$vux.toast.show({
          type: "text",
          text: "下单信息未填写完整!"
        });
      } else {
        let data = {
          DeliveryAddressInfo: {},
          GoodsDelivery: {},
          ThridExpressInfo: {},
          DanDuBaoGuanZiLiaoInfo: {}
        };
        //上一个页面的提货信息
        if (this.TheDoor) {
          data.DeliveryAddressInfo.senderName = this.TheDoor.userName;
          data.DeliveryAddressInfo.province = this.TheDoor.province;
          data.DeliveryAddressInfo.city = this.TheDoor.city;
          data.DeliveryAddressInfo.region = this.TheDoor.detailInfo;
          data.DeliveryAddressInfo.tel = this.TheDoor.telNumber;
          data.GoodsDelivery.deliveryTime = this.TheDoor.visitTime;
          data.GoodsDelivery.deliveryType = 0;
        }
        if (this.SinceSend) {
          data.GoodsDelivery.deliveryType = this.SinceSend.wareId;
          if (this.SinceSend.selectIndex == "1") {
            data.ThridExpressInfo.thridName = this.SinceSend.ThridExpressInfo.thridName;
            data.ThridExpressInfo.thridNum = this.SinceSend.ThridExpressInfo.thridNum;
          }
        }
        if (this.$route.query.orderId) {
          data.orderId = this.$route.query.orderId;
        }
        data.userId = 1;
        data.toCountry = this.Countrys[
          this.Countrys.findIndex(
            item => item.countryName == this.countries.message
          )
        ].countryCode;
        data.goodsType = this.Types.goodsType;
        data.estimatedWeight = this.parameters.parameterKG;
        data.packageCount = this.parameters.parameterNumber;
        if (this.Index == "0") {
          data.DanDuBaoGuanZiLiaoInfo.BaoGuanCaoDan = this.UploadModule[0].BaoGuanCaoDan;
          data.DanDuBaoGuanZiLiaoInfo.WeiTuoShu = this.UploadModule[1].WeiTuoShu;
          data.DanDuBaoGuanZiLiaoInfo.HeTong = this.UploadModule[2].HeTong;
          data.DanDuBaoGuanZiLiaoInfo.ZhuangXiangDan = this.UploadModule[3].ZhuangXiangDan;
        }

        data.payTypeCode = this.parameters.ptyTypeId;
        data.goodsInvoiceId = this.goodsInvoiceId;
        data.orderServiceList = this.parameters.parameterAdditional
          ? this.parameters.parameterAdditional
          : [];
        data.carryFeature = this.featureCode;
        data.serviceProduct = this.productCode;
        console.log(data);
        if (!this.isModify) {
          PlaceAnOrder(JSON.stringify(data))
            .then(res => {
              if (res && res.Number) {
                this.$router.push({
                  path: "/OrderSuccess",
                  query: {
                    Numbers: res.Number
                  }
                });
              }
            })
            .catch(err => {});
        } else {
          UpdateAnOrder(JSON.stringify(data))
            .then(res => {
              if (res) {
                this.$vux.toast.show({
                  type: "text",
                  text: "修改订单信息成功!"
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/OrderDetail",
                    query: {
                      orderId: data.orderId
                    }
                  });
                }, 2000);
              }
            })
            .catch(err => {});
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "../PlaceOrder/PlaceOrder.less";
</style>
