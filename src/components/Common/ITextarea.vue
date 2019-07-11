<template>
  <div class="textarea-box">
    <textarea id="textarea" ref="textarea" @blur="blur" @input="input" @click="foucs" :cols="_opts.cols" :rows="_opts.rows">
      </textarea>
    <div class="position-box" v-if="!hideTips" @click="foucs">
      <div class="tips">{{_opts.tips}}</div>
      <div class="hint">{{_opts.hint}}</div>
    </div>
    <div class="opts-box">
      <div class="btn" v-if="_type.type==='btn'" @click="submit">{{_type.text}}</div>
      <div class="len" v-if="_type.type==='len'">{{this.val.length}}/{{_maxLen}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ITextarea",
  props: {
    opts: Object,
    type: Object,
    maxLen: Number
  },
  data() {
    return {
      len: 0,
      val: "",
      hideTips: false
    };
  },
  computed: {
    _opts() {
      return Object.assign(
        {
          cols: 45,
          rows: 8,
          tips: "",
          hint: ""
        },
        this.opts
      );
    },
    _type() {
      return Object.assign(
        {
          type: "",
          text: ""
        },
        this.type
      );
    },
    _maxLen() {
      return this.maxLen || 0;
    }
  },
  methods: {
    foucs() {
      this.hideTips = true;
      this.$refs.textarea.focus();
    },
    blur() {
      if (this.val.length === 0) this.hideTips = false;
    },
    input(e) {
      this.val = (e && e.target && e.target.value) || "";
      if (this.val.length > this.maxLen) {
        this.val = this.val.substr(0, 100);
        document.getElementById("textarea").value = this.val;
        this.$vux.toast.show({
          type: "cancel",
          text: "字符长度不能大于100"
        });
      }
    },
    submit() {
      this.$emit("submitAddress", this.val);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.textarea-box {
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  position: relative;
  padding: 0.5rem;
}
textarea {
  width: 100%;
  max-height: 8.33rem;
  border: 0px;
  box-sizing: border-box;
  resize: none;
}
textarea:focus {
  outline: none;
}
.position-box .tips,
.position-box .hint,
.opts-box .btn,
.opts-box .len {
  font-size: 0.8rem;
  font-family: @fontFamily;
}
.tips {
  color: rgba(136, 136, 136, 1);
  position: absolute;
  top: 0.5rem;
}
.hint {
  color: rgba(187, 187, 187, 1);
  position: absolute;
  top: 2.6rem;
}
.btn,
.len {
  color: rgba(44, 122, 199, 1);

  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
}
</style>
