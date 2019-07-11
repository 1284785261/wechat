<template>
  <div>
    <div class="parametersModel" :class="maskList.classShow?'parametersModel2':''">
      <a class="cancel" @click="cancel">取消</a>
      <a class="additionalFrom" @click="additionalFrom">确定</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "PackageType",
  props: ["maskList"],
  data() {
    return {
      selectedIndex: "0",
      typeList: [
        {
          className1: "parcel-1",
          className2: "parcel-2",
          type: "B"
        },
        {
          className1: "file-1",
          className2: "file-2",
          type: "P"
        }
      ]
    };
  },

  mounted() {},
  methods: {
    colosmasks() {
      this.maskList.classShow = false;
    },
    cancel() {
      this.colosmasks();
      this.$emit("cancel", true);
    },
    additionalFrom() {
      this.maskList.classShow = false;
      this.$emit("nextOpts", true);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.parametersModel {
  position: fixed;
  bottom: -21rem;
  left: 0;
  width: 100%;
  height: 7rem;
  z-index: -1;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: bottom 400ms;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  .cancel {
    color: #999;
    font-size: 1rem;
    padding: 8px 40px;
    border: 1px solid #999;
    margin: 0 2.5rem;
    border-radius: 5px;
  }
  .additionalFrom {
    color: #fff;
    font-size: 1rem;
    padding: 8px 40px;
    background: #2c7ac7;
    border: 1px solid;
    margin: 0 2.5rem;
    border-radius: 5px;
  }
}
.parametersModel2 {
  bottom: -1rem;
  z-index: 501;
}
</style>

