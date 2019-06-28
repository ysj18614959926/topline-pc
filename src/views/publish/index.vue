<template>
    <div>
       <el-form ref="publish" :model="publish" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="publish.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input v-model="publish.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
            <el-radio-group  v-model="publish.cover">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label='频道'>
            <artical-channel v-model='publish.channel_id'></artical-channel>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="handelAddArtical(true)">发布</el-button>
            <el-button type='warning' @click='handelAddArtical(false)'>草稿</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import ArticalChannel from '@/components/ArticalChannel'
export default {
  name: 'publish',
  components: {
    ArticalChannel
  },
  data () {
    return {
      publish: {
        title: null,
        content: null,
        cover: {
          type: 0,
          images: []
        },
        channel_id: null,
        imgType: 'none'
      }
    }
  },
  methods: {
    async handelAddArtical (draft) {
      try {
        await this.$http({
          url: '/articles',
          method: 'POST',
          data: this.publish,
          params: {
            draft
          }
        })
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$router.push('/articals')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
