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
        <!-- <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{positiveFil[scope.row.positive]}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="position" label="空闲日期" align="center">
        </el-table-column>
        <el-table-column prop="position" label="空闲时长" align="center">
        </el-table-column>
        <el-table-column align="center" label="选择项目">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.projectId" clearable>
              <el-option v-for="(item, index) in projectList" :key="index" :value="item" :label="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="submit(scope.row)">补全</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="project-paging">
      <!-- <el-button type="primary" @click="confirm">提交</el-button> -->
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
  import { timeCompletion } from '@/api/request'
  const SUCCESS_OK = '200'
  export default {
    data() {
      return {
        num1: 1,
        personList: [], // 人员列表
        moduleState: false,
        page: 1,
        size: 10,
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        totalElements: 10,
        projectList: ['项目1', '项目2', '项目3']
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted() {
      vm = this
      this._timeCompletion()
    },
    methods: {
      ...mapMutations([]),
      handleCurrentChange () {
        console.log(this.page)
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      submit (item) {
        if (item.projectId) {
          console.log(item)
        } else {
          this.MessageError('请选取项目，再点击补全按钮')
        }
      },
      _timeCompletion () {
        // const data = {
        //   page: this.page,
        //   size: this.size
        // }
        timeCompletion(this.page, this.size).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.personList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      jump(url, id) {
        vm.$router.push(url)
        vm.currentSelect = id
      }
    },
    destroyed() {}
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