<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.id"
            placeholder="代理商账号"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-input
            v-model="listQuery.NickName"
            placeholder="代理名称"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-date-picker
            v-model="listQuery.bTime"
            type="datetime"
            placeholder="开始时间"
            style="transform: translateY(-4px)"
            @keyup.enter.native="handleFilter"
          />
          <el-date-picker
            v-model="listQuery.eTime"
            type="datetime"
            placeholder="结束时间"
            style="transform: translateY(-4px)"
            @keyup.enter.native="handleFilter"
          />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;" class="box-card">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="580"
          >
            <el-table-column
              fixed
              prop="UserID"
              label="代理商账号"
            >
              <template slot-scope="scope">
                <router-link class="primary-link" :to="{name:'changePassword',params:scope.row}" tag="a">
                  {{ scope.row.UserID }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="RealName"
              label="代理商姓名"
            />
            <el-table-column
              prop="Gender"
              label="性别"
            >
              <template slot-scope="scope">
                {{ scope.row.Gender | sexFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="TelNo"
              label="电话号码"
            />
            <el-table-column
              prop="IDNumber"
              label="身份证号码"
            />
            <el-table-column
              prop="CreateDate"
              label="开户时间"
            >
              <template slot-scope="scope">
                {{ scope.row.CreateDate | DateFormat|parseTime }}
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/KXM/champions'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Champions',
  components: { Pagination },
  directives: { waves },
  filters: {
    sexFilter(str) {
      const sexType = { 0: '女', 1: '男' }
      return sexType[str]
    },
    DateFormat(str) {
      return parseInt(str.substr(6, 13))
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        id: '',
        NickName: '',
        bTime: '',
        eTime: ''
        // bTime: new Date().getTime() - 3600 * 1000 * 24 * 7,
        // eTime: new Date()
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
  .primary-link {
    color: #409eff;
  }
  .primary-link:hover{
    color: #66b1ff;
    text-decoration: underline;
  }
  .primary-link {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    position: relative;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
  }
</style>
