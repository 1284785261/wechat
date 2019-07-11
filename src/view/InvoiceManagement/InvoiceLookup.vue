<template>
  <div class="bg-box">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="addLook-up" @click="addLookup">
        <span>添加抬头</span>
        <x-icon type="ios-plus-outline" class="add" size="28"></x-icon>
      </div>
      <div class="lookUp-box">
        <div v-for="(item,index) in lookUpList" :key="index">

          <span class="name" :class="item.headType == '0'?'personal':''">{{item.invoicesHead}}</span><span v-if="item.isDefault == '0'" class="lookup-1"></span>
          <span class="numbers" v-if="item.headType == '1'">税号：{{item.registrationNumber}}</span>
          <a @click="Editor(item)"><span class="lookup-2"></span>编辑</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Header } from "@/components/Common";
import { GetUserInvoices } from "@/api/common/Invoices";
export default {
  name: "InvoiceLookup",
  components: {
    Header
  },
  data() {
    return {
      GOtitle: "发票抬头",
      lookUpList: []
    };
  },
  computed: {},
  mounted() {
    this.GetUser();
  },
  methods: {
    GetUser() {
      GetUserInvoices(1).then(res => {
        if (res.length > 0) {
          this.lookUpList = res;
        }
      });
    },
    addLookup() {
      this.$router.push({ path: "/addLookup" });
    },
    Editor(item) {
      console.log(item);
      this.$router.push({
        path: "/addLookup",
        query: {
          invoiceId: item.invoiceId
        }
      });
    },
    goReturn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.bg-box {
  background: #eee;
}
.content-box {
  position: absolute;
  width: 100%;
  top: 3.14rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .addLook-up {
    margin-top: 1.3rem;
    text-align: center;
    span {
      font-size: @menuFontSzie;
      color: #858585;
    }
    .add {
      vertical-align: bottom;
      display: inline-block;
      fill: #858585;
    }
  }
  .lookUp-box {
    margin: 1.4rem 1.4rem;

    div {
      min-height: 4.2rem;
      position: relative;
      background: #fff;
      margin-bottom: 10px;
      .name {
        color: #000;
        font-size: 1rem;
        display: inline-block;
        margin: 0.6rem 0.3rem 0 1.2rem;
      }
      .personal {
        font-size: 1rem;
        line-height: 4.2rem;
        margin: 0 0.3rem 0 1.2rem;
      }
      .numbers {
        font-size: 1rem;
        color: #bbb;
        display: block;
        margin-left: 1.2rem;
      }
      .lookup-1 {
        width: 30px;
        height: 14px;
        display: inline-block;
        .bg-img("lookup-1");
        background-size: contain;
      }
      a {
        font-size: 1rem;
        color: #666;
        position: absolute;
        top: 50%;
        right: 1.2rem;
        transform: translate(0, -50%);
        .lookup-2 {
          width: 12px;
          height: 12px;
          display: inline-block;
          .bg-img("lookup-2");
          background-size: contain;
          margin-right: 0.3rem;
          vertical-align: middle;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>
