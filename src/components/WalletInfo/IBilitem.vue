<template>
  <div>
    <div class="bil-box" v-for="item in DataList">
      <div class="info">
        <div class="title" v-if="item.Title">{{item.Title}}</div>
        <div class="title" v-else>--</div>
        <div class="status" v-if="item.MoneyChangType == 1">
          <span>{{item.Status | Status1}}</span>
        </div>
        <div class="status" v-if="item.MoneyChangType == 0">
          <span>{{item.Status | Status2}}</span>
        </div>
      </div>
      <div class="money" :class="_status">
        <div>
          <span v-if="item.MoneyChangType == 1">+￥</span>
          <span v-if="item.MoneyChangType == 0">-￥</span>
          <countup :end-val="item.ChangeMoney" :duration="1.5" :decimals="2" :start-val="startVal"></countup>
        </div>
        <div class="date">{{item.ChangeDateTime | time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Countup } from "vux";
import store from "@/store";
import { GetWalletMid } from "@/api/common/wallat";
const status = ["Income", "spending"];
export default {
  name: "IBilitem",
  props: {
    opts: {
      type: Object,
      default: () => {
        return {
          title: "",
          status: 0,
          date: ""
        };
      }
    }
  },
  components: {
    Countup
  },
  data() {
    return {
      startVal: 0,
      pageIndex: 1,
      pageSize: 2,
      DataList: []
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
      return new Date(val).format("MM-dd hh:mm");
    }
  },
  mounted() {
    if (store.state.app.UserData) {
      // this.GetBill(store.state.app.UserData.userId);
    }
    this.GetBill(1);
  },
  methods: {
    GetBill(id) {
      GetWalletMid(id).then(res => {
        console.log(res);
        if (res && res.DataList) {
          this.DataList = res.DataList;
        }
      });
    }
  },
  computed: {
    _status() {
      return status[this.opts.status];
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.bil-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.5rem;
  fill: #999999ff;
  color: #999999ff;
}
.info {
  flex: 1;
}
.title {
  color: #000;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}
.status,
.date {
  font-size: 1rem;
}
.money,
.title {
  font-size: 1.2rem;
}
.money {
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.to-detail {
  width: 1.5rem;
  display: flex;
  align-items: center;
}

.Income {
  color: @theme-color;
}
.spending {
  color: #ff0000ff;
}
</style>
 