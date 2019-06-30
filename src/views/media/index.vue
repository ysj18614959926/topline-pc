<template>
    <div>
        <el-form ref='mediaList' :model='mediaList'>
            <el-form-item label='素材管理'></el-form-item>
            <el-form-item>
                <el-col :span='22'>
                    <el-radio-group v-model="radio">
                            <el-radio-button label="全部" @click.native='loadMedia(false)'></el-radio-button>
                            <el-radio-button label="收藏" @click.native='loadMedia(true)'></el-radio-button>
                     </el-radio-group>
                </el-col>
                <el-col :span='2'>
                    <el-upload
                       class="upload-demo"
                       action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                       :headers='{Authorization:`Bearer ${$store.state.user.token}`}'
                       name='image'
                       :on-success='() => {
                           this.loadMedia()
                           this.$message({
                             type:"success",
                             message: "上传图片成功"
                           })
                       }'
                    >
                       <el-button size="small" type="primary">点击上传</el-button>
                   </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="20"> <!--gutter就是不包含在：span里面的偏移-->
                    <el-col :span="4" v-for="item in mediaList" :key="item.id" >
                        <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.url" class="image">
                        <div class="Mbutton">
                            <el-button type="primary" plain :icon="item.is_collected?'el-icon-star-on':'el-icon-star-off'" circle @click='isCollect(item)'></el-button>
                            <el-button type="primary" plain icon="el-icon-delete" circle @click='handelDeleteMedia(item)'></el-button>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      mediaList: {},
      radio: '全部'
    }
  },
  created () {
    this.loadMedia()
  },
  methods: {
    async loadMedia (collect = false) {
      try {
        const res = await this.$http({
          url: '/user/images',
          method: 'get',
          params: {
            collect
          }
        })
        this.mediaList = res.results
      } catch (err) {
        this.$message.error = '获取素材失败'
      }
    },
    async isCollect (item) {
      try {
        await this.$http({
          url: '/user/images/' + item.id,
          method: 'put',
          data: {
            collect: !item.is_collected
          }
        })
        this.$message({
          type: 'success',
          message: (!item.is_collected ? '' : '取消') + '收藏成功'
        })
        const state = this.radio === '全部' ? 'false' : 'true'
        this.loadMedia(state)
      } catch (err) {
        this.$message.error = '操作失败'
      }
    },
    async handelDeleteMedia (item) {
      try {
        await this.$http({
          url: '/user/images/' + item.id,
          method: 'delete'
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      } catch (err) {
        this.$message.error = '删除图片失败'
      }
    }
  }
}
</script>
<style lang="less">
.el-col{
  margin-bottom: 10px;
  img {
    max-width: 100%;
    height: 200px;
  }
  .Mbutton {
    display: flex;
    justify-content: space-around
  }
}
</style>
