<template>
  <div class="container">
    <div class="header">
      首页&nbsp;>&nbsp;
      <a href="" @click.prevent="jump('/home/project', '')">项目</a>&nbsp;&gt;&nbsp;
      <a href="#" @click.prevent="jump('/home/projectDetail', '')">项目详情</a>&nbsp;&gt;&nbsp;
      <a href="#">添加项目人员</a>
      <el-button type="info" size="small" style="margin-left:20px;" @click="jump('/home/projectDetail/participants')">返回</el-button>
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员名称" v-model="staffName" clearable>
          </el-input>
          <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a>
        </div>
        <div class="selectChoose">
          <el-select v-model="positionId" clearable placeholder="目前状态">
            <el-option v-for="item in positionList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="details-content">
      <div class="details-menu">
        <ul>
          <li v-for="(item,index) in tabs" :key="index">
            <a @click.prevent="changeTab(item,index)" :class="{'active':currentIndex==index}">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="table-container">
        <div class="project-table">
          <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="name" label="名称" style="width: 20%">
            </el-table-column>
            <el-table-column prop="number" align="center" label="工号" style="width: 20%">
            </el-table-column>
            <el-table-column prop="position" align="center" label="岗位" style="width: 20%">
            </el-table-column>
            <el-table-column prop="department" align="center" label="所属部门" style="width: 20%">
            </el-table-column>
            <el-table-column prop="positive" align="center" label="转正情况" style="width: 20%">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="success" size="small" @click="add(scope.row)">添加</el-button>
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
    </div>
  </div>
</template>
<script>
  let vm
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        staffName: '',
        positionId: '',
        positionList: [],
        isCateShow: false,
        showState: false,
        userId: '',
        currentIndex: 0,
        staffList: [1,2],
        page: 1,
        size: 10,
        totalElements: 10,
        tabs: [{name: '组员', value: 1}, {name: '全部人员', value: 1}]
      }
    },
    computed: {
      ...mapGetters([])
    },
    watch: {
    },
    mounted() {
      vm = this
      console.log(this.$route)
    },
    methods: {
      ...mapMutations([]),
      searchByPerson() {
      },
      changeTab (item, index) {
        this.currentIndex = index
      },
      nameSearch () {},
      add (item) {},
      jump(url, id) {
        vm.$router.push(url)
      },
      handleCurrentChange () {}
    },
    destroyed() {}
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: #FAFBFC;
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
      .searchContent {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;
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
        }
      }
    }
    .details-content {
      padding: 20px 20px 0 20px;
      width: 100%;
      height: calc(100% - 70px);
      box-sizing: border-box;
      .table-container {
        height: calc(100% - 45px);
        background: white;
        width: 100%;
        overflow-y: hidden;
        .project-table {
          padding: 30px 16px 0 16px;
        }
        .project-paging {
          text-align: center;
          padding: 10px 16px 0 16px;
        }
      }
      .details-menu {
        ul li {
          color: #676767;
          display: inline-block;
          width: 95px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          margin-right: 5px;
          font-size: 16px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          .active {
            background-color: #45B78D;
            color: white;
          }
        }
      }
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>