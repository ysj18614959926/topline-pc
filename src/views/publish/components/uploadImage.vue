<template>
    <div>
        <div class="showImage" @click='dialogVisible = true'>
            <i class="el-icon-upload2" v-if='!value'></i>
            <img :src="value" alt="" v-else>
        </div>
        <el-dialog
            title="素材库"
            :visible.sync="dialogVisible"
            width="30%">
                <el-tabs value='first'>
                        <el-tab-pane label="上传图片" name="first">
                                <el-upload
                                class="avatar-uploader"
                                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                                name='image'
                                :headers='{Authorization:`Bearer ${$store.state.user.token}`}'
                                :on-success='successUpload'
                                >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              </el-upload>
                        </el-tab-pane>
                        <el-tab-pane label="图片库" name="second">配置管理</el-tab-pane>
                </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      imageUrl: null
    }
  },
  methods: {
    successUpload (res) {
      this.imageUrl = res.data.url
    },
    submit () {
      this.$emit('input', this.imageUrl)
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
    .showImage{
        width: 200px;
        height: 200px;
        text-align: center;
        border: 1px dashed #ccc;
        line-height: 200px;
        margin-right: 20px;
        i {
           font-size:50px;
           color: #ccc
        }
        img {
          width: 100%;
          height: 100%;
        }
    }
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
