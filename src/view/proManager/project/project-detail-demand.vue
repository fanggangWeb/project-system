<template>
  <div class="container">
    <el-row>
      <el-col :span="2" :offset="22">
        <!-- <el-select class="add" size="small" v-model="demandValue" @change="changeDemand" placeholder="新增/变更">
          <el-option v-for="(item, index) in demandList" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select> -->
        <el-button type="success" size="small" style="margin-right:10px" @click="demandBtn">新增需求</el-button>
      </el-col>
    </el-row>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="business" align="center" label="业务名称">
        </el-table-column>
        <el-table-column prop="module" align="center" label="模块名称">
        </el-table-column>
        <el-table-column prop="function" align="center" label="功能名称">
        </el-table-column>
        <el-table-column prop="detail" align="center" label="描述">
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
        <el-form-item label="业务名称" prop="business">
          <el-input  v-model="form.business" style="width:300px !important" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="module">
          <el-input  v-model="form.module" style="width:300px !important" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="function">
          <el-input  v-model="form.function" style="width:300px !important" placeholder="请输入功能名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="detail">
          <el-input type="textarea"  v-model="form.detail" style="width:300px !important" placeholder="请输入描述"></el-input>
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
  import { addDemandChange, demandList, editDemandChange, deldemand } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  const SUCCESS_OK = '200'
  export default {
    data () {
      return {
        editState: 'add',
        typeName:'新增',
        page: 1,
        size: 10,
        projectsList: [],
        totalElements: 0,
        Visible: false,
        form: {
          business: '',
          module: '',
          function: '',
          detail: ''
        },
        rules: {
          business: [{required:true, message: '请输入业务名称', trigger: 'blur'}],
          module: [{required:true, message: '请输入模块名称', trigger: 'blur'}],
          function: [{required:true, message: '请输入功能名称', trigger: 'blur'}],
          detail: [{required:true, message: '请输入描述', trigger: 'blur'}]
        }
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    mounted () {
      this._demandList()
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
        this._demandList()
      },
      del (item) {
        this.$confirm('此操作将删除该条需求变更, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deldemand({id:item.id}).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._demandList()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      // 修改和新增的弹出框确认
      confirm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const data = {
              id: this.getprojectId
            }
            this.form.project = data
            if (this.editState == 'add') {
              addDemandChange(this.form).then(res => {
                res = res.data
                if (res.state == SUCCESS_OK) {
                  this.MessageSuccess(res.message)
                  this.Visible = false
                  this._demandList()
                } else {
                  this.MessageError(res.message)
                }
              })
            } else {
              editDemandChange(this.form).then(res => {
                res = res.data
                if (res.state == SUCCESS_OK) {
                  this.MessageSuccess(res.message)
                  this.Visible = false
                  this._demandList()
                } else {
                  this.MessageError(res.message)
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      modify (item) {
        this.typeName = '修改'
        this.editState = 'edit'
        this.form.id = item.id
        this.form.business = item.business
        this.form.module = item.module
        this.form.function = item.function
        this.form.detail = item.detail
        this.Visible = true
      },
      // 需求增加
      demandBtn () {
        this.typeName = '新增'
        this.Visible = true
        this.editState = 'add'
        this.form = {
          business: '',
          module: '',
          function: '',
          detail: ''
        }
      },
      // 需求变更的列表
      _demandList () {
        const data = {
          page: this.page,
          size: this.size,
          projectId: this.getprojectId
        }
        demandList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.projectsList = res.data.rows
            this.totalElements = res.data.total
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
