<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;&gt;</router-link>
      <router-link to="/home/busDynamic">动态&nbsp;&gt;</router-link>
      <router-link to="#">发布动态</router-link>
    </div>
    <div class="body-content">
      <div class="content">
        <p class="prompt"> <span>|</span>&nbsp;输入需要发布的内容</p>
        <el-row style="margin-top:20px">
          <el-col :span="10">
            <el-input v-model="title" placeholder="请输入标题"></el-input>            
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span="10">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3}"
              placeholder="请输入动态详情"
              v-model="content">
            </el-input>
          </el-col>
        </el-row> 
        <el-row style="margin-top:20px">
          <p style="height:30px;line-height:30px;color:#767676">选择接收人</p>
        </el-row>
        <el-row style="margin-top:20px">
          <el-select v-model="receiverId" filterable  clearable>
            <el-option v-for="(item,index) in personList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-row>
        <el-button class="btn-publish" type="success" @click="dynamic">发布动态</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  const SUCCESS_OK = '200'
  import { findAllStaff, insertAdvice } from '@/api/request'
  let vm
  export default {
    data() {
      return {
        title: '',
        content: '',
        header: {},
        receiverId: '',
        personList: []
      }
    },
    mounted() {
      vm = this
      this._findAllStaff()
    },
    methods: {
      // 上传动态
      dynamic() {
        if (this.content == '' || this.title == '' || this.receiverId == '') {
          this.MessageError('所有内容必须填充完整')
        } else {
          let data = {
            body: this.content,
            title: this.title,
            receiver: {
              id: this.receiverId
            }
          }
          insertAdvice(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              setTimeout(() => {
                this.$router.push('/home/busDynamic')
              }, 1000)
            } else {
              this.MessageError(res.message)
            }
          })
        }
      },
      _findAllStaff () {
        findAllStaff().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.personList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
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
          line-height: 30px;
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
