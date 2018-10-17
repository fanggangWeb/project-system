<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;></router-link>
      <router-link to="/home/follow">&nbsp;跟进&nbsp;>&nbsp;</router-link>
      <router-link to="#">跟进详情</router-link>
      <el-date-picker class="timeSearch"
        v-model="searchTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="跟进时间">
      </el-date-picker>
      <el-button style="margin-right:20px" type="success" @click="showState = true">添加</el-button>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="list" style="width:100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="time" label="跟进时间" width="180" align="center">
        </el-table-column>
        <el-table-column prop="desc" label="跟进详情">
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="project-paging">
      <el-pagination background layout="prev, pager, next" 
      :page-size="size" @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="totalElements">
      </el-pagination>
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="showState" width="50%" center>
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="跟进时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            @change="timeSearch"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="跟进时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进详情" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入项目简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submit">提 交</el-button>
        <el-button @click="showState = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        searchTime: '',
        list: [{time: '2018-09-10', desc: ''}],
        status: {},
        totalElements: 10,
        projectName: '',
        showState: false,
        form: {
          time: '',
          desc: ''
        },
        rules: {
          desc:[{required: true, message: '请输入跟进详情', trigger: 'blur'}],
          time:[{required: true, message: '请选择跟进时间', trigger: 'blur'}],
        }
      }
    },
    mounted() {},
    watch: {
      showState: function (val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    methods: {
      ...mapMutations(['projectId']),
      handleCurrentChange() {
        console.log(this.page)
      },
      timeSearch(val) {
        console.log(val)
      },
      edit (item) {},
      del (item) {},
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!');
            return false
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
    text-align: left;
    overflow: auto;
    background: #fafbfc;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      align-items: center;
      .timeSearch {
        margin-left: auto;
        margin-right: 20px;
      }
      .addProject {
        width: 108px;
        height: 40px; // align-self: center;
        margin-left: 20px;
        margin-right: 54px;
        margin-top: 5px; // background-color: #45B68C;
        // cursor: pointer;
      }
    }
    .project-table {
      padding: 20px 20px 0 20px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 20px 0 20px;
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
