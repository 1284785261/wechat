<template>
  <div>
    <div @click="colosmasks" class="mask" :class="maskList.classShow?'mask2':''">
    </div>
    <div class="parametersModel" :class="maskList.classShow?'parametersModel2':''">
      <div class="buttonstyle">
        <a @click="cancel">取消</a>
        <a @click="additionalFrom">确定</a>
      </div>
      <div class="typeListStyle">
        <div class="typeList-box">
          <div class="type" v-for="(item,index) in typeList" :key="index" :class="selectedIndex == index?item.className2:item.className1" @click="typeItem(index)">
          </div>
        </div>
        <div class="title-box">
          <span>包裹</span>
          <span>文件</span>
        </div>
        <div class="attached-box" v-if="selectedIndex == '0'">
          <div v-for="(item,index) in attachedList" :key="item.name" :class="item.isSelected?'isSelected2':''" @click="attached(index)">{{item.name}}</div>
        </div>
      </div>
      <p class="title"><span>*</span>包裹需要勾选是否带电带牌</p>
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
      ],
      attachedList: [
        {
          name: "带电",
          isSelected: false,
          type: "DD"
        },
        {
          name: "带牌",
          isSelected: false,
          type: "DP"
        },
        {
          name: "带磁",
          isSelected: false,
          type: "DC"
        }
      ]
    };
  },
  watch: {
    "maskList.infos"() {
      if (this.$route.query.orderId) {
        if (this.maskList.infos.length > 0) {
          this.selectedIndex = "0";
          for (let i = 0; i < this.attachedList.length; i++) {
            for (let j = 0; j < this.maskList.infos.length; j++) {
              if (this.attachedList[i].type == this.maskList.infos[j]) {
                this.$set(this.attachedList[i], "isSelected", true);
              }
            }
          }
        } else {
          this.selectedIndex = "1";
        }
      }
    }
  },
  mounted() {},
  methods: {
    colosmasks() {
      for (let i = 0; i < this.attachedList.length; i++) {
        this.$set(this.attachedList[i], "isSelected", false);
      }
      this.maskList.classShow = false;
    },
    cancel() {
      this.colosmasks();
      this.$emit("typeList", "");
    },
    additionalFrom() {
      let carry = {
        goodsType: "",
        carryFeature: []
      };
      carry.goodsType = this.typeList[this.selectedIndex].type;
      if (this.selectedIndex == "0") {
        for (let i = 0; i < this.attachedList.length; i++) {
          if (this.attachedList[i].isSelected) {
            carry.carryFeature.push(this.attachedList[i]);
          }
        }
      }
      this.$emit("typeList", carry);
      this.maskList.classShow = false;
    },
    attached(index) {
      this.$set(
        this.attachedList[index],
        "isSelected",
        !this.attachedList[index].isSelected
      );
    },
    typeItem(index) {
      this.selectedIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #666;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}
.mask2 {
  opacity: 0.5;
  z-index: 500;
  filter: alpha(opacity=50);
}
.parametersModel {
  position: fixed;
  bottom: -21rem;
  left: 0;
  width: 100%;
  height: 21rem;
  z-index: -1;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: bottom 400ms;
  .buttonstyle {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    a {
      color: #2c7ac7;
      font-size: 0.8rem;
      padding: 20px;
    }
  }
  .typeListStyle {
    width: 100%;
    .typeList-box {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-around;
      .type {
        width: 4rem;
        height: 4rem;
        text-align: center;
        color: #999999;
        margin: 0.71rem;
        box-sizing: border-box;
        transition: all 500ms;
        background-size: contain;
      }
      .parcel-1 {
        .bg-img("type-4");
      }
      .parcel-2 {
        .bg-img("type-3");
      }
      .file-1 {
        .bg-img("type-1");
      }
      .file-2 {
        .bg-img("type-2");
      }
    }
    .title-box {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-around;
      span {
        font-size: 1rem;
        color: #000000;
        font-weight: 500;
        font-family: @fontFamily;
      }
    }
    .attached-box {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-around;
      div {
        width: 5rem;
        height: 1.8rem;
        text-align: center;
        color: #999999;
        font-size: 0.8rem;
        line-height: 1.8rem;
        border: 1px solid #bbbbbb;
        box-sizing: border-box;
        transition: all 500ms;
        margin-top: 2.7rem;
      }
      .isSelected2 {
        border: 1px solid #2c7ac7;
        background: #2c7ac7;
        color: #ffffff;
      }
    }
  }
  .title {
    color: #999999;
    font-size: 0.71rem;
    margin-left: 1.9rem;
    margin-top: 2.57rem;
    span {
      color: #ff0000;
    }
  }
}
.parametersModel2 {
  bottom: -1rem;
  z-index: 501;
}
</style>

