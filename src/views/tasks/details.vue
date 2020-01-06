<template>
  <div class="right-wrap">
    <div>
      <div class="main-info">
        <go-back></go-back>
        <ul>
          <li>
            <b>任务名称：</b><span>{{data.taskName}}</span>
          </li>
          <li>
            <b>交易所：</b><span>{{row.exchangeName}}</span>
          </li>
        </ul>
        <router-link :to="recordLink">交易记录</router-link>
      </div>
      <el-button v-if="row.state=='Running'" size="small">暂停任务</el-button>
      <el-button v-if="row.state=='Stopped'" size="small">启动任务</el-button>
      <el-button v-if="row.state=='Running'" size="small">重启任务</el-button>
    </div>
    <div v-if="roles.indexOf('admin')>=0">
      <h4>修改配置</h4>
      <el-form class="update-wrap" :model="adminForm" :rules="adminRules" ref="ruleForm" label-width="100px">
        <el-form-item label="spread" prop="spread">
          <el-input v-model.number="adminForm.spread" type="number"></el-input>
        </el-form-item>
        <el-form-item label="priceMultiple" prop="priceMultiple">
          <el-input v-model.number="adminForm.priceMultiple" type="number"></el-input>
        </el-form-item>
        <el-form-item label="initOffset" prop="initOffset">
          <el-input v-model.number="adminForm.initOffset" type="number"></el-input>
        </el-form-item>
        <el-form-item label="24hQty" prop="qty">
          <el-input v-model.number="adminForm.qty" type="number"></el-input>
        </el-form-item>
        <el-form-item label="poStep" prop="poStep">
          <el-input v-model.number="adminForm.poStep" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('adminForm')" class="submit-btn" size="small">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="roles.indexOf('admin')<0">
    <!-- <div> -->
      <h4>修改配置</h4>
      <el-form class="update-wrap" :model="userForm" :rules="userRules" ref="ruleForm" label-width="100px">
        <el-form-item label="pricing" prop="pricing">
          <el-input v-model.number="userForm.pricing" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')" class="submit-btn" size="small">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="task-state">
      <h4>任务状态</h4>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本状态" name="1">
          <ul>
            <li v-for="(v,k) in data.strategyParams" :key="k">
              <b>{{k}}: </b><span>{{v}}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="画线" name="2">
          <ul>
            <li><b>taskName: </b><span>{{data.drawLine.taskName}}</span></li>
            <li><b>24hQty: </b><span>{{data.drawLine['24hQty']}}</span></li>
            <li><b>poStep: </b><span>{{data.drawLine.poStep}}</span></li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="asks" name="3">
          <h5>length: {{data.asks.length}}</h5>
          <el-table
            :data="data.asks"
            style="width: 100%">
            <el-table-column prop="price" label="price"></el-table-column>
            <el-table-column prop="amount" label="amount"></el-table-column>
            <el-table-column prop="state" label="state"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="bids" name="4">
          <h5>length: {{data.bids.length}}</h5>
          <el-table
            :data="data.bids"
            style="width: 100%">
            <el-table-column prop="price" label="price"></el-table-column>
            <el-table-column prop="amount" label="amount"></el-table-column>
            <el-table-column prop="state" label="state"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GoBack from '@/components/GoBack/index'
const data =  {
        "taskName": "ae_pro_2_au",
        "taskId": 1,
        "taskRole": 0,                          // 0: 不可写, 1: 可写
        "strategyParams": {
            "spread": 0.002,
            "priceMultiple": 1.2,
            "smMiddlePrice": 220000,
            "ownFirstAsk": 230000,
            "ownFirstBid": 210000,
            "marketFirstAsk": 240000,
            "marketFirstBid": 180000,
            "expectedPriceHub": 225000,
            "expectedPriceHubWeighted": 223000,
            "diffPos": -1200,
            "initOffset": 200,
            "realPos": -1000,
        },                                  // 策略参数
        "drawLine": {
            "taskName": "ae_pro_2_au",
            "24hQty": 108,
            "poStep": 60,
        },                                  // 画线运行态, 并不是一定有的
        "asks": [
          {
            "price": 10000,
            "amount": 10.1,
            "state": 0,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          },
          {
            "price": 20000,
            "amount": 10.1,
            "state": 1,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          },
          {
            "price": 30000,
            "amount": 10.1,
            "state": 2,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          },
          {
            "price": 40000,
            "amount": 10.1,
            "state": 3,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          }
        ],                                  // 卖单列表
        "bids": [
          {
            "price": 100,
            "amount": 10.1,
            "state": 0,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          },
          {
            "price": 200,
            "amount": 10.1,
            "state": 1,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          },
          {
            "price": 300,
            "amount": 10.1,
            "state": 2,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          },
          {
            "price": 400,
            "amount": 10.1,
            "state": 3,                 // 0: unkonw, 1: Ready_PlaceOrder, 2: Running, 3: Cancel
          }
        ],                         // 买单列表, 同上
    }

export default {
  components:{GoBack},
  data(){
    
    var min0max1 = (rule, value, callback) => {
      if (0<value && value<1) {
        callback();
      } else {
        callback(new Error('范围 0-1'));
      }
    };

    var min0 = (rule, value, callback) => {
      if (0<value) {
        callback();
      } else {
        callback(new Error('范围 >0'));
      }
    };

    return {
      taskId: this.$route.params.taskId,
      data,
      row: {...this.$route.query},
      adminForm: {
        spread: 1.2,
        priceMultiple: 1.1,
        initOffset: -1000,
        qty: 1000000,
        poStep: 120
      },
      adminRules: {
        spread: [
          { type: 'number', message: '必须为数字值'},
          { validator: min0max1, trigger: 'blur' }
        ],
        priceMultiple: [
          { type: 'number', message: '必须为数字值'},
          { validator: min0, trigger: 'blur' }
        ],
        initOffset: [
          { type: 'number', message: '必须为数字值'}
        ],
        qty: [
          { type: 'number', message: '必须为数字值'},
          { validator: min0, trigger: 'blur' }
        ],
        poStep: [
          { type: 'number', message: '必须为数字值'},
          { validator: min0, trigger: 'blur' }
        ],
      },
      userForm: {
        pricing: 10000.00
      },
      userRules: {
        pricing: [
          { type: 'number', message: '必须为数字值'},
          { validator: min0, trigger: 'blur' }
        ]
      },
      activeName: "1",
      
    }
  },
  computed:{
    ...mapGetters([
      "roles"
    ]),
    recordLink(){
      return {
        path: '/tasks/list/'+ this.$route.params.taskId+'/records',
        query: {...this.row}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-wrap {
    padding: 20px;

    & > div {
      border: 1px solid #ccc;
      margin: 0 0 20px;
      padding: 20px;
    }

    & >>> .update-wrap {
      width: 100%;
      max-width: 500px;

      .submit-btn {
        width: 120px;
      }
    }
  }
  .main-info {
    margin-bottom: 20px;
    position: relative;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: inline-block;

      li {
        display: inline-block;
        margin: 0 30px 0 0;
      }
    }

    & >>> a {
      text-decoration: underline;
    }
  }

  .task-state {
    min-height: 500px;
    
    ul {

      li {
        margin: 7px 0;

        b {

        }

        span {

        }
      }
    }

    h5 {
      margin: 10px 0 0 11px;
      font-weight: normal;
      color: #777;
    }
  }
</style>
