<template>
  <div class="right-wrap">
    <h3>任务列表</h3>
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%"
      @row-click="clickRow"  
    >
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="exchangeName" label="交易所"></el-table-column>
      <el-table-column prop="pairName" label="交易对"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <!-- <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
// const list = [
//         {
//             "taskId": 1,
//             "taskName": "ae_pro_2_au",      // 任务名称
//             "exchangeName": "Ace",          // 交易所名称
//             "pairName": "ACEX/USDT",        // 交易对名称 
//             "state": "Running",             // 运行状态(Wating, Running, Stopped)
//         },
//         {
//             "taskId": 2,
//             "taskName": "ae_pro_2_au2", 
//             "exchangeName": "Bce", 
//             "pairName": "ACEX/USDT", 
//             "state": "Wating",
//         },
//         {
//             "taskId": 3,
//             "taskName": "ae_pro_2_au3", 
//             "exchangeName": "Cce", 
//             "pairName": "ACEX/USDT", 
//             "state": "Stopped",
//         },
//       ]
import {getList} from '@/api/tasks'
    
export default {
  data(){
    return {
      list:[],
      loading: true
    }
  },
  created(){
    this.getList()
  },
  methods:{
    clickRow(row){
      this.$router.push({ path: `/tasks/list/${row.taskId}`, query:{...row}})
    },
    getList(){
      getList().then(data=>{
        this.list = data.list
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-wrap {
    padding: 20px;

    & >>> .el-table__row {
      cursor: pointer;
    }
  }
</style>
