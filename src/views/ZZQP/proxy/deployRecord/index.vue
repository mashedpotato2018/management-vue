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
              align="center"
              prop="add"
              label="总增加"
            >
              <template slot-scope="scope">
                {{ scope.row.add/100|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="reduce"
              label="总减少"
            >
              <template slot-scope="scope">
                {{ scope.row.reduce/100|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="RegisterTime"
              label="注册时间"
            >
              <template slot-scope="scope">
                {{ scope.row.RegisterTime|DateFormat|parseTime }}
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="410"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100"
            />
            <el-table-column
              align="center"
              prop="startTime"
              label="开始时间"
            >
              <template slot-scope="scope">
                {{ scope.row.Time|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="Money"
              label="珍珠数"
            >
              <template slot-scope="scope">
                {{ scope.row.Money/100|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="DeployID"
              label="调配人id"
              align="center"
            />
            <el-table-column
              prop="DeployNickName"
              label="调配人昵称"
              align="center"
            />
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
import { deploy } from '@/api/Zzqp/proxy'
import { parseTime } from '@/utils'
import { toThousandFilter } from '@/filters'
import mixins from '../../mixins/RecordQuery'
export default {
  name: 'ComplexTable',
  mixins: [mixins],
  methods: {
    getList() {
      this.listLoading = true
      deploy(this.listQuery).then(response => {
        this.list = response.data.items
        this.basic = response.data.basic
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
