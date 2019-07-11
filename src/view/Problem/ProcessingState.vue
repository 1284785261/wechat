<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="Proble-box">
        <div class="ProbleList" v-if="GOtitle == '已完成'">
          <p class="titles">处理结果</p>
          <p class="results">已完成打木架</p>
          <img class="resultsimg" src="../../assets/正面@2x.png">
        </div>
        <div class="ProbleList">
          <p class="titles" v-if="GOtitle == '已完成'">订单信息</p>
          <div class="title-box">
            <p class="title">工单号：{{Probledetail.OrderNo}}</p>
          </div>
          <div class="details">
            <div class="imgbox">
              <img :src="Probledetail.img">
            </div>
            <div>
              <p>物流编号:{{Probledetail.SerialnNumber}}</p>
              <p>下单时间:{{Probledetail.date}}</p>
            </div>
          </div>
          <div class="Alldetails">
            <span>国家：<b>11</b></span>
            <span>服务产品：<b>11</b></span>
            <span>物品重量：<b>11</b></span>
            <span>包裹件数：<b>11</b></span>
            <span>物品类型：<b>11</b></span>
            <span>单独报关退税：<b>11</b></span>
            <span>支付方式：<b>11</b></span>
            <span>第三方运单号：<b>11</b></span>
          </div>
        </div>
        <div class="ProbleList Waiting">
          <p class="titles" v-if="GOtitle == '已完成'">问题描述</p>
          <p>生成时间：</p>
          <p>问题类型：</p>
          <p>问题描述：</p>
          <p>解决方案：</p>
          <p>产生费用：</p>
          <p>凭证：<img src="../../assets/upload jia.png"></p>
        </div>
        <div class="footers">
          <a class="btn1" v-if="GOtitle == '待处理'">免责声明</a>
          <a class="btn2" v-if="GOtitle == '待处理'">接受</a>
          <a class=" btn3" v-if="GOtitle == '处理中'">去修改上传资料</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Header, IGroup, ICell } from "@/components/Common";
import { XInput, Tab, TabItem } from "vux";
export default {
  components: {
    Header,
    IGroup,
    ICell,
    XInput,
    Tab,
    TabItem
  },
  data() {
    return {
      GOtitle: "待处理",
      Probledetail: {
        OrderNo: 4004122,
        img: require("../../assets/share-2.png"),
        SerialnNumber: 123456,
        type: "1",
        date: "2019-02-56  12:54:50"
      }
    };
  },
  mounted() {
    console.log(this.$route.query);
    if (this.$route.query.tabIndexIndex == "0") {
      this.GOtitle = "待处理";
    } else if (this.$route.query.tabIndexIndex == "1") {
      this.GOtitle = "处理中";
    } else {
      this.GOtitle = "已完成";
    }
  },
  methods: {
    submit() {
      this.$router.push({ path: "/OrderDetail" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  overflow: hidden;
  margin-top: 3.14rem;
  .Proble-box {
    background: #2897f5;
    min-height: 40rem;
    overflow: hidden;
    margin-top: 0.1rem;
    .ProbleList {
      background: #ffffff;
      margin: 1rem;
      border-radius: 10px;
      color: #000;
      padding-bottom: 1rem;
      overflow: hidden;
      .titles {
        font-size: 1.1rem;
        color: #000;
        border-left: 3px solid #ff9100;
        padding-left: 10px;
        margin: 1rem 1.2rem 0;
      }
      .results {
        margin-left: 1.2rem;
        margin-top: 1rem;
        font-size: 1.1rem;
      }
      .resultsimg {
        margin-left: 1.2rem;
        max-width: 6.5rem;
        max-height: 5.4rem;
        margin-top: 1rem;
      }
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1rem;
        .title {
          padding-left: 1rem;
          line-height: 3rem;
        }
      }

      .details {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #eeeeee;
        margin: 0 1rem;
        .imgbox {
          width: 5rem;
          height: 4.7rem;
          text-align: center;
          margin: 1rem 1.2rem;
          line-height: 4.7rem;
          img {
            vertical-align: middle;
            max-width: 5rem;
            max-height: 4.7rem;
          }
        }
        div {
          p {
            line-height: 1.5rem;
            font-size: 1rem;
            &:nth-last-child(1) {
              color: #555;
            }
          }
        }
      }
      .Alldetails {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 1.2rem 1.2rem 0 1.2rem;

        span {
          min-width: 50%;
          font-size: 1rem;
          color: #666;
          display: inline-block;
          line-height: 2rem;
          b {
            font-weight: normal;
            color: #000;
          }
        }
      }
    }
    .Waiting {
      padding: 1.2rem;
      .titles {
        font-size: 1.1rem;
        color: #000;
        border-left: 3px solid #ff9100;
        padding-left: 10px;
        margin: 0 0 1rem 0;
      }
      p {
        font-size: 1rem;
        color: #666;
        line-height: 2rem;
        img {
          width: 5.5rem;
          height: 5.5rem;
          vertical-align: text-top;
          margin-left: 2rem;
        }
      }
    }
    .footers {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 3rem;
      a {
        min-width: 6rem;
        height: 2.2rem;
        display: inline-block;
        text-align: center;
        line-height: 2.2rem;
        border-radius: 30px;
      }
      .btn1 {
        border: 1px solid #fff;
        color: #fff;
        margin-right: 1.5rem;
      }
      .btn2 {
        border: 1px solid #fff;
        background: #fff;
        color: #0c70bc;
        margin-right: 1.2rem;
      }
      .btn3 {
        min-width: 8rem;
        border: 2px solid #fff;
        color: #fff;
        margin-right: 1.2rem;
      }
    }
  }
}
</style>
