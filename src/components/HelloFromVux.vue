<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="我的" value="cool" is-link link="/MyInfo"></cell>
      <cell title="下单" value="cool" is-link link="/Delivery"></cell>
      <cell title="我的订单" value="cool" is-link link="/MyOrderManage"></cell>
      <!-- <cell title="我的钱包" value="cool" is-link link="/MyWallet"></cell> -->
      <cell title="发票管理" value="cool" is-link link="/InvoiceManagement"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from "vux";

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: "Hello World!"
    };
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
