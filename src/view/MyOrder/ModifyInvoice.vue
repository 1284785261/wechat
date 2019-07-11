<template>
  <div class="upload-box">
    <Header :GOtitle="GOtitle"></Header>
    <div class="content-box">
      <div class="invoice-box">
        <div class="download">
          <span class="title">上传随货发票</span>
          <a>下载随货发票模板<x-icon type="ios-arrow-thin-down" size="20" class="down"></x-icon></a>
        </div>
        <div class="invoice-file-box">
          <div class="invoice-upload">
            <div class="invoice-file" v-show="fileList.name">
              <img src="../../assets/upload3.png" @click="delectImg">
            </div>
            <div class="image-container">

              <img src="../../assets/upload1.png" class="upload1" v-if="Object.keys(files).length == 0">
              <figure v-else-if="files.length && (files[0].type =='image/png' || files[0].type =='image/jpeg' || files[0].type =='image/jpg')">
                <img width="100%" :src="files.length ? files[0].url : null" class="fileimg" style="border:1px solid #000;">
              </figure>

              <div v-else class="words">
                <img v-if="files.length" src="../../assets/upload2.png">
                <a v-if="fileList.name">{{fileList.name}}</a>
              </div>
              <File-Upload name="file" input-id="file2" class="btn btn-primary" post-action="http://192.168.50.222:7500/OrderOnline/api/Common/uploadProject/upload?typeId=1" v-model="files" @input-filter="invoiceInputFilter" @input-file="invoiceInputFile" ref="invoiceupload">
              </File-Upload>
              <a class="titles"><span>*</span>支持上传文件(pdf/word/excel 格式)
                照片请保持字体清晰可信息完整</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a class="comiuts" @click="commitFile">提交</a>
  </div>
</template>
<script>
import { Header } from "@/components/Common";
import FileUpload from "vue-upload-component";
import { SetOrderGoodsInvoice } from "@/api/common/order";
import { setTimeout } from "timers";
export default {
  components: {
    Header,
    FileUpload
  },
  data() {
    return {
      GOtitle: "修改随货发票",
      fileList: [],
      files: [],
      goodsInvoiceId: "",
      OrderId: ""
    };
  },
  mounted() {
    this.OrderId = this.$route.query.OrderId;
  },
  methods: {
    //发票上传
    invoiceInputFile(newFile, oldFile) {
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
        if (!this.$refs.invoiceupload.active) {
          this.$refs.invoiceupload.active = true;
        }
      }
      // 上传成功
      if (newFile && newFile.response.code == 200) {
        this.goodsInvoiceId = newFile.response.body;
      }
    },
    //上传发票
    invoiceInputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(jpg|jpeg|png|doc|docx|xls|xlsx|pdf)$/i.test(newFile.name)) {
          this.$vux.toast.show({
            type: "cancel",
            text: "文件格式不正确，请重新上传"
          });
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
      this.fileList = newFile;
    },
    delectImg() {
      this.fileList = [];
      this.files = [];
      this.goodsInvoiceId = "";
    },
    commitFile() {
      if (this.OrderId) {
        let data = {
          orderId: this.OrderId,
          fileId: this.goodsInvoiceId
        };
        // let str = `orderId=${this.OrderId}&fileId=${this.goodsInvoiceId}`;
        SetOrderGoodsInvoice(data).then(res => {
          if (res) {
            this.$vux.toast.show({
              text: "修改随货发票成功"
            });
            setTimeout(() => {
              this.$router.push({
                path: "/OrderDetail",
                query: {
                  orderId: this.OrderId
                }
              });
            }, 2000);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../main.less";
.upload-box {
  height: 100%;
  background: #eee;
}
.content-box {
  overflow: hidden;
  margin-top: 3.14rem;
  .invoice-box {
    background: #fff;
    .download {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        display: inline-block;
        font-size: 1rem;
        margin: 1.07rem 0 0.85rem 0.78rem;
        .warning {
          left: 5.8rem;
          .bg-img("8-1");
          width: 0.86rem;
          background-size: contain;
          height: 0.86rem;
          display: inline-block;
          vertical-align: text-top;
          margin: 0.2rem 0.35rem 0.2rem 0.35rem;
        }
      }
      a {
        font-size: 1rem;
        color: #0979c4;
        margin-right: 1rem;
        .down {
          fill: #0979c4;
          vertical-align: sub;
        }
      }
    }
    .invoice-file-box {
      position: relative;
      min-height: 5rem;
      margin: 0 0.78rem;
      padding-bottom: 2rem;
      .invoice-upload {
        position: relative;
        margin: 0.5rem 1rem;
        .invoice-file {
          margin: 0.5rem;
          width: 4.4rem;
          height: 4.4rem; // background: #666;
          position: absolute;
          left: -8px;
          top: -8px; // opacity: 0.6;
          // filter: alpha(opacity=60);
          z-index: 100;
          img {
            position: absolute;
            left: 61px;
            top: 0px;
            width: 58px;
            height: 54px;
          }
        }
        .image-container {
          position: relative;
          .file-uploads {
            width: 7.4rem;
            height: 7.4rem;
            input {
              width: 100px;
              height: 100px;
            }
          }
          .upload1 {
            position: absolute;
            left: 0;
            top: 0;
            width: 7.4rem;
            height: 7.4rem;
          }
          .fileimg {
            position: absolute;
            left: 0;
            top: 0;
            width: 7.4rem;
            height: 7.4rem;
            text-align: center;
          }
          .words {
            position: absolute;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 7.4rem;
              height: 7.4rem;
            }
            a {
              position: absolute;
              bottom: -9rem;
              left: -0.3rem;
              font-size: 0.8rem;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: left;
              margin-left: 1.5rem;
            }
          }
          .titles {
            position: absolute;
            left: 9rem;
            bottom: 4rem;
            display: inline-block;
            min-width: 9rem;
            span {
              color: #ff0000;
            }
          }
        }
      }
      input {
        opacity: 0;
        width: 4.4rem;
        height: 4.4rem;
        filter: alpha(opacity=0);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 60;
      }
    }
  }
}
</style>
