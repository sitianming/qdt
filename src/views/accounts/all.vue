<template>
  <div class="right-wrap">
    <h3>账户信息</h3>
    <el-select v-model="account" placeholder="请选择账户">
      <el-option
        v-for="item in accounts"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="account-info" v-if="infos">
      <span>交易所：{{exchange}}</span>
      <br/>
      <span>合计 USDT：{{USDT}}</span>
      <span>合计 BTC：{{BTC}}</span>
      <br/>
      <i>更新时间：{{updatedAt}}</i>
    </div>
    <el-table
      v-if="infos"
      :data="infos.list"
      style="width: 100%">
      <el-table-column
        prop="currency"
        label="币种">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额"
        >
      </el-table-column>
      <el-table-column
        prop="toBTC"
        label="等值BTC">
      </el-table-column>
      <el-table-column
        prop="toUSDT"
        label="等值USDT">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const accounts = [
  {
    value: '账户一',
    label: '账户一'
  },
  {
    value: '账户二',
    label: '账户二'
  },
  {
    value: '账户三',
    label: '账户三'
  },
]

const datas = {
  "账户一": {
    list: [
      {
          "currency": "BTC",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
      {
          "currency": "ETH",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
      {
          "currency": "GTD",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
    ],
    "updatedAt": "2019-12-24 00:00:00",
  },
  "账户二": {
    list: [
      {
          "currency": "BTC",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
      {
          "currency": "ASSD",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
    ],
    "updatedAt": "2019-12-24 00:00:00",
  },
  "账户三": {
    list: [
      {
          "currency": "GGG",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
      {
          "currency": "EEE",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
      {
          "currency": "AAA",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
      {
          "currency": "BBB",
          "balance": 10.02,
          "toBTC": 10.02,
          "toUSDT": 70000.14,
      },
    ],
    "updatedAt": "2019-12-24 00:00:00",
  }
}


export default {
  data(){
    return {
      account: null,
      accounts,
      exchange: 'Ace'
    }
  },
  computed:{
    infos(){
      if(this.account in datas){
        return datas[this.account]
      }else{
        return null
      }
    },
    USDT(){
      let all = 0
      if(this.infos !==null){
        this.infos.list.forEach(item=>{
          all += item.toUSDT
        })
        all = all.toFixed(2)
      }
      return all
    },
    BTC(){
      let all = 0
      if(this.infos !==null){
        this.infos.list.forEach(item=>{
          all += item.toBTC
        })
        all = all.toFixed(2)
      }
      return all
    },
    updatedAt(){
      if(this.infos !==null){
        return this.infos.updatedAt
      }else{
        return '-'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-wrap {
    padding: 20px;
  }

  .account-info {
    margin: 20px 0;

    span {
      line-height: 24px;

      &:last-of-type {
        margin-left: 50px;
      }
    }

    i {
      color: #aaa;
      display: inline-block;
      font-style: normal;
      line-height: 24px;
    }
  }
</style>
