<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.id"
            placeholder="id"
            style="width: 200px;margin-top: 7px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-date-picker
            v-model="listQuery.bTime"
            align="right"
            type="date"
            placeholder="开始时间"
            :picker-options="pickerOptions"
          />
          <el-date-picker
            v-model="listQuery.eTime"
            align="right"
            type="date"
            placeholder="结束时间"
            :picker-options="pickerOptions"
          />
          <el-button
            v-waves
            style="margin-top: 7px;"
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
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
              prop="id"
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
              prop="Money"
              label="剩余金币"
            >
              <template slot-scope="scope">
                {{scope.row.Money|toThousandFilter}}
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="580"
          >
            <el-table-column
              prop="startTime"
              label="开始时间"
            >
              <template slot-scope="scope">
                {{scope.row.startTime|DateFormat|parseTime}}
              </template>
            </el-table-column>
            <el-table-column
              prop="TotalWinLose"
              label="输赢金币"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.TotalWinLose<0" style="color: red;">
                  {{scope.row.TotalWinLose/100|toThousandFilter}}
                </span>
                <span v-else style="color: green;">
                  {{scope.row.TotalWinLose/100|toThousandFilter}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="GameName"
              label="所在游戏"
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
  import { combatQuery } from '@/api/KXM/player'
  import { toThousandFilter } from '@/filters'
  import query from '../mixins/query'
  export default {
    name: 'change',
    mixins: [query],
    methods:{
      getList() {
        this.listLoading = true
        combatQuery(this.listQuery).then(response => {
          this.list = response.data.items
          this.basic = response.data.basic
          this.total = response.data.total
          this.listLoading = false
        })
      }
    }
  }
</script>
