<template>
  <div>
      <el-form ref="filter" :model="filter" label-width="80px">
          <el-form-item label="文章状态">
              <el-radio-group v-model="filter.status">
                <el-radio label="">全部</el-radio>
                <el-radio v-for='(item,index) in msgStatus' :label="index" :key='item.label'>{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表">
                <el-select v-model="filter.channel_id" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
          <el-form-item label="活动时间">
              <el-date-picker
              v-model="activeTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change='handelChangeDate'
              value-format='yyyy-MM-dd'
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handelFilter">筛选</el-button>
          </el-form-item>
        </el-form>
    <!-- 分页 -->
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total" @current-change='handelChangePage'
    :disabled='loading'
    >
    </el-pagination>
    <!-- 文章列表 -->
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
      loading: false,
      filter: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      activeTime: null
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
    },
    handelFilter () {

    },
    handelChangeDate (e) {
      this.filter.begin_pubdate = e[0]
      this.filter.end_pubdate = e[1]
      console.log(e[0], e[1])
    }
  }
}

</script>
