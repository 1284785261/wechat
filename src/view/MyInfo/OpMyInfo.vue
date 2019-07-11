<template>
  <div>
    <div class="MyInfoHead">
      <OpMyInfoHead></OpMyInfoHead>
    </div>
    <div class="MyInfoBody">
      <MyInfoMenu :Menus="Menus"></MyInfoMenu>
    </div>
    <Box class="retrue">
      <XButton plain type="warn" action-type="button" @click.native="LoginOut">退出登录</XButton>
    </Box>
  </div>
</template>

<script>
import { MyInfoMenu, OpMyInfoHead } from "@/components/MyInfo";
import { Confirm, XButton, Box, Group, Cell } from "vux";
export default {
  components: {
    OpMyInfoHead,
    MyInfoMenu,
    Confirm,
    Box,
    XButton,
    Group,
    Cell
  },
  data() {
    return {
      Menus: [
        {
          title: "手机号",
          txt: "15421546542",
          path: "/BindMobilePhone",
          img: ""
        },
        {
          title: "注销",
          txt: "注销后无法恢复，请谨慎操作",
          path: "/PinHouseholds",
          img: ""
        }
      ]
    };
  },
  methods: {
    LoginOut() {
      this.$vux.confirm.show({
        // 组件除show外的属性
        hideOnBlur: true,
        content: `<p style="font-size:20px">确定要退出吗?</p>`,
        onCancel: () => {
          console.log(this); //当前 vm
        },
        onConfirm: () => {}
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.retrue {
  button {
    width: 30%;
    font-size: 1.4rem;
    color: #ff8000;
  }
}
</style>
