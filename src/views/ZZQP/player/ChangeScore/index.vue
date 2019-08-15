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
              prop="total"
              label="合计"
            />
            <el-table-column
              prop="LeftSilver"
              label="剩余银珍珠"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.LeftSilver/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="LeftGold"
              label="剩余金珍珠"
            >
              <template slot-scope="scope">
                {{ scope.row.LeftGold/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AllianceDeployAdd"
              label="调配入"
            >
              <template slot-scope="scope">
                {{ scope.row.AllianceDeployAdd/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AllianceDeploySub"
              label="调配出"
            >
              <template slot-scope="scope">
                {{ scope.row.AllianceDeploySub/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="Lend"
              label="借出"
            >
              <template slot-scope="scope">
                {{ scope.row.Lend/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="Rec"
              label="归还"
            >
              <template slot-scope="scope">
                {{ scope.row.Rec/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AgentProfit"
              label="代理收益"
            >
              <template slot-scope="scope">
                {{ scope.row.AgentProfit/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AgentRefereeProfit"
              label="推荐人收益"
            >
              <template slot-scope="scope">
                {{ scope.row.AgentRefereeProfit/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AllianceProfit"
              label="盟主收益"
            >
              <template slot-scope="scope">
                {{ scope.row.AllianceProfit/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="Win"
              label="对局"
            >
              <template slot-scope="scope">
                {{ scope.row.Win/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="SilverPearlTransCardPoint"
              label="换房卡"
            >
              <template slot-scope="scope">
                {{ scope.row.SilverPearlTransCardPoint/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="GM_Score"
              label="后台操作"
            >
              <template slot-scope="scope">
                {{ scope.row.GM_Score/100 | toThousandFilter }}
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
import { ChangeScoreList } from '@/api/Zzqp/player'
import { parseTime } from '@/utils'
import { toThousandFilter } from '@/filters'
import mixins from '../../mixins/RecordQuery'
export default {
  name: 'ComplexTable',
  mixins: [mixins],
  methods: {
    getList() {
      this.listLoading = true
      ChangeScoreList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
