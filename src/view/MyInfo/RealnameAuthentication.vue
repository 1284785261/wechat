<template>
  <div class="bg-box">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content">
      <div class="content-box">
        <p class="titles">*根据《快递暂行条例》，寄快递需要实名认证</p>
        <div class="invoiceData" v-if="type=='1'">
          <IGroup v-if="frontList.words_result">
            <ICell title="姓名">
              <div slot="right" class="input-box">
                <span>{{frontList.words_result.姓名.words}}</span>
              </div>
            </ICell>
            <ICell title="性别">
              <div slot="right" class="input-box">
                <span>{{frontList.words_result.性别.words}}</span>
              </div>
            </ICell>
            <ICell title="身份证">
              <div slot="right" class="input-box">
                <span>{{frontList.words_result.公民身份号码.words}}</span>
              </div>
            </ICell>
            <ICell title="有效期">
              <div slot="right" class="input-box">
                <span>{{backList.words_result.签发日期.words | dates}} —— {{backList.words_result.失效日期.words | dates}}</span>
              </div>
            </ICell>
          </IGroup>
          <IGroup v-if="UserInfo">
            <ICell title="姓名">
              <div slot="right" class="input-box">
                <span>{{UserInfo.Name}}</span>
              </div>
            </ICell>
            <ICell title="性别">
              <div slot="right" class="input-box">
                <span>{{UserInfo.sex | sex}}</span>
              </div>
            </ICell>
            <ICell title="身份证">
              <div slot="right" class="input-box">
                <span>{{UserInfo.CardNo}}</span>
              </div>
            </ICell>
            <ICell title="有效期">
              <div slot="right" class="input-box">
                <span>{{UserInfo.vaildDate | times}}</span>
              </div>
            </ICell>
          </IGroup>
        </div>
        <div class="invoiceData enterpriseData" v-if="type=='2'">
          <IGroup v-if="enterpriseData.words_result">
            <ICell title="企业名称">
              <div slot="right" class="input-box">
                <span>{{enterpriseData.words_result.单位名称.words}}</span>
              </div>
            </ICell>
            <ICell title="注册号">
              <div slot="right" class="input-box">
                <span>{{enterpriseData.words_result.证件编号.words}}</span>
              </div>
            </ICell>
            <ICell title="公司地址" class="restkl">
              <div slot="right" class="input-box">
                <span>{{enterpriseData.words_result.地址.words}}</span>
              </div>
            </ICell>
          </IGroup>
          <IGroup v-if="enterpriseInfo">
            <ICell title="企业名称">
              <div slot="right" class="input-box">
                <span>{{enterpriseInfo.EnterpriseName}}</span>
              </div>
            </ICell>
            <ICell title="注册号">
              <div slot="right" class="input-box">
                <span>{{enterpriseInfo.AgenterName}}</span>
              </div>
            </ICell>
            <ICell title="公司地址" class="restkl">
              <div slot="right" class="input-box">
                <span>{{enterpriseInfo.address}}</span>
              </div>
            </ICell>
          </IGroup>
        </div>
        <div class="replaceData">
          <IGroup class="replaceData-group">
            <ICell title="认证进度">
              <div slot="right" class="input-box">
                <span class="title1">已提交</span>
                <span class="progress-1"></span>
                <span>———</span>
                <span :class="(UserInfo.authenResult > 10 || enterpriseInfo.authenResult >10)?'progress-1':'progress-2'"></span>
                <span :class="(UserInfo.authenResult> 10 || enterpriseInfo.authenResult >10)?'title1':'title2'">审核中</span>
                <span>———</span>
                <span :class="(UserInfo.authenResult==20 || enterpriseInfo.authenResult == 20)?'progress-1':'progress-2'"></span>
                <span :class="(UserInfo.authenResult==20 || enterpriseInfo.authenResult == 20)?'title1':'title2'" style="margin-right:1rem;">已认证</span>
              </div>
            </ICell>
          </IGroup>
        </div>
        <!-- <a class="Modify">修改实名信息</a> -->
        <div class="footerbtn" v-if="$route.query.type">
          <a class="comiuts btn1" @click="goReturn">重新上传</a>
          <a class="comiuts" @click="commit">提交</a>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { XInput, XButton, PopupPicker } from "vux";
import { IPicker, IGroup, ICell, Header } from "@/components/Common";
import axios from "axios";
import {
  RealNameAuthen,
  EnterpriseAuthen,
  GetUserAuthenInfo
} from "@/api/common/wallat";
import store from "@/store";
export default {
  components: {
    XInput,
    XButton,
    PopupPicker,
    IPicker,
    IGroup,
    ICell,
    Header
  },
  data() {
    return {
      tis: true,
      type: "1",
      GOtitle: "实名认证",
      frontList: {},
      backList: {},
      enterpriseData: {},
      UserInfo: "",
      enterpriseInfo: ""
    };
  },
  mounted() {
    if (this.$route.query.IsBind) {
      if (this.$route.query.IsBind == "1") {
        this.getUserIn(1, 10);
      } else {
        this.getUserIn(1, 20);
      }
    } else {
      if (this.$route.query.type == "1") {
        this.frontList = store.state.app.realName.frontList;
        this.backList = store.state.app.realName.backList;
        this.type = "1";
      } else if (this.$route.query.type == "2") {
        this.enterpriseData = store.state.app.Enterprise;
        this.type = "2";
      }
    }
  },
  filters: {
    dates(val) {
      if (val) {
        let year = val.substring(0, 4);
        let money = val.substring(4, 6);
        let day = val.substring(6, 8);
        return year + "-" + money + "-" + day;
      }
    },
    sex(val) {
      if (val == "1") {
        return "男";
      } else {
        return "女";
      }
    },
    times(val) {
      return new Date(val).format("yyyy-MM-dd");
    }
  },
  methods: {
    getUserIn(uid, type) {
      let data = {
        uid: uid,
        type: type
      };
      GetUserAuthenInfo(data).then(res => {
        if (res) {
          if (type == 10) {
            this.UserInfo = res;
            this.type = "1";
          }
          if (type == 20) {
            this.enterpriseInfo = res;
            this.type = "2";
          }
        }
      });
    },
    onChangepk1(data) {},
    goReturn() {
      this.$router.go(-1);
    },
    commit() {
      if (this.$route.query.type == "1") {
        let data = {};
        data.authenFrontFile = this.$route.query.fileZHENGMIAN;
        data.authenBackFile = this.$route.query.fileFANMIAN;
        data.userId = "1";
        data.Name = this.frontList.words_result.姓名.words;
        data.CardNo = this.frontList.words_result.公民身份号码.words;
        data.vaildDate =
          this.backList.words_result.失效日期.words.substring(0, 4) +
          "-" +
          this.backList.words_result.失效日期.words.substring(4, 6) +
          "-" +
          this.backList.words_result.失效日期.words.substring(6, 8);
        if (this.frontList.words_result.性别.words == "男") {
          data.sex = 1;
        } else {
          data.sex = 0;
        }
        RealNameAuthen(JSON.stringify(data)).then(res => {
          if (res) {
            this.$router.push({ path: "/Audit" });
          }
        });
      } else {
        let data = {};
        data.userId = 1;
        data.authenFile = this.enterpriseData.fileZHENGMIAN;
        if (this.enterpriseData) {
          data.EnterpriseName = this.enterpriseData.words_result.单位名称.words;
          data.AgenterName = this.enterpriseData.words_result.证件编号.words;
          data.address = this.enterpriseData.words_result.地址.words;
          data.vaildDate = "9999-12-30";
        }
        EnterpriseAuthen(data).then(res => {
          if (res) {
            this.$router.push({ path: "/Audit" });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.bg-box {
  height: 100%;
  overflow: hidden;
  background: #eee;
}
.content {
  overflow: auto;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 3.14rem;
  left: 0;
  right: 0;
  bottom: 0;
  .content-box {
    .titles {
      font-size: 1.1rem;
      color: #0662be;
      line-height: 3rem;
    }
    .invoiceData {
      background: #fff;
      .group {
        padding: 1.2rem 0;
        box-shadow: none;
        .cell {
          padding: 0;
          margin-left: 1.3rem;
          border-bottom: 1px solid #bbb;
          /deep/ .left {
            min-width: 6rem;
            margin-right: 1.4rem;
            color: #666666;
            text-align: left;
            font-size: 1rem;
          }
          .input-box {
            text-align: left;
            span {
              font-size: 1rem;
              color: #000;
            }
          }
          &:nth-last-child(1) {
            border: none;
          }
        }
      }
    }
    .enterpriseData {
      .group {
        padding: 2.2rem 0;
        padding-top: 1.2rem;
        .restkl {
          line-height: normal;
          /deep/ .left {
            line-height: 3rem;
          }
          /deep/ .input-box {
            span {
              line-height: 2.5rem;
            }
          }
        }
      }
    }
    .replaceData {
      margin-top: 10px;
      /deep/ .replaceData-group {
        box-shadow: none;
        border-radius: 0;
        .cell {
          padding: 0;
          border: none;
          .left {
            min-width: 4rem;
            color: #666666;
            text-align: left;
            font-size: 1rem;
            padding-left: 1.3rem;
          }
          .input-box {
            box-sizing: border-box;
            position: relative;
            width: 100%;
            padding: 0;
            text-align: right;
            .progress-1 {
              width: 15px;
              height: 15px;
              display: inline-block;
              .bg-img("progress-1");
              background-size: contain;
              vertical-align: sub;
            }
            .progress-2 {
              width: 15px;
              height: 15px;
              display: inline-block;
              .bg-img("progress-2");
              background-size: contain;
              vertical-align: sub;
            }
            .title1 {
              color: #20a517;
            }
          }
        }
      }
    }
    .Modify {
      font-size: 1rem;
      color: #ff0000;
      line-height: 3rem;
    }
    .footerbtn {
      a {
        width: 32%;
      }
      .btn1 {
        background: #fff;
        border: 1px solid #bbb;
        color: #999;
      }
    }
  }
}
</style>
