<template>
  <div>
    <div class="MyInfoMenu">
      <Group>
        <div slot="title" class="weui-cells vux-no-group-title menu-group">

          <cell is-link v-for="(menu,index) in Menus" :link="menu.path" :key="index" @click="gotoUrl(menu)">
            <img slot="icon" :src="menu.img" v-if="menu.img">
            <div slot="title" class="cell-menu">{{menu.title}}</div>
            <span v-if="menu.txt =='未认证'">{{menu.txt}}</span>
            <span v-if="menu.txt =='已提交'" style="color:#0562BE;">{{menu.txt}}</span>
            <span v-if="menu.txt =='已认证'" style="color:#0562BE;">{{menu.txt}}</span>
          </cell>
        </div>
      </Group>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
export default {
  components: {
    Group,
    Cell
  },
  props: {
    Menus: Array
  },
  data() {
    return {};
  },
  methods: {
    gotoUrl(item) {
      console.log(item);
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.MyInfoMenu img {
  margin-right: 5px;
  width: 27px;
  height: 27px;
}
.MyInfoMenu span {
  font-size: 1rem;
  font-family: @fontFamily;
  color: red;
  line-height: 30px;
}
.cell-menu {
  float: left;
  font-size: 1rem;
  color: #000;
  font-family: @fontFamily;
}
.menu-group {
  margin-top: 0;
}
.menu-group::before {
  border-top: transparent;
}
</style>
