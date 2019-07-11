<template>
  <div class="box-content">
    <tab :line-width=2 v-model="index">
      <tab-item class="vux-center" :key="0">个人认证</tab-item>
      <tab-item class="vux-center" :key="1">企业认证</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false" ref="swiper" @on-index-change="changeItem">
      <swiper-item :key="0">
        <div class="tab-swiper vux-center">
          <ITips :opts="{text:realNameTips}"></ITips>
          <div class="uploadFile">
            <h5>*请上传身份证正反面照片</h5>
            <div class="SingleImg">
              <ISingleImg :opts="{text:'请上传身份证正面照片'}" @upload="upload1"></ISingleImg>
            </div>
            <div class="SingleImg">
              <ISingleImg :opts="{text:'请上传身份证反面照片',class:'IDPapers'}" @upload="upload2"></ISingleImg>
            </div>
          </div>
          <Divider>拍摄照片要求</Divider>
          <div>
            <ul class="sample">
              <li>
                <div>
                  <img src="../../assets/icon-papers.png" alt="">
                  <span>
                    <x-icon type="ios-checkmark-outline" size="19" class="icon icon-succeed"></x-icon>
                    标准拍摄
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <img src="../../assets/icon-papers.png" alt="">
                  <span>
                    <x-icon type="ios-close-outline" size="19" class="icon icon-error"></x-icon>
                    标准拍摄
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <img src="../../assets/icon-papers.png" alt="">
                  <span>
                    <x-icon type="ios-close-outline" size="19" class="icon icon-error"></x-icon>
                    标准拍摄
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <img src="../../assets/icon-papers.png" alt="">
                  <span>
                    <x-icon type="ios-close-outline" size="19" class="icon icon-error"></x-icon>
                    标准拍摄
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="submits">
            <a @click="nextstep">下一步</a>
          </div>
        </div>
      </swiper-item>
      <swiper-item :key="1">
        <div class="tab-swiper vux-center">
          <ITips :opts="{text:realNameTips}" disabled></ITips>
          <div class="uploadFile">
            <h5>*请上传《营业执照》正面照片</h5>
            <div class="SingleImg">
              <ISingleImg :opts="{text:'上传《营业执照》正面', class:'CompanyPapers'}" @upload="upload3"></ISingleImg>
            </div>
            <Divider>拍摄照片要求</Divider>
            <div class="submit">
              <div class="tips">
                <span>
                  <x-icon type="ios-close-outline" size="19" class="icon icon-error"></x-icon>
                  证件必须清晰彩色原件电子版。 可拍照，也可上传jpg、png、jepg图片格式
                </span>
              </div>
              <a @click="submit">提交</a>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { OpMyInfoHead } from "@/components/MyInfo";
import { ISingleImg, ITips, IButton } from "@/components/Common";
import { Divider, Tab, TabItem, Swiper, SwiperItem } from "vux";
import store from "@/store";
import axios from "axios";
import { setTimeout } from "timers";
export default {
  components: {
    Divider,
    ISingleImg,
    ITips,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    IButton
  },
  data() {
    return {
      index: 0,
      realNameTips: "根据《快递暂行条例》,寄快递需要实名认证",
      headers: [],
      data: {
        front: {
          fileZHENGMIAN: ""
        },
        back: {
          fileFANMIAN: ""
        }
      },
      enterpriseData: {
        fileZHENGMIAN: "",
        file: ""
      },
      IdCard: {
        frontList: "",
        backList: ""
      },
      enterpriseDatas: {}
    };
  },
  methods: {
    nextstep() {
      let isgo = true;
      if (!this.data.front.fileZHENGMIAN || !this.data.back.fileFANMIAN) {
        isgo = false;
        this.$vux.toast.show({
          type: "text",
          text: "身份证正反面未上传完整!"
        });
        return;
      }
      if (isgo) {
        if (this.IdCard.frontList && this.IdCard.backList) {
          this.$router.push({
            path: "/RealnameAuthentication",
            query: {
              type: 1,
              fileZHENGMIAN: this.data.front.fileZHENGMIAN,
              fileFANMIAN: this.data.back.fileFANMIAN
            }
          });
        }
        store.commit("realName", this.IdCard);
      }
    },
    submit() {
      let isgo = true;
      if (!this.enterpriseData.fileZHENGMIAN) {
        isgo = false;
        this.$vux.toast.show({
          type: "text",
          text: "营业执照未上传!"
        });
        return;
      }
      if (isgo) {
        this.getEnterprise(this.enterpriseData.file);
      }
    },
    changeItem(index) {
      //页签 切换
    },
    upload1(val) {
      if (val && val.success) {
        this.data.front.fileZHENGMIAN = val.response.body;
        this.getUser(val.file, "front");
      }
    },
    upload2(val) {
      if (val && val.success) {
        this.data.back.fileFANMIAN = val.response.body;
        this.getUser(val.file, "back");
      }
    },
    upload3(val) {
      if (val && val.success) {
        this.enterpriseData.fileZHENGMIAN = val.response.body;
        this.enterpriseData.file = val.file;
      }
    },
    //识别身份证信息
    getUser(files, type) {
      let url =
        "http://192.168.50.222:7500/OrderOnline/api/Common/GetAuthenTOBaiDu?idCardSide=" +
        type;
      let param = new FormData();
      param.append("file", files);
      axios
        .post(url, param)
        .then(res => {
          if (res.status == 200 && res.data.msg == "成功") {
            let OBJstring = JSON.parse(res.data.body);
            console.log(OBJstring);
            if (type == "front") {
              if (OBJstring.image_status == "normal") {
                this.IdCard.frontList = OBJstring;
              } else if (OBJstring.image_status == "reversed_side") {
                this.$vux.toast.show({
                  type: "text",
                  text: "你上传的图片不是身份证正面!"
                });
                this.data.front.fileZHENGMIAN = "";
              } else {
                this.$vux.toast.show({
                  type: "text",
                  text: "你上传的图片不包含身份证信息哦!"
                });
                this.data.front.fileZHENGMIAN = "";
              }
            }
            if (type == "back") {
              if (OBJstring.image_status == "normal") {
                this.IdCard.backList = OBJstring;
              } else if (OBJstring.image_status == "reversed_side") {
                this.$vux.toast.show({
                  type: "text",
                  text: "你上传的图片不是身份证反面!"
                });
                this.data.back.fileFANMIAN = "";
              } else {
                this.$vux.toast.show({
                  type: "text",
                  text: "你上传的图片不包含身份证信息哦!"
                });
                this.data.back.fileFANMIAN = "";
              }
            }
          }
        })
        .catch(err => {});
    },
    //识别营业执照信息
    getEnterprise(files) {
      let url =
        "http://192.168.50.222:7500/OrderOnline/api/Common/GetBusinessLicense";
      let param = new FormData();
      param.append("file", files);
      axios
        .post(url, param)
        .then(res => {
          if (res.status == 200 && res.data.msg == "成功") {
            let OBJstring = JSON.parse(res.data.body);
            console.log(OBJstring);
            if (
              OBJstring.words_result &&
              OBJstring.words_result.单位名称.words
            ) {
              this.enterpriseDatas = OBJstring;
              this.$router.push({
                path: "/RealnameAuthentication",
                query: {
                  type: 2,
                  fileZHENGMIAN: this.enterpriseData.fileZHENGMIAN
                }
              });
              store.commit("Enterprise", this.enterpriseDatas);
            } else {
              this.$vux.toast.show({
                type: "text",
                text: "你上传的图片不包含营业执照信息哦!"
              });
            }
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    if (this.$route.query.IsBind == 1) {
      this.$nextTick(() => {
        this.index = 0;
      });
    }
    if (this.$route.query.IsBind == 2) {
      this.$nextTick(() => {
        this.index = 1;
      });
    }
    this.$nextTick(() => {
      this.$refs.swiper.xheight = "600px";
    });
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.box-content {
  position: absolute;
  top: 3.14rem;
  left: 0;
  bottom: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.uploadFile {
  margin: 25px auto;
}
.uploadFile h5 {
  text-align: center;
  font-size: 20px;
  font-family: @fontFamily;
  font-weight: 600;
  line-height: 20px;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 10px;
}
.SingleImg {
  margin: 20px auto;
  display: flex;
  justify-content: center;
}
.sample {
  display: flex;
  margin-top: 10px;
}
.sample li {
  flex: 1;
  text-align: center;
}
.sample img {
  width: 79px;
  height: 49px;
  display: block;
  margin: 0 auto;
}
.sample span {
  font-size: 12px;
  font-family: @fontFamily;
  font-weight: 400;
  line-height: 15px;
  color: rgba(153, 153, 153, 1);
}
.submit {
  width: 80%;
  margin: 20px auto 0;
  a {
    width: 95%;
    margin: 0rem 1rem;
    height: 2.5rem;
    display: inline-block;
    background-color: #0562be;
    border-radius: 5px;
    font-size: 1.1rem;
    text-align: center;
    line-height: 2.5rem;
    color: #fff;
  }
}
.submits {
  width: 80%;
  position: fixed;
  left: 10%;
  bottom: 0;
  a {
    width: 95%;
    margin: 0rem 1rem;
    height: 2.5rem;
    display: inline-block;
    background-color: #0562be;
    border-radius: 5px;
    font-size: 1.1rem;
    text-align: center;
    line-height: 2.5rem;
    color: #fff;
  }
}
.tips {
  font-size: 14px;
  font-family: @fontFamily;
  font-weight: 400;
  line-height: 22px;
  color: rgba(153, 153, 153, 1);
  margin-bottom: 20px;
}
</style>
