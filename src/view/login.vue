<template>
  <div class="login" @keydown="keyDown">
    <div class="login-display">
      <img src="../assets/logo.png" class="logo">
      <div class="header">WeLCome</div>
      <div class="login-info">
        <div class="account-number">账号</div>
        <div class="number-input" ref="numberInput">
          <img src="../assets/login_number.png" />
          <input type="text" placeholder="请输入账号" v-model.trim="accountNumber" />
        </div>
      </div>
      <div class="login-info">
        <div class="account-number">密码</div>
        <div class="number-input" ref="passwordInput">
          <img src="../assets/login_password.png" />
          <input type="password" placeholder="请输入密码" v-model.trim="password" />
        </div>
      </div>
      <div class="remember-password">
        <div class="checkbox" @click="isRememberPassword = !isRememberPassword"><span v-if="isRememberPassword">√</span></div>
        <span>记住账号</span>
      </div>
      <div class="submit-button" @click="loginClick">登 录</div>
    </div>
    <el-dialog :visible.sync="showState" width="35%" :close-on-click-modal="false" center>
      <el-row style="font-size:16px;line-height:25px;margin-top:20px;color:rgb(144, 147, 153)">
        <el-col :offset="4" :span="20">检测到当前登录账号有多种角色权限，请进行选择登录</el-col>
      </el-row>
      <el-row style="font-size:16px;line-height:25px;margin-top:20px;color:rgb(144, 147, 153)">
        <el-col :offset="4">
          <span>请选择登录角色:</span>
          <el-select style="width:160px;margin-left:10px;" v-model="roleValue"  clearable placeholder="选择角色">
            <el-option v-for="item in roleList" :key="item.securityRoles" :label="item.name" :value="item.securityRoles">
          </el-option>
        </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showState = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import common from  '@/utils/common'
  const SUCCESS_OK = '200'
  import { login, userInfo }from '../api/request'
  import { proManager, orWorker, proSupervisor, busSupervisor, business, personnel, superDesign } from '../router/index'
  import { mapMutations } from 'vuex'
  export default {
    name: "login",
    data() {
      return {
        isRememberPassword: false,
        accountNumber: '',
        password: '',
        showState: false,
        roleValue: '',
        roleList: []
      }
    },
    mounted() {
      if(this.getCookie('user') && this.getCookie('user') != 'null' && this.getCookie('pswd') && this.getCookie('pswd')){
        this.accountNumber = this.getCookie('user');
        this.password = this.getCookie('pswd');
        this.isRememberPassword = true;
      }
    },
    methods: {
      ...mapMutations(['name', 'position', 'id', 'role','routers']),
      confirm () {
        if (this.roleValue) {
          for (let i = 0; i<this.roleList.length; i++) {
            if (this.roleList[i].securityRoles == this.roleValue) {
              this.role(this.roleValue)
              this.routers(JSON.stringify(this.roleList[i].userMenus))
              this.$router.push(`/home/${this.roleList[i].userMenus[0].path}`)
            }
          }
        } else {
          this.MessageError('请选择登录角色！')
        }
      },
      loginClick () {
        let lable;
        let error;
        let isError = false;
        if (!this.accountNumber) {
          isError = true;
          lable = this.$refs['numberInput'];
          error = '请输入账号！';
        } else if (!this.password) {
          isError = true;
          lable = this.$refs['passwordInput'];
          error = '请输入密码！';
        }
        if(isError){
          common.bubbleHints(lable,error);
          return;
        }
        if(this.isRememberPassword){
          this.setValue('user',this.accountNumber,365);
          this.setValue('pswd',this.password,365);
        }else {
          if(this.getCookie('user') && this.getCookie('pswd')){
            this.delCookie('user');
            this.delCookie('pswd');
          }
        }
        let data = {
          username: this.accountNumber,
          password: this.password
        }
        // if ( this.accountNumber == 1 ) {
        //   // 项目经理
        //   const router = JSON.stringify(proManager)
        //   this.routers(router)
        //   this.$router.push('/home/task')
        // } else if ( this.accountNumber == 2 ) {
        //   // 普通开发人员
        //   const router = JSON.stringify(orWorker)
        //   this.routers(router)
        //   this.$router.push('/home/orTask')
        // }else if ( this.accountNumber == 3 ) {
        //   // 项目主管
        //   const router = JSON.stringify(proSupervisor)
        //   this.routers(router)
        //   this.$router.push('/home/superTask')
        // } else if ( this.accountNumber == 4) {
        //   // 商务主管
        //   const router = JSON.stringify(busSupervisor)
        //   this.routers(router)
        //   this.$router.push('/home/busSuperfeedback')
        // } else if ( this.accountNumber == 5) {
        //   // 普通业务员
        //   const router = JSON.stringify(business)
        //   this.routers(router)
        //   this.$router.push('/home/follow')
        // } else if ( this.accountNumber == 6) {
        //   // 人事
        //   const router = JSON.stringify(personnel)
        //   this.routers(router)
        //   this.$router.push('/home/perPerson')
        // } else if ( this.accountNumber == 7) {
        //   // 设计主管
        //   const router = JSON.stringify(superDesign)
        //   this.routers(router)
        //   this.$router.push('/home/assign')
        // }
        login(data).then(res => {
          res = res.data
          // console.log(res)
          const length = res.data.authorities.length
          const authority = res.data.authorities[0].authority
          if (res.state == SUCCESS_OK) {
            userInfo().then(res => {
              res = res.data
              data = res.data
              console.log(res)
              if (res.state == SUCCESS_OK) {
                this.name(data.name)
                this.position(data.position)
                this.id(data.id)
                if (length == 1) { // 只有一种权限的拿到姓名路由后直接跳页面
                  this.role(authority)
                  this.routers(JSON.stringify(data.userRoles[0].userMenus))
                  this.$router.push(`/home/${data.userRoles[0].userMenus[0].path}`)
                } else { // 有两种权限或者多种权限的
                this.roleList = data.userRoles
                this.showState = true
                }
              } else {
                this.MessageError(res.message)
              }
            })
          } else {
            this.MessageError(1111)
          }
        })
      },
      setValue (name, value, day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + day;
      },
      getCookie (name) {
        let reg = RegExp(name + '=([^;]+)');
        let arr = document.cookie.match(reg);
        if (arr) {
          return arr[1]
        } else {
          return ''
        }
      },
      delCookie(name) {
        this.setValue(name, null, -1);
      },
      keyDown(ev) {
        if (ev.keyCode == 13) {
          this.loginClick();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url("../assets/background.png");
    background-size: 100% 100%;
    text-align: center;
    .login-display {
      width: 617px;
      height: 530px;
      background: #fff;
      border-radius: 8px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 57px;
      .logo {
        position: absolute;
        top: -126px;
        left: 50%;
        transform: translateX(-50%);
      }
      .header {
        height: 91px;
        font-size: 46px;
        line-height: 90px;
        border-bottom: 1px solid #ececec;
      }
      .login-info {
        margin-top: 15px;
        .account-number {
          height: 36px;
          line-height: 36px;
          font-size: 18px;
          text-align: left;
        }
        .number-input {
          width: 100%;
          height: 66px;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          /*padding-left: 50px;*/
          background: #fafafa;
          img {
            float: left;
            margin: 23px 10px 0 15px;
          }
          input {
            width: 450px;
            height: 64px;
            line-height: 64px;
            border: 0;
            outline: none;
            font-size: 18px;
            color: #333;
            background: #fafafa;
          }
        }
      }
      .remember-password {
        margin: 24px 0 18px 0;
        height: 30px;
        line-height: 30px;
        text-align: left;
        .checkbox {
          width: 15px;
          height: 15px;
          border: 1px solid #e1e1e1;
          background: #eeeeee;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          float: left;
          margin-top: 7px;
          span {
            font-size: 14px;
            font-weight: bold;
            position: absolute;
            top: -6px;
            left: 2px;
          }
        }
        >span {
          font-size: 18px;
          color: #848484;
          margin-left: 10px;
        }
      }
      .submit-button {
        height: 65px;
        line-height: 65px;
        background: #5788f7;
        border-radius: 8px;
        font-size: 30px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
</style>
