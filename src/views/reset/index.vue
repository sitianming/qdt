<template>
  <div class="reset-container">
    <div>
      <h2>首次登陆，请重置密码</h2>
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <!-- <el-form-item label="用户名">
          <span>{{name}}</span>
        </el-form-item> -->
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { reset } from '@/api/user'

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  // watch: {
  //     $route: {
  //         handler: function(route) {
  //             const query = route.query
  //             if (query) {
  //                 this.redirect = query.redirect
  //                 this.otherQuery = this.getOtherQuery(query)
  //             }
  //         },
  //         immediate: true
  //     }
  // },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用修改密码api
          reset({ passwd: this.ruleForm.pass })
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
    .reset-container {
        display: flex;
        height: inherit;
        justify-content: center;
        align-items: center;

        & > div {
            width: 500px;
            flex-grow: 0;

            & > h2 {
                text-align: center;
                margin-bottom: 2rem;
            }

            & >>> .submit-btn {
                width: 100%;
            }
        }
    }
</style>
