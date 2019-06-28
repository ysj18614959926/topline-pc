<template>
  <div>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total" @current-change='handelChangePage'
    :disabled='loading'
    >
    </el-pagination>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label='图片'>
          <template slot-scope='scope'>
            <img :src="scope.row.cover.images[0]" alt="err" width="50">
          </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column label='状态'>
          <template slot-scope='scope'>
             <el-tag :type='msgStatus[scope.row.status].type'>{{msgStatus[scope.row.status].label}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="日期" width="180">
      </el-table-column>
      <el-table-column label="操作">
         <template slot-scope='scope'>
             <el-button type='danger' size='mini' @click='handelDeleteArticals(scope.row.id)'>删除</el-button>
             <el-button type='warning' size='mini'>修改</el-button>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      msgStatus: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        }
      ],
      total: 0,
      page: 1,
      loading: false
    }
  },
  created () {
    this.handelGetArtical()
  },
  methods: {
    async handelGetArtical () {
      this.loading = true
      try {
        const res = await this.$http({
          url: '/articles',
          method: 'GET',
          params: {
            page: this.page
          }
        })
        this.tableData = res.results
        this.total = res.total_count
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    handelChangePage (e) {
      this.page = e
      this.handelGetArtical()
    },
    async handelDeleteArticals (id) {
      if (confirm('确定删除？')) {
        try {
          await this.$http({
            url: '/articles/' + id,
            method: 'DELETE'
          })
        } catch (err) {
          console.log(err)
        }
      }
      this.handelGetArtical()
    }
  }
}

</script>
