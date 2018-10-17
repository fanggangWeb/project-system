<template>
  <div class="second-container">
    <!-- <div class="header">
      <el-input class="addPlan" size="small" placeholder="人员搜索" style="margin-right:10px" v-model="personName">
      </el-input>
      <el-select  style="margin-right:10px" size="small" v-model="job" clearable placeholder="岗位筛选">
        <el-option v-for="(item, index) in jobList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button size="small" type="success" class="hidenBtn" @click="showState = true">
        导入表格
      </el-button>
      <el-button size="small" type="primary" style="margin-right:20px">导出表格</el-button>
    </div> -->
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="personList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="名字" style="width: 20%">
        </el-table-column>
        <el-table-column prop="job" label="岗位" style="width: 20%">
        </el-table-column>
        <el-table-column prop="salary" label="薪资" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="薪资比例（百分数）">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.num" @change="handleChange" :min="80" :max="120" label="描述文字">%</el-input-number>
            <!-- <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="delPerson(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="project-paging">
      <el-button type="primary">提交</el-button>
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
  import { groupMemberList } from '@/api/request'
  export default {
    data() {
      return {
        jobList: [],
        job: '',
        num1: 1,
        showState: false,
        personName: '',
        otherUsers: [],
        userId: '',
        personList: [{num:80},{num:88}], // 人员列表
        moduleState: false,
        downUrl: '',
        moduleInput: '',
        form: {
          name: ''
        },
        page: 1,
        size: 10,
        totalElements: 10
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted() {
      vm = this
    },
    methods: {
      ...mapMutations([]),
      handleChange () {},
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