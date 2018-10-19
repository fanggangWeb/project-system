<template>
  <div class="container">
    <div class="path">
      <div class="path_text">首页&nbsp;>&nbsp;个人中心</div>
    </div>
    <div class="manager_msg">
      <ul>
        <li><span class="img-con"><img src="../../assets/id.png"/></span> 账号：<span class="content">{{content.mobile}}</span></li>
        <!-- <li><span class="img-con"><img src="../../assets/pwd.png" /></span>密码：<span class="content pwd">*******</span></li> -->
        <li><span class="img-con"><img src="../../assets/name.png" /></span>姓名：<span class="content">{{content.name}}</span></li>
        <li v-if="roleShow"><span class="img-con"><img src="../../assets/level.png" /></span>积分等级：<span class="content" v-if="content.projectManagerIntegral">{{content.projectManagerIntegral.integralGrade.name}}</span></li>
        <li v-if="roleShow"><span class="img-con"><img src="../../assets/integral.png" /></span>积分累积：<span class="content" v-if="content.projectManagerIntegral">{{content.projectManagerIntegral.integral}}</span></li>
        <li>
          <!-- <button class="btn1" @click="seeDetails">详情</button> -->
          <!-- <button class="btn">升级</button> -->
        </li>
      </ul>
    </div>
    <div class="table">
      <table class="tables">
        <tr>
          <td class="cow1">岗位</td>
          <td class="cow2 cow2_botton">{{content.position}}</td>
          <td class="cow1">工资卡开户行</td>
          <td class="cow2 cow2_botton"><span v-if="content.userRoster.accountBank">{{content.userRoster.accountBank}}</span></td>
          <td class="cow1">工资卡号</td>
          <td class="cow2 cow2_botton"><span v-if="content.userRoster.bankAccountNo">{{content.userRoster.bankAccountNo}}</span></td>
        </tr>
        <tr>
          <td class="cow1">薪资</td>
          <td class="cow2 cow2_botton">{{content.salaryMonth}}</td>
          <td class="cow1">状态</td>
          <td class="cow2 cow2_botton">{{content.userStatus.isFree ? '空闲中' : '忙碌中'}}</td>
          <td class="cow1">入职时间</td>
          <td class="cow2 cow2_botton">{{content.hiredDate}}</td>
        </tr>
        <tr>
          <td class="cow1">社保号</td>
          <td class="cow2 cow2_botton">{{content.userRoster.personalSi}}</td>
          <td class="cow1">工号</td>
          <td class="cow2 cow2_botton">{{content.jobnumber}}</td>
          <td class="cow1">身份证号</td>
          <td class="cow2 cow2_botton">{{content.userRoster.certNo}}</td>
        </tr>
        <tr>
          <td class="cow1">转正时间</td>
          <td class="cow2">{{content.userRoster.regularTime}}</td>
          <td class="cow1">联系电话</td>
          <td class="cow2">{{content.mobile}}</td>
          <td class="cow1">登录密码</td>
          <td class="cow2">
            <button class="modify_button" @click="dialogShowState = true">修改</button>
          </td>
        </tr>
      </table>
      <!-- <el-button type="success" style="margin-top:20px">晋升申请</el-button> -->
    </div>
    <el-dialog :visible.sync="dialogShowState" width="30%" :close-on-click-modal="false" center>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import { getUerInfo, modifyPassword } from '@/api/center_request'
  import { mapMutations, mapGetters } from 'vuex'
  let vm;
  export default {
    name: "information",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        content: new Object(),
        levelName: '',
        roleShow: false,
        dialogShowState: false,
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }]
        }
      }
    },
    computed: {
      ...mapGetters(['getrole'])
    },
    mounted() {
      vm = this;
      this.getCurrentPersionInfo()
    },
    watch: {
      dialogShowState: function(val, oldval) {
        if (val == false) {
          this.$refs['ruleForm'].resetFields()
        }
      }
    },
    methods: {
      // 获取个人信息
      getCurrentPersionInfo () {
        getUerInfo().then(res => {
          res = res.data
          this.$store.getters.getrole === 'PROJECT_MANAGER' ? this.roleShow = true : this.roleShow = false
          if (res.state === 200) {
            this.content = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      seeDetails() {
        vm.$router.push({
          name: 'Assessment'
        });
      },
      // 修改密码
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modifyPassword({ password: this.ruleForm.pass }).then(res => {
              res = res.data
              if (res.state === 200) {
                this.MessageSuccess(res.message)
                this.dialogShowState = false
              } else {
                this.MessageError(res.message)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: #fafbfc;
    .path {
      width: 100%;
      height: 70px;
      background: rgba(244, 246, 247, 1);
      .path_text {
        color: #848484;
        font-size: 22px;
        line-height: 70px;
        text-align: left;
        padding-left: 30px;
      }
    }
    .manager_msg {
      width: 100%;
      margin-top: 11px;
      height: 80px;
      background: white;
      .img-con {
        position: relative;
        display: inline-block;
        width: 14px;
        height: 15px;
        top: 2px;
        margin-right: 3px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        display: inline-block;
        color: #A5A5A5;
        font-size: 16px;
      }
      .pwd {
        position: relative;
        top: 4px;
      }
      li {
        float: left;
        padding-left: 30px;
        font-size: 16px;
        line-height: 80px;
        margin-right: 35px;
        .btn {
          height: 25px;
          width: 55px;
          border: none;
          color: #ffffff;
          margin-left: 10px;
          background: #45B78D;
          cursor: pointer;
        }
        .btn1 {
          height: 25px;
          width: 55px;
          border: none;
          color: #ffffff;
          margin-left: 10px;
          background: #4585B7;
          cursor: pointer;
        }
      }
    }
    .table {
      width: 100%;
      padding: 30px;
      background: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      margin-top: 11px;
      .tables {
        width: 80%;
        height: 80px;
        .cow1 {
          width: 5%;
          font-size: 16px;
          background: #f6f6f6;
          height: 100%;
          line-height: 80px;
          text-align: center;
          color: #4d4d4d;
        }
        .cow2 {
          background: #fcfcfc;
          width: 5%;
          font-size: 16px;
          height: 100%;
          color: #848484;
          text-align: center;
          line-height: 80px;
        }
        .cow2_botton {
          border-bottom: 2px solid #f6f6f6;
        }
        .modify_button {
          width: 90px;
          height: 40px;
          background: rgba(69, 183, 141, 1);
          border-radius: 2px;
          border: none;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
</style>
