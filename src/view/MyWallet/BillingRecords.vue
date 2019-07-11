<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="date-box">
        <In-Choosing @lock="lock" :date="dates" :years="years" :isA="isA"></In-Choosing>
      </div>
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
          <div v-for="item in recordsList" class="invoiceList-box">
            <div class="information">
              <p class="title">{{item.money}}月{{item.day}}日</p>
              <div v-for="ite in item.records" class="recordsLists" @click="details(ite)">
                <p class="name" v-if="ite.Title">{{ite.Title}}</p>
                <p class="type" v-if="ite.MoneyChangType == 1">{{ite.Status | Status1}}</p>
                <p class="type" v-if="ite.MoneyChangType == 0">{{ite.Status | Status2}}</p>
                <p class="date">{{ite.ChangeDateTime | time}}</p>
                <p class="price">
                  <span v-if="ite.MoneyChangType == 1">+</span>
                  <span v-if="ite.MoneyChangType == 0">-</span>
                  {{ite.ChangeMoney | money}}</p>
                <x-icon type="ios-arrow-right" size="30" class="cell-x-icon"></x-icon>
              </div>
              <!-- <div v-else>
              暂无记录
            </div> -->
            </div>
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
</template>
<script>
import { IGroup, ICell, Header } from "@/components/Common";
import { InChoosing } from "@/components/WalletInfo";
import { GetBillList } from "@/api/common/wallat";
import store from "@/store";
import { Moneys } from "../../libs/comms";
import { constants } from "crypto";
export default {
  components: {
    IGroup,
    ICell,
    InChoosing,
    Header
  },
  data() {
    return {
      GOtitle: "账单明细",
      recordsList: [],
      yeas: "",
      yead: "",
      dates: [],
      years: [[], []],
      totelDay: 0, //计算月的天数
      startTime: "",
      isA: false,
      moreRecordsList: []
    };
  },
  filters: {
    Status1(val) {
      if (val == "10") {
        return "正在提现";
      } else if (val == "20") {
        return "已提现";
      } else if (val == "30") {
        return "提现失败";
      }
    },
    Status2(val) {
      if (val == "10") {
        return "正在充值";
      } else if (val == "20") {
        return "已充值";
      } else if (val == "30") {
        return "充值失败";
      }
    },
    time(val) {
      return val.substring(5, 16);
    },
    money(val) {
      return Moneys(val);
    }
  },
  mounted() {
    if (store.state.app.walletId) {
      // this.DateNew(store.state.app.walletId);
    }
    let date = new Date();
    this.DateNew(date);
  },
  methods: {
    DateNew(data) {
      let date = new Date(data);
      this.dates[0] = date.getFullYear() + "";
      this.yead = this.dates[0];
      this.dates[1] = date.getMonth() + 1 + "";
      this.totelDay = this.getDaysInOneMonth(
        date.getFullYear(),
        date.getMonth() + 1 + ""
      );
    },
    //获取某个月的总天数
    getDaysInOneMonth(year, month) {
      month = parseInt(month, 10);
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    tab(date1, date2) {
      var oDate1 = new Date(date1);
      var oDate2 = new Date(date2);
      if (oDate1.getTime() < oDate2.getTime()) {
        return true;
      } else {
        return false;
      }
    },
    getDates(id, date, fn) {
      let data = {
        walletId: id,
        dateTime: date
      };
      GetBillList(data).then(res => {
        if (res) {
          if (res.list.length > 0) {
            let datas = new Date(date);
            for (let i = 1; i <= this.totelDay; i++) {
              this.recordsList.push({
                money: datas.getMonth() + 1,
                day: i >= 10 ? i : "0" + i,
                records: []
              });
            }
            for (let i = 0; i < this.recordsList.length; i++) {
              for (let j = 0; j < res.list.length; j++) {
                if (
                  this.recordsList[i].day ==
                  res.list[j].ChangeDate.substring(8, 10)
                ) {
                  this.recordsList[i].records.push(res.list[j]);
                }
              }
            }
            for (let m = 0; m < this.recordsList.length; m++) {
              if (this.recordsList[m].records.length == 0) {
                this.recordsList.splice(m, 1);
                m = m - 1;
              }
            }
          } else {
            this.recordsList = [];
            if (fn) {
              fn(true);
            }

            this.$refs.scrollerBottom.finishInfinite(true);
            return;
          }
        }
      });
    },
    //加载更多
    getmoreDates(id, date, fn) {
      let data = {
        walletId: id,
        dateTime: date
      };
      GetBillList(data).then(res => {
        if (res) {
          if (res.startTime) {
            this.startTime = res.startTime;
            this.yeas = res.startTime.substring(0, 4);
            if (parseInt(this.yead) > parseInt(this.yeas)) {
              let nums = parseInt(this.yead) - parseInt(this.yeas);
              let arr = [];
              for (let i = 0; i <= nums; i++) {
                arr.push(parseInt(this.yeas) + i + "");
              }
              this.years[0] = arr.reverse();

              for (let i = 1; i <= 12; i++) {
                this.years[1].push(i);
              }
            }
          }
          let datas = new Date(date);
          if (this.tab(date, res.startTime.substring(0, 11))) {
            fn(true);
            return;
          } else {
            if (fn) {
              fn();
            }
          }
          //进行比较
          // return startTime > endTime;
          if (res.list.length > 0) {
            for (let i = 1; i <= this.totelDay; i++) {
              this.moreRecordsList.push({
                money: datas.getMonth() + 1,
                day: i >= 10 ? i : "0" + i,
                records: []
              });
            }

            for (let i = 0; i < this.moreRecordsList.length; i++) {
              for (let j = 0; j < res.list.length; j++) {
                if (
                  this.moreRecordsList[i].day ==
                  res.list[j].ChangeDate.substring(8, 10)
                ) {
                  this.moreRecordsList[i].records.push(res.list[j]);
                }
              }
            }
            for (let m = 0; m < this.moreRecordsList.length; m++) {
              if (this.moreRecordsList[m].records.length == 0) {
                this.moreRecordsList.splice(m, 1);
                m = m - 1;
              }
            }
            this.recordsList.concat(this.moreRecordsList);
          } else {
            this.moreRecordsList = [];
            this.$refs.scrollerBottom.finishInfinite(true);
            return;
          }
        }
      });
    },
    //下拉刷新
    refresh(done) {
      let date = new Date();
      let data = new Date().format("yyyy-MM-dd");
      this.isA = false;

      setTimeout(() => {
        this.recordsList = [];
        this.DateNew(date);
        this.getDates(1, data, done);
        this.isA = true;
      }, 1500);
    },
    //上拉加载数据
    infinite(done) {
      var s = -1;
      s++;
      var date = new Date();
      var nowD =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      date.setMonth(date.getMonth() - s);
      var month = date.getMonth();
      month = month == 0 ? 12 : month;
      let money = "";
      if (date.getMonth() + 1 < 10) {
        money = "0" + (date.getMonth() + 1);
      } else {
        money = date.getMonth() + 1;
      }
      let day = "";
      if (date.getDate() < 10) {
        day = "0" + date.getDate();
      } else {
        day = date.getDate();
      }
      var befD = date.getFullYear() + "-" + money + "-" + day;
      setTimeout(() => {
        this.DateNew(befD);
        this.getmoreDates(1, befD, done);
      }, 1500);
    },
    details(ite) {
      this.$router.push({ path: "/BillingDetails", query: { Id: ite.Id } });
    },
    lock(data) {
      if (data) {
        let strs = data.substring(0, 4);
        let date = new Date(data);
        this.recordsList = [];
        if (!this.isA) {
          this.DateNew(data);
          this.getDates(1, data);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  position: absolute;
  width: 100%;
  top: 6.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
}
.date-box {
  min-height: 3.5rem;
  width: 100%;
  background: #eee;
  position: fixed;
  top: 3.14rem;
  z-index: 10;
}
.invoiceList {
  .invoiceList-box {
    background: #fff;
    /deep/ .information {
      overflow: hidden;
      .title {
        padding: 10px 20px;
        background: #eee;
      }
      .recordsLists {
        border-bottom: 1px solid #e5e5e5;
        min-height: 5rem;
        margin: 0 20px;
        background: #fff;
        position: relative;
        .name {
          font-size: @menuFontSzie;
          color: #000;
          font-weight: 500;
          margin: 0.5rem 0;
        }
        .type,
        .date {
          font-size: 0.8rem;
          color: #999999;
          margin-bottom: 0.5srem;
        }
        .price {
          font-size: @menuFontSzie;
          color: #0562be;
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translate(0, -50%);
        }
        .cell-x-icon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          fill: #999;
        }
      }
    }
  }
}
</style>
