<template>
  <div>
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="titie">
        <p class="success">申请提现</p>
        <flow orientation="vertical" style="height:170px;">
          <flow-state state="1" title="提现成功" is-done></flow-state>
          <flow-line></flow-line>
          <span class="loser-1">1111111111</span>
          <flow-state state="2" title="申请处理中" is-done></flow-state>
          <flow-line is-done></flow-line>
          <span class="loser-2">1111111111</span>
          <flow-state state="3" title="申请时间">1111</flow-state>
          <span class="loser-3">1111111111</span>
        </flow>
      </div>
      <div class="information">
        <IGroup>
          <ICell title="当前状态">
            <div slot="right" class="input-box">
              <span>个人</span>
            </div>
          </ICell>
          <ICell title="到款方式">
            <div slot="right" class="input-box">
              <span>xxx公司</span>
            </div>
          </ICell>
          <ICell title="交易时间">
            <div slot="right" class="input-box">
              <span>xxx公司</span>
            </div>
          </ICell>
        </IGroup>
      </div>
    </div>

  </div>
</template>
<script>
import { IGroup, ICell, Header } from "@/components/Common";
import { Flow, FlowState, FlowLine } from "vux";
export default {
  components: {
    IGroup,
    ICell,
    Flow,
    FlowState,
    FlowLine,
    Header
  },
  data() {
    return {
      GOtitle: "账单明细"
    };
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.content-box {
  margin-top: 3.14rem;
  text-align: left;
  height: calc(100% - 50px);
  overflow: hidden;
  .titie {
    .success {
      font-size: @menuFontSzie;
      color: #333;
      margin: 1rem 0 1rem 1rem;
      font-weight: 500;
    }
    /deep/ .weui-wepay-flow {
      .weui-wepay-flow__bd {
        position: relative;
        left: -155px;
        top: -16px;
        .loser-1 {
          position: absolute;
          right: 64px;
          top: 17px;
        }
        .loser-2 {
          position: absolute;
          right: 64px;
          top: 90px;
        }
        .loser-3 {
          position: absolute;
          right: 64px;
          bottom: -24px;
        }
      }
    }
  }
  .information {
    .group {
      box-shadow: none;
      border-top: 1px solid #ccc;
      /deep/ .cell {
        border: none;
        display: flex;
        justify-content: space-between;
        .left {
          font-size: 1rem;
          color: #000;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
