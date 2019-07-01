<template>
    <div>
      <el-col :span='20'>
        <el-form ref="publish" :model="publish" label-width="80px">
         <el-form-item label="标题">
             <el-input v-model="publish.title"></el-input>
         </el-form-item>
         <el-form-item label="内容">
             <quill-editor v-model="publish.content"
               ref="myQuillEditor"
               :options="editorOption"
               >
            </quill-editor>
         </el-form-item>
         <el-form-item label="封面">
             <el-radio-group  v-model="publish.cover.type">
                 <el-radio :label="1">单图</el-radio>
                 <el-radio :label="3">三图</el-radio>
                 <el-radio :label="0">无图</el-radio>
                 <el-radio :label="-1">自动</el-radio>
             </el-radio-group>
            </el-form-item>
            <el-form-item>
                 <template v-if='publish.cover.type > 0'>
                    <el-col :span='6' v-for='item in publish.cover.type' :key='item'>
                      <uploadImage v-model='publish.cover.images[item-1]'></uploadImage>
                    </el-col>
                 </template>
         </el-form-item>
         <el-form-item label='频道'>
             <artical-channel v-model='publish.channel_id'></artical-channel>
         </el-form-item>
         <el-form-item>
             <el-button type="success" @click="handelAddArtical(false)">发布</el-button>
             <el-button type='warning' @click='handelAddArtical(true)'>草稿</el-button>
         </el-form-item>
         </el-form>
      </el-col>
    </div>
</template>
<script>
import uploadImage from './components/uploadImage'
import ArticalChannel from '@/components/ArticalChannel'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'publish',
  components: {
    ArticalChannel,
    quillEditor,
    uploadImage
  },
  data () {
    return {
      publish: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        imgType: 'none'
      },
      editorOption: {} // 自定义选项
    }
  },
  created () {
    if (this.$route.name === 'editArtital') {
      this.handelGetArtical(this.$route.params.id)
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      if (to.name === 'publish') {
        this.publish = {
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
    }
  },
  methods: {
    async handelGetArtical (id) {
      try {
        const res = await this.$http({
          url: '/articles/' + id,
          method: 'GET'
        })
        this.publish = res
      } catch (err) {
        this.$message.error = '获取文章失败'
      }
    },
    async handelAddArtical (draft) {
      if (this.$route.name === 'editArtital') {
        try {
          await this.$http({
            url: '/articles/' + this.$route.params.id,
            data: this.publish,
            method: 'PUT',
            params: {
              draft
            }
          })
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
        } catch (err) {
          this.$message.error = '编辑失败'
        }
      } else {
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
}
</script>
<style>
</style>
