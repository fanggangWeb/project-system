<template>
  <div class="container">
    <div class="path">
      <div class="path_text">首页&nbsp;>&nbsp;个人中心</div>
    </div>
    <div class="manager_msg">
      <ul>
        <li><span class="img-con"><img src="../../assets/id.png"/></span> 账号：<span class="content">{{content.phoneNum}}</span></li>
        <li><span class="img-con"><img src="../../assets/pwd.png" /></span>密码：<span class="content pwd">*******</span></li>
        <li><span class="img-con"><img src="../../assets/name.png" /></span>姓名：<span class="content">{{content.name}}</span></li>
        <li><span class="img-con"><img src="../../assets/level.png" /></span>积分等级：<span class="content">{{content.position}}   LV{{levelName}}</span></li>
        <li><span class="img-con"><img src="../../assets/integral.png" /></span>积分累积：<span class="content">{{content.integral}}</span></li>
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
          <td class="cow2 cow2_botton">{{content.cardBank}}</td>
          <td class="cow1">工资卡号</td>
          <td class="cow2 cow2_botton">{{content.cardNum}}</td>
        </tr>
        <tr>
          <td class="cow1">薪资</td>
          <td class="cow2 cow2_botton">{{content.salary}}</td>
          <td class="cow1">状态</td>
          <td class="cow2 cow2_botton">{{content.entryStatus == 'POSITIVE' ? '已转正':'未转正'}}</td>
          <td class="cow1">入职时间</td>
          <td class="cow2 cow2_botton">{{content.entryTime}}</td>
        </tr>
        <tr>
          <td class="cow1">社保号</td>
          <td class="cow2 cow2_botton">{{content.socialNum}}</td>
          <td class="cow1">工号</td>
          <td class="cow2 cow2_botton">{{content.jobNum}}</td>
          <td class="cow1">身份证号</td>
          <td class="cow2 cow2_botton">{{content.idcard}}</td>
        </tr>
        <tr>
          <td class="cow1">转正时间</td>
          <td class="cow2">{{content.conversionTime}}</td>
          <td class="cow1">联系电话</td>
          <td class="cow2">{{content.phoneNum}}</td>
          <td class="cow1">登录密码</td>
          <td class="cow2">
            <button class="modify_button" @click="modifyPassword">修改</button>
          </td>
        </tr>
      </table>
      <el-button type="success" style="margin-top:20px">晋升申请</el-button>
    </div>
  </div>
</template>
<script>
  let vm;
  export default {
    name: "information",
    data() {
      return {
        content: new Object(),
        levelName: ''
      }
    },
    mounted() {
      vm = this;
    },
    methods: {
      queryUserInfo() {
        vm.axios.post(vm.urlApi.queryUserInfo, {}).then((data) => {
          if (data && data.code == 0) {
            let content = data.data.users
            vm.content = content;
            vm.levelName = data.data.levelName
          }
        }) //个人信息
      },
      seeDetails() {
        vm.$router.push({
          name: 'Assessment'
        });
      },
      modifyPassword() {
        vm.$router.push({
          name: 'pwdreset'
        });
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
