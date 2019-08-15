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
              prop="Score"
              label="总输赢"
            >
              <template slot-scope="scope">
                {{ scope.row.Score/100|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="RegisterTime"
              label="注册时间"
            >
              <template slot-scope="scope">
                {{ scope.row.RegisterTime |DateFormat|parseTime }}
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
                <span v-if="props.row.NickName_0" class="expand">{{ props.row.NickName_0 }}: {{ props.row.GameScore_0/100|toThousandFilter }}</span>
                <span v-if="props.row.NickName_1" class="expand">{{ props.row.NickName_1 }}: {{ props.row.GameScore_1/100|toThousandFilter }}</span>
                <span v-if="props.row.NickName_2" class="expand">{{ props.row.NickName_2 }}: {{ props.row.GameScore_2/100|toThousandFilter }}</span>
                <span v-if="props.row.NickName_3" class="expand">{{ props.row.NickName_3 }}: {{ props.row.GameScore_3/100|toThousandFilter }}</span>
                <span v-if="props.row.NickName_4" class="expand">{{ props.row.NickName_4 }}: {{ props.row.GameScore_4/100|toThousandFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100"
            />
            <el-table-column
              label="编号"
              align="center"
              prop="DrawID"
            />
            <el-table-column
              label="房间名"
              align="center"
              prop="ServerName"
            />
            <el-table-column
              align="center"
              prop="InsretDate"
              label="开始时间"
            >
              <template slot-scope="scope">
                {{ scope.row.InsretDate | DateFormat | parseTime }}
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
import { parseTime } from '@/utils'
import { toThousandFilter } from '@/filters'
import mixins from '../../mixins/RecordQuery'
export default {
  name: 'ComplexTable',
  mixins: [mixins],
  methods: {
    getList() {
      this.listLoading = true
      record(this.listQuery).then(response => {
        this.list = response.data.items
        this.basic = response.data.basic
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped>
  .expand{
    margin: 0 20px;
  }
</style>
