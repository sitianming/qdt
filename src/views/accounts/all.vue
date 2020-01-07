<template>
  <div class="right-wrap">
    <h3>账户信息</h3>
    <el-select v-model="accountId" placeholder="请选择账户" @change="handleChange">
      <el-option
        v-for="item in accounts"
        :key="item.accountId"
        :label="item.accountName"
        :value="item.accountId">
      </el-option>
    </el-select>
    <i class="el-icon-loading" v-if="loading"></i>
    <div class="account-info" v-if="infos">
      <el-button @click="exportAccount" v-if="device=='desktop'">导出仓位</el-button>
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
        :formatter="formatMoney"
        prop="balance"
        label="余额"
        >
      </el-table-column>
      <el-table-column
        :formatter="formatBTC"
        prop="toBTC"
        label="等值BTC">
      </el-table-column>
      <el-table-column
        :formatter="formatMoney"
        min-width="90"
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

import {getAccountInfo,exportAccount} from '@/api/accounts'
import {mapGetters} from 'vuex'
import accounting from '@/lib/accounting.min.js'
import moment from 'moment'

export default {
  data(){
    return {
      loading: false,
      accountId: null,
      // accounts,
      infos: null,
      exchange: 'Ace'
    }
  },
  created(){

  },
  computed:{
    ...mapGetters([
      "accounts",
      "device"
    ]),
    // infos(){
    //   if(this.account in datas){
    //     return datas[this.account]
    //   }else{
    //     return null
    //   }
    // },
    USDT(){
      let all = 0
      if(this.infos !==null){
        this.infos.list.forEach(item=>{
          all += item.toUSDT
        })
        all = accounting.formatNumber(all,2)
      }
      return all
    },
    BTC(){
      let all = 0
      if(this.infos !==null){
        this.infos.list.forEach(item=>{
          all += item.toBTC
        })
        all = accounting.formatNumber(all,4)  //all.toFixed(4) 
      }
      return all
    },
    updatedAt(){
      if(this.infos !==null){
        return moment(this.infos.updatedAt).format("YYYY-MM-DD HH:mm:ss")
      }else{
        return '-'
      }
    }
  },
  methods:{
    handleChange(){
      this.getAccountInfo()
    },
    getAccountInfo(){
      this.loading = true
      getAccountInfo({
        accountId:this.accountId
      }).then(data=>{
        this.infos = data
        this.loading = false
      })
    },
    formatMoney(row,col,v){
      return accounting.formatNumber(v,2)
    },
    formatBTC(row,col,v){
      return accounting.formatNumber(v,4)
    },
    getNameById(accountId){
      let n = ""
      this.accounts.forEach(obj=>{
        if(obj.accountId==accountId){
          n= obj.accountName
        }
      })
      return n
    },
    exportAccount(){
      exportAccount({
        accountId: this.accountId
      }).then(data => {
          let accountName = this.getNameById(this.accountId)
          let fileName = `${accountName}仓位详情.csv`
          let blob = new Blob([data]);
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            let link = document.createElement("a");
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);
            link.href = URL.createObjectURL(blob); 
            link.download = fileName;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-wrap {
    padding: 20px;

    & > i {
      width: 22px;
      margin-left: 10px;
      height: 22px;
      display: inline-block;
      position: relative;
      top: 3px;
      color: #999;

      &::before {
        font-size: 22px;
      }
    }
  }

  .account-info {
    margin: 20px 0;

    & >>> button {
      float: right;
    }

    span {
      line-height: 24px;
      display: inline-block;
      margin-right: 50px;
    }

    i {
      color: #aaa;
      display: inline-block;
      font-style: normal;
      line-height: 24px;
    }
  }
</style>
