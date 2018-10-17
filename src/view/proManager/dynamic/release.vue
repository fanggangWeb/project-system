<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;&gt;</router-link>
      <router-link to="#">发布公司动态</router-link>
    </div>
    <div class="body-content">
      <div class="content">
        <p class="prompt"> <span>|</span>&nbsp;输入需要发布的内容</p>
        <el-row>
          <el-col :span="8">
            <el-input v-model="title" placeholder="请输入标题"></el-input>            
          </el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="8">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3}"
              placeholder="请输入动态详情"
              v-model="content">
            </el-input>            
          </el-col>
        </el-row> 
        <el-row style="margin-top:10px">
          <el-col :span="3">
            <p style="height:40px;line-height:40px;color:#767676">业务经理</p>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-select v-model="managerId" filterable default-first-option placeholder="请选择业务经理">
              <el-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-button class="btn-publish" type="success" @click="dynamic">发布动态</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  let vm
  export default {
    data() {
      return {
        title: '',
        content: '',
        header: {},
        managerId: '',
        managerList: []
      }
    },
    mounted() {
      vm = this
    },
    methods: {
      // 获取所有业务经理
      fetchBusinessManager() {
        vm.axios.post(vm.urlApi.queryServiceManager).then(data => {
          if (data && data.code === 0) {
            vm.managerList = data.data
          }
        })
      },
      // 上传动态
      dynamic() {
        if (vm.content === '' || vm.title === '') {
          return vm.$message.success('内容必须填写完整')
        } else {
          let params = {
            content: vm.content,
            title: vm.title,
            serviceManagerId: vm.managerId
          }
          vm.axios.post(vm.urlApi.getDynamicServiceManager, params).then(data => {
            if (data && data.code === 0) {
              vm.$message('上传成功')
            }
          }).then(() => {
            setTimeout(() => {
              vm.$router.go(-1)
            }, 2000)
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #fafbfc;
    text-align: left;
    overflow: auto;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      .btn-publish {
        float: right;
        margin-top: 20px;
        margin-right: 20px;
      }
    }
    .body-content {
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 0 30px 70px;
        background: #ffffff;
        .prompt {
          display: inline-block;
          height: 30px;
          margin-top: 40px;
          color: #767676;
          span {
            color: #45B78D;
          }
        }
        input {
          width: 900px;
          height: 30px;
          margin: 20px 0 12px 0;
          font-size: 20px;
          background: #F9F9F9;
          border: none;
          padding-left: 15px;
        }
        textarea {
          width: 900px;
          height: 180px;
          resize: none;
          background: #F9F9F9;
          border: none;
          font-size: 20px;
          padding: 15px;
        }
        .btn-publish {
          width: 100px;
          margin-top: 20px;
        }
      }
    }
  }
</style>
