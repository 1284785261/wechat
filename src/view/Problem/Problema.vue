<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <tab :line-width="1" custom-bar-width="20px">
        <tab-item :selected="index===0" :key="index" v-for="(item,index) in tabItem" @on-item-click="tabIndex(index)">{{item}}</tab-item>
      </tab>
      <div class="Proble-box">
        <div v-for="(item,index) in ProbleList" :key="index" class="ProbleList" @click="Processing(item)">
          <div class="title-box">
            <p class="title">工单号：{{item.OrderNo}}</p>
            <a v-if="tabIndexIndex == '2'">删除</a>
          </div>
          <div class="details">
            <div class="imgbox">
              <img :src="item.img">
            </div>
            <div>
              <p>物流编号:{{item.SerialnNumber}}</p>
              <p>问题类型:{{item.type}}</p>
              <p>生成时间:{{item.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Header, IGroup, ICell } from "@/components/Common";
import { XInput, Tab, TabItem } from "vux";
const tabItem = ["待处理", "处理中", "已完成"];
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
      GOtitle: "问题详情",
      tabIndexIndex: 0,
      tabItem: tabItem,
      ProbleList: [
        {
          OrderNo: 4004122,
          img: require("../../assets/share-2.png"),
          SerialnNumber: 123456,
          type: "1",
          date: "2019-02-56  12:54:50"
        },
        {
          OrderNo: 4004122,
          img: require("../../assets/vux_logo.png"),
          SerialnNumber: 123456,
          type: "1",
          date: "2019-02-56  12:54:50"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    Processing(item) {
      this.$router.push({
        path: "/ProcessingState",
        query: { detail: item, tabIndexIndex: this.tabIndexIndex }
      });
    },
    tabIndex(index) {
      this.tabIndexIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  overflow: hidden;
  margin-top: 3.14rem;
  .vux-tab-wrap {
    .vux-tab-container {
      .vux-tab {
        font-weight: 600;
        .vux-tab-item {
          color: #999;
        }
        .vux-tab-selected {
          color: #2c7ac7;
        }
      }
    }
  }
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
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #bbb;
        font-size: 1.1rem;
        .title {
          padding-left: 1rem;
          line-height: 3rem;
        }
        a {
          color: #999;
          margin-right: 1.3rem;
        }
      }

      .details {
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
    }
  }
}
</style>
