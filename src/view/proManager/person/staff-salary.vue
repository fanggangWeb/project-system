<template>
  <div class="second-container">
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="personList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="名字" align="center">
        </el-table-column>
        <el-table-column prop="position" label="岗位" align="center">
        </el-table-column>
        <!-- <el-table-column prop="salaryMonth" label="薪资" align="center">
        </el-table-column> -->
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{positiveFil[scope.row.positive]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="薪资比例（百分数）">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.performance" @change="handleChange" :min="80" :max="120" label="描述文字">%</el-input-number>
            <!-- <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="delPerson(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="project-paging">
      <el-button type="primary" @click="confirm">提交</el-button>
      <!-- <el-pagination background layout="prev, pager, next" 
      :page-size="size" @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="totalElements">
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  import { groupMemberNoPage, insertSalary } from '@/api/request'
  const SUCCESS_OK = '200'
  export default {
    data() {
      return {
        num1: 1,
        showState: false,
        personList: [], // 人员列表
        moduleState: false,
        page: 1,
        size: 10,
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        totalElements: 10
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted() {
      vm = this
      this._groupMemberNoPage()
    },
    methods: {
      ...mapMutations([]),
      handleChange () {},
      // handleCurrentChange() {
      //   console.log(this.page)
      // },
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      confirm () {
        this.$confirm('确认提交人员薪资吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          insertSalary(this.personList).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._groupMemberNoPage()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {});
      },
      _groupMemberNoPage () {
        groupMemberNoPage().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].performance = 100
            }
            this.personList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      detailGo (item) {
        this.$router.push('/home/staffDetail')
      },
      delPerson (item) {},
      jump(url, id) {
        vm.$router.push(url)
        vm.currentSelect = id
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .el-input {
    width: 140px !important;
  }
  .second-container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: white;
    .header {
      height: 70px;
      line-height: 70px;
      background: white;
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
      padding: 20px 20px 0 20px;
      max-height: 630px;
      overflow-y: auto;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 15px 16px;
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>