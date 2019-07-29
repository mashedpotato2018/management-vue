<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.keyword"
            placeholder="用户id/昵称"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
        </div>
      </el-card>
      <el-card v-show="isShow" class="box-card" style="margin-top: 20px;">
        <div>
          <el-table
            :data="basic"
            border
            style="width: 100%;margin-bottom: 20px;"
            max-height="580"
          >
            <el-table-column
              fixed
              prop="UserID"
              label="用户ID"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
            />
            <el-table-column
              prop="HeadImg"
              label="头像"
            >
              <template slot-scope="scope">
                <img :src="scope.row.HeadImg" alt="" style="height: 50px;width: auto">
              </template>
            </el-table-column>
            <el-table-column
              prop="RegisterTime"
              label="注册时间"
            >
              <template slot-scope="scope">
                {{scope.row.RegisterTime |DateFormat|parseTime}}
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="410"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <span class="expand" v-if="props.row.NickName_0">{{ props.row.NickName_0 }}: {{props.row.GameScore_0/100|toThousandFilter}}</span>
                <span class="expand" v-if="props.row.NickName_1">{{ props.row.NickName_1 }}: {{props.row.GameScore_1/100|toThousandFilter}}</span>
                <span class="expand" v-if="props.row.NickName_2">{{ props.row.NickName_2 }}: {{props.row.GameScore_2/100|toThousandFilter}}</span>
                <span class="expand" v-if="props.row.NickName_3">{{ props.row.NickName_3 }}: {{props.row.GameScore_3/100|toThousandFilter}}</span>
                <span class="expand" v-if="props.row.NickName_4">{{ props.row.NickName_4 }}: {{props.row.GameScore_4/100|toThousandFilter}}</span>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              label="编号"
              align="center"
              prop="DrawID">
            </el-table-column>
            <el-table-column
              label="房间名"
              align="center"
              prop="ServerName">
            </el-table-column>
            <el-table-column
              align="center"
              prop="InsretDate"
              label="开始时间"
            >
              <template slot-scope="scope">
                {{scope.row.InsretDate | DateFormat | parseTime}}
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
  import { record } from '@/api/Zzqp/player'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { toThousandFilter } from '@/filters'

  export default {
    name: 'ComplexTable',
    components: { Pagination },
    directives: { waves },
    filters: {
      DateFormat(str) {
        return parseInt(str.substr(6, 13))
      }
    },
    data() {
      return {
        list: [],
        basic:[],
        isShow:false,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          keyword:''
        },
        downloadLoading: false
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        record(this.listQuery).then(response => {
          this.list = response.data.items
          this.basic = response.data.basic
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
    },
    watch:{
      basic(newVal){
        this.isShow = newVal.length>0
      }
    }
  }
</script>
<style scoped>
  .expand{
    margin: 0 20px;
  }
</style>
