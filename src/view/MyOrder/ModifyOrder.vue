<template>
  <div class="bg-box">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="title">
        <p>物流编号：{{details.number}}</p>
        <span>下单时间：{{details.orderTime}}</span>
      </div>
      <ul>
        <li>国家：<span>{{details.toCountry | Country}}</span></li>
        <li>服务产品：<span>{{details.serviceProduct}}</span></li>
        <li>物品重量：<span>{{details.estimatedWeight}}KG</span></li>
        <li>包裹件数：<span>{{details.packageCount}}件</span></li>
        <li>物品类型：<span>{{details.goodsType | type}}</span></li>
        <li>单独报关退税：<span>{{details.isCustomsRebate | Rebate}}</span></li>
        <li>支付方式：<span>{{details.payTypeCode | Code}}</span></li>
        <li v-if="details.ThridExpressInfo">第三方运单号：<span>{{details.ThridExpressInfo.thirdNum}}</span></li>
      </ul>
    </div>
    <div class="footer" v-if="details.status == '10'">
      <a @click="submit" class="nextStep">修改订单信息</a>
    </div>
  </div>
</template>
<script>
import { Header } from "@/components/Common";
import { GetOrderDetail } from "@/api/common/order";
export default {
  components: {
    Header
  },
  data() {
    return {
      GOtitle: "订单详情",
      details: {}
    };
  },
  filters: {
    Country(val) {
      if (val) {
        if (val == "CN") {
          return "中国";
        } else if (val == "IR") {
          return "伊朗";
        }
      }
    },
    type(val) {
      if (val == "B") {
        return "包裹";
      } else if (val == "P") {
        return "文件";
      }
    },
    Rebate(val) {
      if (val > 0) {
        return "是";
      } else {
        return "否";
      }
    },
    Code(val) {
      if (val == "HDFK") {
        return "货到付款";
      }
      if (val == "ZXZF") {
        return "在线支付";
      }
      if (val == "GSZZ") {
        return "公司转账";
      }
    }
  },
  mounted() {
    if (this.$route.query.orderId) {
      this.getDateil(this.$route.query.orderId);
    }
  },
  methods: {
    getDateil(orderId) {
      GetOrderDetail(orderId).then(res => {
        if (res) {
          this.details = res;
        }
      });
    },
    submit() {
      this.$router.push({
        path: "/Delivery",
        query: {
          orderId: this.details.orderId,
          isModify: "1"
        }
      });
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
  background: #fff;
  .title {
    width: 95%;
    background: #eee;
    border-radius: 5px;
    margin: 2rem auto;
    overflow: hidden;
    p {
      font-size: 1.1rem;
      color: #000;
      margin-top: 1rem;
      margin-left: 0.8rem;
    }
    span {
      font-size: 0.8rem;
      color: #666;
      margin-left: 0.8rem;
      margin-bottom: 0.5rem;
      display: block;
    }
  }
  ul {
    padding: 0.8rem 1.5rem;
    li {
      line-height: 2rem;
      font-size: 1rem;
      color: #666;
      span {
        color: #000;
      }
    }
  }
}
</style>
