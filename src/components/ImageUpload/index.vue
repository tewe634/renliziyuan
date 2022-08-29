<template>
  <div>
    <el-upload
      v-loading="loading"
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :on-change="change"
      :http-request="onRequest"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="limit"
      :before-upload="onuPload"
      :class="`${fileList.length === 1 ? 'hideAdd' : ''}`"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
    >
      <img style="width: 100%" :src="imgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDmNjodBSSCemiNlsiGZbMq3ze28zZrsc5',
  SecretKey: 'D9oCJ9hz0kDPKyKQHsDI8i26vUnpc9RT'
})
console.log(cos)
export default {
  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    }
    // beforeUploads: Function
  },
  data() {
    return {
      fileList: [],
      previewImgDialogVisible: false,
      imgUrl: '',
      loading: false
    }
  },
  methods: {
    change(file, fileList) {
      this.fileList = fileList
    },
    // 自定义上传
    onRequest(data) {
      this.loading = true
      cos.putObject({
        Bucket: 'wyb-harss-32-1313544686', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData))
          // 这个就是上传的百分比
          // params.percent 表示当前上传的进度
        }
      }, (err, data) => {
        this.loading = false
        if (err || data.statusCode !== 200) {
          return this.$message.error('亲,上传失败,请重试')
        }
        this.$emit('onsuccess', {
          url: 'https://' + data.Location
        })
      })
    },
    // 删除
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 预览
    onPreview(file) {
      this.previewImgDialogVisible = true
      this.imgUrl = file.url
    },
    // 上传之前校验
    onuPload(file) {
      // if (this.beforeUploads && !this.beforeUploads(file)) {
      //   return false
      // }
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error(`请输入已下${types.join(',')}格式`)
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    }
  }
}
</script>

<style  lang="scss">
.hideAdd  .el-upload--picture-card {
  display: none;
}
</style>
