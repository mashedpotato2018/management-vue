<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.keyword"
            placeholder="用户id"
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
              prop="Total"
              label="房卡总充值"
            >
              <template slot-scope="scope">
                {{ scope.row.Total/100|toThousandFilter }}
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
              prop="Date"
              label="时间"
            >
              <template slot-scope="scope">
                {{ scope.row.Date|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="CardNum"
              label="房卡"
            >
              <template slot-scope="scope">
                {{ scope.row.value/100|toThousandFilter }}
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
import { CardNumRecord } from '@/api/Zzqp/proxy'
import { parseTime } from '@/utils'
import { toThousandFilter } from '@/filters'
import mixins from '../../mixins/RecordQuery'
export default {
  name: 'ComplexTable',
  mixins: [mixins],
  methods: {
    getList() {
      this.listLoading = true
      CardNumRecord(this.listQuery).then(response => {
        this.list = response.data.items
        this.basic = response.data.basic
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
