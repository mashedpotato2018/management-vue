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
          <el-button v-waves class="filter-item" type="primary"  @click="clearParent">
            清除
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;" class="box-card">
        <div>
          <el-table
            :data="base"
            border
            style="width: 100%"
            max-height="550"
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
              prop="FaceURL"
              label="头像"
              align="center"
            >
              <template slot-scope="scope">
                <img :src="scope.row.FaceURL" alt="" style="height: 50px;width: auto">
              </template>
            </el-table-column>
            <el-table-column
              prop="RoleMark"
              label="身份"
            >
              <template slot-scope="scope">
                {{ scope.row.RoleMark|mark }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AllianceUserID"
              label="上级代理id"
            />
            <el-table-column
              prop="RefereeUserID"
              label="推荐人"
            />
            <el-table-column
              prop="Children"
              label="下级人数"
            />
          </el-table>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;" class="box-card">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="550"
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
              prop="FaceURL"
              label="头像"
              align="center"
            >
              <template slot-scope="scope">
                <img :src="scope.row.FaceURL" alt="" style="height: 50px;width: auto">
              </template>
            </el-table-column>
            <el-table-column
              prop="RoleMark"
              label="身份"
            >
              <template slot-scope="scope">
                {{ scope.row.RoleMark|mark }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AllianceUserID"
              label="上级代理id"
            />
            <el-table-column
              prop="RefereeUserID"
              label="推荐人"
            />
            <el-table-column
              prop="Children"
              label="下级人数"
            >
              <template slot-scope="scope">
                <a class="primary-link" @click="downhandle(scope.row)">{{ scope.row.Children }} </a>
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
  import { PlayerInfoList } from '@/api/Zzqp/player/'
  import waves from '@/directive/waves' // waves directive
  import { toThousandFilter } from '@/filters'
  import { parseTime,DateFormat } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'alliance-playerInfo',
    components: { Pagination },
    directives: { waves },
    filters: {
      DateFormat,
      mark(type){
        const Role = {
          1: '玩家',
          3: '代理',
          7: '副盟主',
          11: "盟主"
        }
        return Role[type]
      }
    },
    data() {
      return {
        base: [],
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          keyword: '',
          sort: '',
          sortType: 0,
          ParentId: 0,
        },
        listLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        PlayerInfoList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      clearParent(){
        this.listQuery.ParentId = 0
        this.listQuery.keyword = ''
        this.base = []
        this.handleFilter()
      },
      downhandle(row){
        this.listQuery.ParentId = row.AgentID
        this.listQuery.keyword = ''
        this.base = [row]
        this.handleFilter()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>
<style lang="scss" scoped>
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
    color: #409eff;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
  }
</style>
