<template>
  <div>
    <div class="nickName">
      <h1>{{User.NickName}}</h1>
      <div>{{User.CustomerCode}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NickName",
  props: ["User"],
  data() {
    return {
      nickName: "",
      customerCode: ""
    };
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
.nickName {
  text-align: center;
  padding: 15px;
}
.nickName h1 {
  font-size: 1.5rem;
  color: #000;
  font-weight: 600;
}
.nickName div {
  font-size: 1.2rem;
}
</style>
