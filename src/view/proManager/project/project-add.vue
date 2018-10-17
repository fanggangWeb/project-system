<template>
  <div class="container">
    <div class="header">
      <router-link to="" class="not_current">首页&gt;</router-link>
      <router-link to="/home/project" class="not_current">项目&gt;</router-link>
      <span class="current">新增项目</span>
    </div>
    <el-form ref="form" :model="form" :inline="true" label-width="120px" class="form" label-position="right">
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="项目名称" ref="name">
          <el-input v-model="form.name" placeholder="输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" ref="startTime">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始时间" v-model="form.startTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" ref="endTime">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束时间" v-model="form.endTime">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="项目预算" ref="budget">
          <el-input v-model="form.budget" placeholder="请输入项目预算"></el-input>
        </el-form-item>
        <el-form-item label="项目客户" ref="customer">
          <el-input v-model="form.customer" placeholder="请输入项目客户"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" ref="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
      </el-row>
      <!-- <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="参与人员" ref="participants">
          <el-select style="width:400px" class="long-box" v-model="form.participants" filterable multiple placeholder="请选择">
            <el-option v-for="item in participantsList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row> -->
      <!-- <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="开发里程碑">
          <div class="mark" v-for="(item,index) in markList" :key="index">
            <el-input size="small" style="margin-left:15px;" v-model="item.name" placeholder="里程碑名称"></el-input>
            <span class="keyword time">开始时间:</span>
            <el-date-picker size="small" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择开始时间" v-model="item.startTime"></el-date-picker>
            <span class="keyword time">结束时间:</span>
            <el-date-picker size="small" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择结束时间" v-model="item.endTime"></el-date-picker>
            <span class="keyword desc">描述:</span>
            <el-input size="small" v-model="item.desc" placeholder="请输入描述"></el-input>
          </div>
          <el-button type="success" size="small" @click="addMark">添加里程碑</el-button>
        </el-form-item>
      </el-row> -->
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="项目简介" ref="desc">
          <el-input style="width:600px !important;" type="textarea" placeholder="请输入项目简介"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" style="padding-left: 8.5rem;">
        <el-col :offset="10" :span="2">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import common from "../../../utils/common";
  import { mapGetters, mapMutations } from 'vuex'
  let vm;
  export default {
    name: "personAdd",
    data() {
      return {
        // managerList: [],
        markList: [],
        participantsList: [{value:'1', label:'王琪'},{value: '2', label: '柴方刚'}],
        form: {
          name: '',
          startTime: '',
          endTime: '',
          budget: '',
          customer: '',
          phone: '',
          desc: ''
          // participants: '',// 参与人员
        },
      }
    },
    mounted() {
      vm = this;
    },
    methods: {
      ...mapMutations(['currentSelect']),
      addMark() {
        let data = {
          name: '',
          startTime: '',
          endTime: '',
          desc: ''
        }
        console.log(this.markList)
        this.markList.push(data)
      },
      // 非空验证
      validate(obj, key) {
        let item, msg, left, isError;
        left = '80px';
        if (obj[key] === '' || obj[key] === null) {
          isError = true;
          item = vm.$refs[key].$el;
          let item_child = item.children;
          let item_label = item_child[0].innerHTML;
          if (key === 'startTime' || 'endTime') {
            msg = '请选择' + item_label;
          } else {
            msg = '请输入' + item_label;
          }
        }
        if (isError) {
          common.bubbleHints(item, msg, left);
        }
        return isError;
      },
      // 验证时间大小
      compare(startTime, endTime) {
        let time1 = new Date(startTime)
        time1 = time1.getTime()
        let time2 = new Date(endTime)
        time2 = time2.getTime()
        if (time1 >= time2) {
          vm.$message.error('时间选取有误')
          return false
        } else {
          return true
        }
      },
      // 提交表单
      onSubmit() {
        for (let i in vm.form) {
          vm.validate(vm.form, i);
          if (vm.validate(vm.form, i)) {
            return;
          }
        }
        let res = vm.compare(vm.form.startTime, vm.form.endTime)
        let res1 = vm.compare(vm.form.contractStartTime, vm.form.contractEndTime)
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .el-input,
  .el-select {
    width: 15rem !important;
  }
  .container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-size: 18px;
    color: #000;
    .header {
      color: #4d4d4d;
      font-size: 22px;
      line-height: 70px;
      text-align: left;
      padding-left: 30px;
      width: 100%;
      height: 70px;
      background: rgba(244, 246, 247, 1);
      .not_current {
        color: #4d4d4d;
      }
      .current {
        color: #4d4d4d;
      }
    }
    .form {
      width: 98%;
      margin-top: 19px;
      padding-top: 52px;
      .form-row {
        margin-bottom: 35px;
        padding-left: 4rem;
        // .long-box {
        //   width: 940px !important;
        // }
        .mark {
          width: 940px;
          height: 50px;
          margin-bottom: 15px;
          line-height: 50px;
          background: #FAFAFA;
          .keyword {
            margin-left: 5px;
            color: #C4C4C4;
          }
          .el-input {
            width: 180px !important;
          }
          .el-select {
            width: 130px !important;
          }
        }
      }
    }
  }
</style>
