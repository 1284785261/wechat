<template>
  <div class="InvoiceManagement-box">
    <div class="content-box">
      <cell title="申请发票" is-link link="/applyInvoice">
        <div class="visit-btn">
          <x-icon type="ios-arrow-right" size="28" class="countries-blue"></x-icon>
        </div>
      </cell>
      <cell title="发票抬头" is-link link="/InvoiceLookup">
        <div class="visit-btn">
          <x-icon type="ios-arrow-right" size="28" class="countries-blue"></x-icon>
        </div>
      </cell>
      <cell title="开票历史" is-link link="/InvoiceHistory">
        <div class="visit-btn">
          <x-icon type="ios-arrow-right" size="28" class="countries-blue"></x-icon>
        </div>
      </cell>
    </div>
  </div>
</template>
<script>
import { Group, Cell } from "vux";
export default {
  components: {
    Group,
    Cell
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.InvoiceManagement-box {
  height: 100%;
  background: #eee;
  .content-box {
    background: #fff;
    padding-left: 1.2rem;
    /deep/ .weui-cell {
      border-bottom: 1px solid #bbbbbb;
      background: #fff;
      .vux-cell-bd {
        p {
          .vux-label {
            font-size: @menuFontSzie;
            color: #000;
            font-weight: 500;
            font-family: @fontFamily;
          }
        }
      }
      .weui-cell__ft {
        //   color: @theme-color;
        padding-right: 0;
        &::after {
          display: none;
          border-color: @theme-color;
          margin-top: -12px;
          height: 14px;
          width: 14px;
        }
      }
      &:nth-last-child(1) {
        border: none;
      }
    }
    .visit-btn {
      fill: @theme-color;
      color: @theme-color;
      display: flex;
      align-items: center;
      transition: all 0.5s;
    }
  }
}
</style>
