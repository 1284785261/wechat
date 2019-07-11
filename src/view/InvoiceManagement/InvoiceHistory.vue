<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content">
      <span v-if="!tis" class="noInformation">暂无开票历史信息~</span>
      <div class="content-box" v-else>
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="scrollerBottom" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
          <!-- 上拉刷新动画 -->
          <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round">
              <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
              </line>
              <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
              </line>
              <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
              </line>
              <line x1="52" x2="52" y1="16" y2="48">
                <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate>
              </line>
            </g>
          </svg>
          <div class="invoiceList">
            <div v-for="(item,index) in invoiceList" class="invoiceList-box" @click="InvoiceDetails(item)" :key="index">
              <div class="slecets">
              </div>
              <div class="information">
                <p class="numvber">单号：{{item.OrderNo}}</p>
                <p><span class="icon1"></span>始发地 ———— 目的地</p>
                <p><span class="icon2"></span>件数 : {{item.Pse}}件</p>
                <p><span class="icon2"></span>重量 : {{item.Weight}}KG</p>
                <p class="invoicedate">{{item.DownOrderTime}}</p>
              </div>
              <p class="bitch">已开发票</p>
              <p class="price">￥{{item.TotalMoney}}</p>
            </div>
          </div>
          <!-- 下拉加载动画 -->
          <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g>
              <circle cx="16" cy="32" stroke-width="0" r="3">
                <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate>
                <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
              </circle>
              <circle cx="32" cy="32" stroke-width="0" r="3.09351">
                <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate>
                <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
              </circle>
              <circle cx="48" cy="32" stroke-width="0" r="4.09351">
                <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate>
                <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
              </circle>
            </g>
          </svg>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
import { XInput, XButton, PopupPicker } from "vux";
import { IPicker, Header } from "@/components/Common";
import { GetInvoices } from "@/api/common/Invoices";
export default {
  components: {
    XInput,
    XButton,
    PopupPicker,
    IPicker,
    Header
  },
  data() {
    return {
      GOtitle: "开票历史",
      tis: true,
      invoiceList: [],
      pageIndex: 0,
      pageSize: 5
    };
  },
  mounted() {},
  methods: {
    //获取开票历史列表
    InvoiceList(offset, fn) {
      let data = {};
      data.uId = 1;
      data.type = 20;
      data.pageIndex = offset;
      data.pageSize = this.pageSize;
      GetInvoices(data).then(res => {
        if (res && res.Total > 0) {
          let maxNum = Math.ceil(res.Total / data.pageSize); //判断总共有多少页

          if (offset > maxNum) {
            //如果当前页大于总页数判断显示没有更多数据
            fn(true);
            return;
          } else {
            if (fn) {
              fn();
            }
          }
          if (this.pageIndex == 1) {
            this.invoiceList = res.DataList;
          } else {
            this.invoiceList = this.invoiceList.concat(res.DataList);
          }
        } else {
          this.tis = false;
        }
      });
    },
    //下拉刷新
    refresh(done) {
      this.pageIndex = 1;
      setTimeout(() => {
        this.InvoiceList(1, done);
      }, 1500);
    },
    //上拉加载数据
    infinite(done) {
      setTimeout(() => {
        this.pageIndex++;
        this.InvoiceList(this.pageIndex, done);
      }, 1500);
    },
    goReturn() {
      this.$router.go(-1);
    },
    InvoiceDetails(item) {
      console.log(item);
      this.$router.push({
        path: "/InvoiceDetails",
        query: { recordID: item.recordID }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content {
  text-align: center;
  height: 100%;
  overflow: hidden;
  .noInformation {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: @menuFontSzie;
  }
  .content-box {
    position: absolute;
    width: 100%;
    top: 3.14rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
    .box2-wrap {
      height: 300px;
      overflow: hidden;
    }
    .rotate {
      display: inline-block;
      transform: rotate(-180deg);
    }
    .pullup-arrow {
      transition: all linear 0.2s;
      color: #666;
      font-size: 25px;
    }
    .invoiceList {
      height: 100%;
      .invoiceList-box {
        margin: 1rem;
        height: 9rem;
        display: flex;
        flex: 1;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        background: #fff;
        .slecets {
          margin-right: 1.1rem;
        }
        .information {
          text-align: left;
          .numvber {
            font-size: @menuFontSzie;
            color: #000;
            margin-bottom: 0.5rem;
          }
          p {
            font-size: 0.8rem;
            color: #000;
            .icon1 {
              display: inline-block;
              width: 3px;
              height: 3px;
              background: #ff6600;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 0.5rem;
            }
            .icon2 {
              display: inline-block;
              width: 3px;
              height: 3px;
              background: #0a65bf;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 0.5rem;
            }
          }
          .invoicedate {
            color: #999;
            font-size: 0.9rem;
            margin-top: 0.5rem;
          }
        }
        .bitch {
          font-size: 1rem;
          color: #999;
          font-weight: 500;
          position: absolute;
          right: 1rem;
          top: 0.5rem;
        }
        .price {
          font-size: @menuFontSzie;
          color: #000;
          font-weight: 500;
          position: absolute;
          right: 1rem;
          bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
