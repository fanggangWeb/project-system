<template>
  <div class="second-container">
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="taskList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="人员">
        </el-table-column>
        <el-table-column prop="position" label="岗位">
        </el-table-column>
        <el-table-column prop="salary" label="原薪资">
        </el-table-column>
        <el-table-column prop="state" label="转正情况">
        </el-table-column>
        <el-table-column prop="time" label="入职时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="accept(scope.row)">同意</el-button>
            <el-button type="danger" size="small" @click="refuse(scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="personName+'的调薪'"
      :visible.sync="Visible"
      width="40%"
      center>
      <el-form :model="form" ref="form" :rules="rules" class="demo-ruleForm">
        <el-form-item style="margin-left:25%;margin-top:20px;" label="薪资" prop="number">
          <el-input  v-model="form.number" style="width:200px !important" placeholder="请输入调整薪资"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <div class="project-paging">
      <el-pagination background layout="prev, pager, next" 
      :page-size="size" @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "projectDetails",
    data() {
      return {
        taskList: [1,2], // 人员列表
        page: 1,
        size: 10,
        totalElements: 10,
        personName: '李四',
        Visible: false,
        form: {
          number: ''
        },
        rules: {
          number: [{required:true, message: '请输入调整薪资', trigger: 'blur'},
          {type: 'number', message: '金额必须为数字值', trigger: 'blur'}]
        }
      }
    },
    computed: {
      ...mapGetters([])
    },
    watch: {
      Visible: function(val, old) {
        if (val == false) {
          this.$refs['form'].resetFields()
        }
      }
    },
    mounted() {
      vm = this
      console.log(this.$route)
    },
    methods: {
      ...mapMutations([]),
      searchByJob() {
        vm.selectPerson(vm.personId)
      },
      handleCurrentChange() {
        console.log(this.page)
      },
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      accept (item) {
        this.Visible = true
      },
      refuse (item) {
      },
      sure () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.Visible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .second-container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      align-items: center;
      a {
        color: #4d4d4d;
      }
      .addPlan {
        margin-left: auto;
      }
      .addCate {
        margin-right: 36px;
      }
    }
    .project-table {
      padding: 30px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>
