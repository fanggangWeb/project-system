<template>
  <div class="container">
    <el-row>
      <el-col :span="2" :offset="22">
        <!-- <el-select class="add" size="small" v-model="demandValue" @change="changeDemand" placeholder="新增/变更">
          <el-option v-for="(item, index) in demandList" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select> -->
        <el-button type="success" size="small" style="margin-right:10px" @click="demandBtn">
          {{demandText}}
        </el-button>
      </el-col>
    </el-row>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="功能模块" style="width: 20%">
        </el-table-column>
        <el-table-column prop="time" align="center" label="负责人" style="width: 15%">
        </el-table-column>
        <el-table-column prop="money" align="center" label="描述" style="width: 10%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="modify(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="typeName+'需求'"
      :visible.sync="Visible"
      width="40%"
      center>
      <el-form :model="form" ref="form" label-position="right" label-width="100px" :rules="rules" class="demo-ruleForm">
        <el-form-item label="功能模块" prop="module">
          <el-input  v-model="form.module" style="width:300px !important" placeholder="请输入功能模块"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="person">
          <el-input  v-model="form.person" style="width:300px !important" placeholder="请选择负责人"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea"  v-model="form.desc" style="width:300px !important" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">提 交</el-button>
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
  export default {
    data () {
      return {
        typeName:'新增',
        demandText: '新增需求',
        // demandList: [{name: '新增需求', value: 'add'}, {name: '变更需求', value: 'edit'}],
        // demandValue: 'add',
        page: 1,
        size: 10,
        projectsList: [1,2],
        totalElements: 10,
        Visible: false,
        form: {
          modeule: '',
          person: '',
          desc: ''
        },
        rules: {
          module: [{required:true, message: '请输入功能模块', trigger: 'blur'}],
          person: [{required:true, message: '请选择负责人', trigger: 'blur'}],
          desc: [{required:true, message: '请输入描述', trigger: 'blur'}]
        }
      }
    },
    watch: {
      Visible: function(val, old) {
        if (val == false) {
          this.$refs['form'].resetFields()
        }
      }
    },
    methods: {
      handleCurrentChange() {
        console.log(this.page)
      },
      del (item) {
        console.log(item)
      },
      // 修改和新增的弹出框确认
      confirm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.Visible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      modify (item) {
        console.log(item)
      },
      // 需求增加和修改的按钮
      demandBtn () {
        this.typeName = '新增'
        this.Visible = true
      },
    }
  }
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    background: white;
    overflow: auto;
    padding: 0 0 20px 0px;
    .add {
      margin-left: auto;
      width: 120px;
    }
    .project-table {
      padding: 20px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    }
  }
</style>
