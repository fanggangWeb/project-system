<template>
  <div class="container">
    <div class="header">
      首页 > 评分
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员搜索" v-model="projectName" clearable>
          </el-input>
          <a href="#" @click.prevent="nameSearch"><i class="el-icon-search"></i></a>
        </div>
        <div class="selectChoose">
          <el-select v-model="positionId" clearable placeholder="岗位筛选">
            <el-option v-for="item in positionList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign:'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="工号" style="width: 20%">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="名称" style="width: 20%">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="岗位" style="width: 20%">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="目前状态" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="toScore(scope.row)">评分</el-button>
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
    <el-dialog title="柴方刚的评分" :visible.sync="showState" width="40%" center>
      <el-row>
        <el-col :offset="5" :span="4">
          <div style="text-align:center;line-height:40px;font-size:16px;">进行评分：</div>
        </el-col>
        <el-col :span="3">
          <el-input-number v-model="score" :min="1" :max="10" label="评分"></el-input-number>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="showState = false">评 分</el-button>
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
        positionList: [],
        positionId: '',
        page: 1,
        size: 10,
        score: 1,
        showState: false,
        projectsList: [1,2],
        status: {},
        totalElements: 10,
        projectName: ''
      }
    },
    watch: {},
    mounted() {},
    methods: {
      ...mapMutations([]),
      toScore (item) {
        this.showState = true
      },
      nameSearch () {},
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        console.log(this.page)
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
      justify-content: space-between;
      .searchContent {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        /*border: 1px solid;*/
        .searchProject {
          position: relative;
          .searchInput {
            width: 200px;
            height: 38px;
            vertical-align: middle;
            padding-left: 10px;
            border: 1px solid #cccccc;
            border-radius: 3px;
          }
          i {
            vertical-align: middle;
            position: absolute;
            top: 36%;
            right: 10px;
          }
        }
        .searchProject {
          width: 130px;
        }
        .selectChoose {
          width: 130px;
          margin-left: 30px;
          margin-right: 20px; 
        }
      }
      .not_current {
        color: #848484;
      }
      .current {
        color: #676767;
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
      padding: 30px 16px 0 16px;
      background: white;
    }
    .project-paging {
      background:white;
      text-align: center;
      padding: 20px 16px 20px 16px;
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
