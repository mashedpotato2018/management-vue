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
          <el-switch
            @change ="handleFilter"
            style="margin: 0 10px"
            v-model="listQuery.Online"
            active-text="是否在线"
          >
          </el-switch>
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
            max-height="550"
            @filter-change="handleFilterChange"
            @sort-change="sortChange"
          >
            <el-table-column
              fixed
              prop="UserID"
              label="用户ID"
              width="100"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
              width="200"
            />
            <el-table-column
              prop="HeadImg"
              label="头像"
              align="center"
              width="200"
            >
              <template slot-scope="scope">
                <img :src="scope.row.HeadImg" alt="" style="height: 50px;width: auto">
              </template>
            </el-table-column>
            <el-table-column
              prop="AgentUserID"
              label="上级代理id"
              width="100"
            />
            <el-table-column
              prop="ServerName"
              label="所在房间"
              width="180"
              :filters="[
                { text: '血战', value: 1 },
                { text: '金花', value: 2 },
                { text: '牛牛', value: 3 },
                { text: '大唐麻将2人房', value: 4 },
                { text: '大唐麻将3人房', value: 5 },
                { text: '大唐麻将4人房', value: 6 }
              ]"
            />
            <el-table-column
              prop="Score"
              sortable="custom"
              label="银珍珠"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.Score/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="GoldPearl"
              sortable="custom"
              label="金珍珠"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.GoldPearl/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="CardPoint"
              sortable="custom"
              width="100"
              label="房卡"
            >
              <template slot-scope="scope">
                {{ scope.row.CardPoint/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="InsureScore"
              sortable="InsureScore"
              width="100"
              label="银行"
            >
              <template slot-scope="scope">
                {{ scope.row.InsureScore/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="LastLoginTime"
              label="最后登录时间"
              width="200"
            >
              <template slot-scope="scope">
                {{ scope.row.LastLoginTime |DateFormat| parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="250"
            >
              <template slot-scope="scope">
                <ul class="operation">
                  <li v-if="scope.row.RoleMark===1">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleSetMengZhu(scope.row.UserID)"
                    >
                      设置盟主
                    </el-button>
                  </li>
                  <li v-if="((scope.row.RoleMark===1&&scope.row.Score<100)||scope.row.RoleMark===3)">
                    <el-button
                      size="mini"
                      type="success"
                      @click="handleSetFuMengZhu(scope.row.UserID)"
                    >
                      设置副盟主
                    </el-button>
                  </li>
                  <li v-if="$store.getters.roles[0]==='admin'">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleUpdate(scope.$index, scope.row)"
                    >
                      增送
                    </el-button>
                  </li>
                  <li>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleBanned(scope.$index, scope.row)"
                    >
                      封禁
                    </el-button>
                  </li>
                  <li>
                    <el-button
                      size="mini"
                      type="warning"
                      @click="handleWhite(scope.$index, scope.row)"
                    >
                      白名单
                    </el-button>
                  </li>
                </ul>
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
    <el-dialog
      title="设置"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
      >
        <el-form-item label="银珍珠" prop="Score">
          <el-input v-model="temp.Score" />
        </el-form-item>
        <el-form-item label="房  卡" prop="CardPoint">
          <el-input v-model="temp.CardPoint" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { UserList, update, banned, SetMengZhu, SetFuMengZhu,openWhite } from '@/api/Zzqp/player'
import waves from '@/directive/waves' // waves directive
import { toThousandFilter } from '@/filters'
import { parseTime,DateFormat } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserList',
  components: { Pagination },
  directives: { waves },
  filters: {
    DateFormat
  },
  data() {
    const valiNumber = (rule, value, callback) => {
      setTimeout(() => {
        if (!/^-*[0-9]+$/.test(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '',
        state: true,
        Online: false,
        KindID: [],
        sort: '',
        sortType: 0
      },
      dialogFormVisible: false,
      rules: {
        Score: [
          { required: true, message: '银珍珠为必须项', trigger: 'blur' },
          { validator: valiNumber, trigger: 'blur' }
        ],
        CardPoint: [
          { required: true, message: '房卡为必须项', trigger: 'blur' },
          { validator: valiNumber, trigger: 'blur' }
        ]
      },
      temp: {},
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    sortChange(data) {
      const { prop, order } = data
      this.sortByID(prop, order)
    },
    sortByID(column, order) {
      const type = { ascending: 0, descending: 1 }
      this.listQuery.sort = column
      this.listQuery.sortType = type[order]
      this.handleFilter()
    },
    handleFilterChange(filters) {
      this.listQuery.KindID = filters['el-table_1_column_4'].map(item => item)
      this.handleFilter()
    },
    handleSetFuMengZhu(UserID) {
      this.$prompt('请输入盟主', '设置副盟主', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '数字格式不正确'
      }).then(({ value }) => {
        SetFuMengZhu({ mengZhuID: value, UserID, username:this.$store.getters.username }).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: '成功',
              message: res.Message,
              type: '成功',
              duration: 2000
            })
          }
          this.handleFilter()
        })
      })
    },
    handleSetMengZhu(UserID) {
      SetMengZhu({ UserID }).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: res.Message,
            type: '成功',
            duration: 2000
          })
        }
        this.handleFilter()
      })
    },
    handleBanned(index, row) {
      banned({ UserID: row.UserID, state: 1 }).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: res.Message,
            type: '成功',
            duration: 2000
          })
        }
        this.handleFilter()
      })
    },
    handleWhite(index, row){
      openWhite({ UserID: row.UserID}).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: res.Message,
            type: '成功',
            duration: 2000
          })
          this.$router.push({name:'whitelist'})
        }
      })
    },
    handleUpdate(index, row) {
      this.temp = Object.assign({}, row)
      this.temp.CardPoint = 0
      this.temp.Score = 0

      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          const tempData = Object.assign({}, this.temp)
          tempData.CardPoint = tempData.CardPoint * 100
          tempData.Score = tempData.Score * 100
          update(tempData).then((res) => {
            this.loading = false
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: res.Message,
              type: '成功',
              duration: 2000
            })
            this.handleFilter()
          })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    getList() {
      this.listLoading = true
      UserList(this.listQuery).then(response => {
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
<style lang="scss" scoped>
  >>>.el-dialog{
    width: 400px;
  }
  >>>.el-input[tpye="text"]{
    width: 200px;
  }
  .el-form-item{
    display: flex;
    justify-content: space-between;
  }
  .operation{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      margin: 10px 0;
    }
  }
</style>
