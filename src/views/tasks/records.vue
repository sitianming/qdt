<template>
  <div class="right-wrap">
    <h3>交易记录</h3>
    <ul>
      <li>
        <b>任务名称：</b><span>{{row.taskName}}</span>
      </li>
      <li>
        <b>交易所：</b><span>{{row.exchangeName}}</span>
      </li>
    </ul>
    <el-table
      :data="data.list"
      style="width: 100%">
      <el-table-column prop="pairName" label="交易对"></el-table-column>
      <el-table-column prop="amount" label="挂单量"></el-table-column>
      <el-table-column prop="price" label="挂单价格"></el-table-column>
      <el-table-column prop="dealAmount" label="成交量"></el-table-column>
      <el-table-column prop="averagePrice" label="成交价格"></el-table-column>
      <el-table-column prop="state" label="订单状态"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="data.total">
    </el-pagination>
  </div>
</template>

<script>

const data = {
  "total": 10000,        // 总共条数
  "pageIndex": 1,
  "pageCount": 10,
  "list": [
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
      {
          "pairName": "ACEX/USDT",
          "amount": 10,
          "price": 1000,
          "dealAmount": 9,
          "averagePrice": 1001,
          "startedAt": "2019-12-23 00:00:00",
          "endedAt": "2019-12-23 00:00:01",
          "state": 5,   // 0: 未知, 1: 挂单中, 2: 结束, 已撤离, 3: 成交或部分成交, 待结算, 4: 异常, 待处理, 5: 结束, 已清算
      },
  ],
}

export default {
  data(){
    return {
      row: {...this.$route.query},
      pageCount: 10,
      pageIndex: 1,
      data
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-wrap {
    padding: 20px;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      margin-top: 20px;
      margin-bottom: 20px;


      li {
        display: inline-block;
        margin-right: 30px;
      }
    }
  }
</style>
