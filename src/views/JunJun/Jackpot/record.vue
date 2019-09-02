<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.keyword"
            placeholder="用户id"
            style="width: 200px;"
            @keyup.enter.native="handleFilter"
          />
          <el-date-picker
            v-model="listQuery.bTime"
            align="right"
            type="date"
            style="margin-bottom: 10px"
            placeholder="开始时间"
            :picker-options="pickerOptions"
          />
          <el-date-picker
            v-model="listQuery.eTime"
            align="right"
            style="margin-bottom: 10px"
            type="date"
            placeholder="结束时间"
            :picker-options="pickerOptions"
          />
          <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;" class="box-card">
        <div>
          <el-table
            :data="listStatic"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="jianhuaB"
              label="金花初级场"
            >
              <template slot-scope="scope">
                {{ scope.row.jianhuaB/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="jianhuaM"
              label="金花中级场"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.jianhuaM/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="jianhuaT"
              label="金花高级场"
            >
              <template slot-scope="scope">
                {{ scope.row.jianhuaT/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="niuniuB"
              label="牛牛初级场"
            >
              <template slot-scope="scope">
                {{ scope.row.niuniuB/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="niuniuM"
              label="牛牛中级场"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.niuniuM/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="niuniuT"
              label="牛牛高级场"
            >
              <template slot-scope="scope">
                {{ scope.row.niuniuT/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="JackpotCount"
              label="合计"
            >
              <template slot-scope="scope">
                {{ scope.row.JackpotCount/100 | toThousandFilter }}
              </template>
            </el-table-column>
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
              prop="ChangeScore"
              label="变化数量"
            >
              <template slot-scope="scope">
                {{ scope.row.ChangeScore/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="CardArr"
              label="手牌数据"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.CardArr }}
              </template>
            </el-table-column>
            <el-table-column
              prop="CardTypeName"
              label="牌型类型"
            >
              <template slot-scope="scope">
                {{ scope.row.CardTypeName }}
              </template>
            </el-table-column>
            <el-table-column
              prop="ServerName"
              label="服务器名称"
            >
              <template slot-scope="scope">
                {{ scope.row.ServerName }}
              </template>
            </el-table-column>
            <el-table-column
              prop="NickName"
              label="姓名"
            >
              <template slot-scope="scope">
                {{ scope.row.NickName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="ChangeType"
              label="变化类型"
            >
              <template slot-scope="scope">
                {{ scope.row.ChangeType | Type }}
              </template>
            </el-table-column>
            <el-table-column
              prop="SysTaxCount"
              label="系统抽成数量"
            >
              <template slot-scope="scope">
                {{ scope.row.SysTaxCount/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="SysTax"
              label="系统抽成比例"
            >
              <template slot-scope="scope">
                {{ scope.row.SysTax }}%
              </template>
            </el-table-column>
            <el-table-column
              prop="InTime"
              label="插入时间"
            >
              <template slot-scope="scope">
                {{ scope.row.InTime | DateFormat| parseTime }}
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
  import { JackpotRecord } from '@/api/Zzqp/notice/'
  import { parseTime } from '@/utils'
  import { toThousandFilter } from '@/filters'
  import mixins from '@/views/ZZQP/mixins/RecordQuery/'
  export default {
    name: 'JackpotRecord',
    mixins: [mixins],
    filters:{
      Type(value){
        if(value)
          return '获奖'
        else
          return '抽成'
      }
    },
    created(){
      this.getList()
    },
    data(){
      return {
        listStatic: []
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        JackpotRecord(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listStatic = [response.data.Jackpot]
          this.listLoading = false
        })
      }
    }
  }
</script>
