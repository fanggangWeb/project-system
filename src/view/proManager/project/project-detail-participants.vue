<template>
  <div class="container">
    <el-button type="success" size="small" class="addStaff" @click="jump('/home/addStaff')">添加人员</el-button>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="jobnumber" align="center" label="工号">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位">
        </el-table-column>
        <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column>
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{scope.row.positive == 1 ? '已转正': '未转正'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
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
  </div>
</template>
<script>
  const SUCCESS_OK = '200'
  import { projectDeveloper, delDeveloper } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        page: 1,
        size: 10,
        staffList: [],
        totalElements: 0
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    mounted () {
      this._projectDeveloper()
    },
    methods: {
      // 获取所有参与的开发者列表
      _projectDeveloper () {
        const data = {
          page: this.page,
          size: this.size,
          projectId: this.getprojectId
        }
        projectDeveloper(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      handleCurrentChange() {
        console.log(this.page)
      },
      del (item) {
        // console.log(item)
        const data = {
          userInfoId: item.id,
          projectId: this.getprojectId
        }
        this.$confirm('此操作将删除该成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDeveloper(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._projectDeveloper()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      jump (url) {
        this.$router.push(url)
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
    .addStaff {
      float: right;
      margin: 0 20px 20px 0;
    }
    .project-table {
      padding: 30px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    }
  }
</style>
