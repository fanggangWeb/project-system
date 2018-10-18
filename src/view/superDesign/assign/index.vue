<template>
  <div class="container">
    <div class="header">
      首页 > 人员
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="搜索项目名称" v-model="projectName" clearable>
          </el-input>
          <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a>
        </div>
        <el-select style="width:130px;margin-left:20px;" v-model="PMValue" clearable placeholder="项目PM">
          <el-option v-for="item in PMList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin: 0 20px;width:160px"
          v-model="searchTime"
          type="date"
          placeholder="项目开始时间">
        </el-date-picker>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="项目名称">
        </el-table-column>
        <el-table-column prop="name" label="项目PM">
        </el-table-column>
        <el-table-column prop="name" label="设计师">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="assign(scope.row)">分配</el-button>
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
    <el-dialog :visible.sync="showState" :close-on-click-modal="false" width="50%" center>
      <el-row style="font-size:16px;line-height:25px;color:rgb(144, 147, 153)">
        <el-col :span="18">
          <span>项目名称：太寺垭公众号</span>
        </el-col>
        <el-col :span="6">
          <span>项目PM：覃定金</span>
        </el-col>
      </el-row>
      <el-row style="font-size:16px;line-height:25px;margin-top:20px;color:rgb(144, 147, 153)">
        <el-col  :span="20">描述：测试测试测试测试测试测试测hi是路上看到房价的酸辣粉等级六十开发机撒娇卢卡斯解放拉萨的饭卡上</el-col>
      </el-row>
      <el-row style="font-size:16px;line-height:25px;margin-top:20px;color:rgb(144, 147, 153)">
        <el-col>
          <span>选择设计师</span>
          <el-select style="width:160px;margin-left:20px;" v-model="PMValue" clearable placeholder="选择设计师">
            <el-option v-for="item in PMList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="showState = false">确 定</el-button>
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
        PMList: [],
        PMValue: '',
        page: 1,
        size: 10,
        searchTime: '',
        projectsList: [1,2],
        status: {},
        totalElements: 10,
        projectName: '',
        showState: false,
        downUrl: ''
      }
    },
    mounted() {},
    methods: {
      ...mapMutations(['projectId']),
      assign (item) {
        this.showState = true
        this.projectId(item)
      },
      del (item) {},
      nameSearch () {},
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        console.log(this.page)
      },
      // 上传计划表格的成功回调函数
      isDemand(response, file, fileList) {
        if (response.code == 0) {
          this.MessageSuccess(response.msg)
          vm.planUploadState(1)
        } else {
          this.MessageError(response.msg)
          vm.planUploadState(0)
        }
      },
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
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
      justify-content: space-between;
      .searchContent {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        /*border: 1px solid;*/
        .searchProject {
          position: relative;
          i {
            vertical-align: middle;
            position: absolute;
            top: 36%;
            right: 10px;
          }
        }
        .searchProject {
          width: 160px;
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
        // width: 108px;
        height: 40px; // align-self: center;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 5px; // background-color: #45B68C;
        // cursor: pointer;
      }
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
