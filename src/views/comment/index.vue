<template>
    <div>
        <el-table :data='commentList'>
            <el-table-column label='标题' prop='title'>
            </el-table-column>
            <el-table-column label='总评论数' prop='total-comment_count'>
            </el-table-column>
            <el-table-column label='粉丝评论数' prop='fans_comment_count'>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope='scope'>
                    <el-switch
                    v-model="scope.row.comment_status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change='handelChangeState(scope.row)'
                    :disabled='scope.row.disabled'>
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      commentList: []
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      try {
        const res = await this.$http({
          url: '/articles',
          method: 'get',
          params: {
            response_type: 'comment'
          }
        })
        res.results.forEach(item => {
          item.disabled = false
        })
        this.commentList = res.results
      } catch (err) {
        this.$message.error = '加载评论列表失败'
      }
    },
    async handelChangeState (item) {
      console.log(item)
      item.disabled = true
      try {
        await this.$http({
          url: '/comments/status/' + item.id,
          method: 'put',
          data: {
            allow_comment: !item.comment_status
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        item.disabled = false
      } catch (err) {
        this.$message.error = '更改状态失败'
        item.disabled = false
      }
    }
  }
}
</script>
