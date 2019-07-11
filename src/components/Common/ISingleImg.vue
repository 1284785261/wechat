<template>
  <div class="example-papers">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div class="papers-upload">
      <label :class="_opts.class">
        <div class="image-container">
          <img :src="files.length ? files[0].url : null" class="image">
          <div class="upbtn" v-show="files.length ? false : true">
          </div>
          <FileUpload accept="image/png,image/jpeg" name="file" class="btn btn-primary" post-action="http://192.168.50.222:7500/OrderOnline/api/Common/uploadProject/upload?typeId=1" :drop="!edit" v-model="files" @input-filter="inputFilter" @input-file="inputFile" ref="upload">
          </FileUpload>
        </div>
      </label>
      <span>{{_opts.text}}</span>
    </div>
  </div>
</template>

<script>
import FileUpload from "vue-upload-component";
import ImageCompressor from "image-compressor.js";
export default {
  name: "ISingleImg",
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
      cropper: false
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
      // 自动上传
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
      this.$emit("upload", newFile);
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(jpg|jpeg|png)$/i.test(newFile.name)) {
          this.alert("Your choice is not a picture");
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        if (newFile.file && newFile.type.substr(0, 6) === "image/") {
          // && this.autoCompress > 0 && this.autoCompress < newFile.size（小于一定尺寸就不压缩）
          newFile.error = "compressing";
          // 压缩图片
          const imageCompressor = new ImageCompressor(null, {
            quality: 0.5,
            convertSize: Infinity,
            maxWidth: 1000
          });

          imageCompressor
            .compress(newFile.file)
            .then(file => {
              // 创建 blob 字段 用于图片预览
              newFile.blob = "";
              let URL = window.URL || window.webkitURL;
              if (URL && URL.createObjectURL) {
                newFile.blob = URL.createObjectURL(file);
              }
              // 缩略图
              newFile.thumb = "";
              if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
                newFile.thumb = newFile.blob;
              }
              // 更新 file
              this.$refs.upload.update(newFile, {
                error: "",
                file,
                size: file.size,
                type: file.type
              });
            })
            .catch(err => {
              this.$refs.upload.update(newFile, {
                error: err.message || "compress"
              });
            });
        }
      }
      newFile.url = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.url = URL.createObjectURL(newFile.file);
      }
    }
  },
  // compress(imgFile) {
  //   let _this = this;
  //   return new Promise((resolve, reject) => {
  //     let reader = new FileReader();
  //     reader.onload = e => {
  //       let img = new Image();
  //       img.src = e.target.result;
  //       img.onload = () => {
  //         let canvas = document.createElement("canvas");
  //         let ctx = canvas.getContext("2d");
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         // 铺底色
  //         ctx.fillStyle = "#fff";
  //         ctx.fillRect(0, 0, canvas.width, canvas.height);
  //         ctx.drawImage(img, 0, 0, img.width, img.height);

  //         // 进行压缩
  //         let ndata = canvas.toDataURL("image/jpeg", 0.3);
  //         resolve(_this.dataURLtoFile(ndata, imgFile.name));
  //       };
  //     };
  //     reader.onerror = e => reject(e);
  //     reader.readAsDataURL(imgFile);
  //     console.log(reader);
  //   });
  // },
  // base64 转 Blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  // base64 转 File
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
};
</script>

<style scoped lang="less">
@import "../../main.less";
.image-container {
  width: 148px;
  height: 98px;
  overflow: hidden;
  display: block;
  position: relative;
  border: 1px dashed #666;
}
.image-container .image {
  margin: -1px;
  width: 150px;
  height: 100px;
  .bg-img("icon-papers");
}
.IDPapers .image-container .image {
  .bg-img("icon-papers1");
}
.CompanyPapers .image-container {
  width: 153px;
  height: 190px;
  overflow: hidden;
  display: block;
  position: relative;
  border: 1px dashed #666;
}
.CompanyPapers .image-container .image {
  margin: -1px;
  width: 156px;
  height: 196px;
}
.CompanyPapers .image-container .image {
  .bg-img("icon-papers1");
}

label.CompanyPapers {
  height: 196px;
}

label {
  display: block;
  width: 150px;
  height: 100px;
}
label + span {
  width: 150px;
  font-size: 12px;
  font-family: @fontFamily;
  font-weight: 400;
  line-height: 12px;
  color: rgba(58, 58, 58, 1);
  display: block;
  margin: 5px 0;
  text-align: center;
}
.uploadBox .inputDiv + div {
  margin: 0 auto;
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ededed;
}
.upbtn {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -19px;
  margin-left: -19px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(42, 174, 255, 1) 0%,
    rgba(0, 91, 231, 1) 100%
  );
  box-shadow: 0px 2px 2px rgba(73, 146, 220, 0.35);
}

/deep/ #file {
  width: 156px;
  height: 110px;
  z-index: 500;
  position: fixed;
  left: 131px;
  top: 106px;
}
.IDPapers {
  /deep/ .image-container {
    .btn {
      #file {
        width: 156px;
        height: 110px;
        top: 246px;
      }
    }
  }
}
.CompanyPapers {
  /deep/ .image-container {
    .btn {
      #file {
        width: 156px;
        height: 196px;
        top: 106px;
      }
    }
  }
}
</style>
