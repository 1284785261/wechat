<template>
  <div class="example-papers">
    <div class="papers-upload">
      <label :class="_opts.class">
        <div class="image-container">
          <img src="../../assets/upload.png" class="upload1" v-if="fileList.length <=0">
          <img src="../../assets/upload jia.png" class="upload2" v-if="fileList.length >0">
          <FileUpload extensions="jpg,jpeg,png" accept="image/png,image/jpeg" name="papers" class="btn btn-primary" post-action="/upload/post" :drop="!edit" v-model="files" @input-filter="inputFilter" @input-file="inputFile" ref="upload">
          </FileUpload>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import FileUpload from "vue-upload-component";
export default {
  name: "onloadFilter",
  components: {
    FileUpload
  },
  props: {
    opts: Object
  },
  computed: {
    _opts() {
      return Object.assign(
        {
          text: "",
          class: ""
        },
        this.opts
      );
    }
  },
  data() {
    return {
      files: [],
      edit: false,
      cropper: false,
      fileList: []
    };
  },
  methods: {
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function() {
          this.edit = true;
        });
      }
      if (!newFile && oldFile) {
        this.edit = false;
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(jpg|jpeg|png)$/i.test(newFile.name)) {
          this.alert("Your choice is not a picture");
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
      this.fileList.push({ newFile });
      console.log(this.fileList);
      this.$emit("filesLists", this.fileList);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.example-papers {
  .papers-upload {
    .image-container {
      position: relative;
      .upload1 {
        position: absolute;
        left: 0;
        top: 0;
      }
      .upload2 {
        width: 4.4rem;
        height: 4.4rem;
      }
      .image {
        display: none;
      }
    }
  }
}
</style>