<template>
  <div class="container">
    <div class="header">
      首页 > 人员
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员搜索" v-model="personName" @change="nameSearch" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <el-select style="width:130px;margin-left:10px;" @change="departSearch" v-model="departmentId" clearable placeholder="选择部门">
          <el-option v-if="item.name" v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select style="width:130px;margin-left:10px;" @change="positionSearch" v-model="position" clearable placeholder="岗位筛选">
          <el-option v-if="item" v-for="(item,index) in positionList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin-left:10px;"
          v-model="searchTime"
          type="date"
          value-format="yyyy-MM-dd"
          @change="timeQuery"
          placeholder="入职时间">
        </el-date-picker>
        <el-button v-if="dingShow" type="info" plain style="margin-left:10px" @click="dingTalk">
          同步钉钉
        </el-button>
        <el-button type="success" style="margin-left:10px" @click="showState = true">
          导入信息
        </el-button>
        <el-button type="primary" @click="exportExcel">导出信息</el-button>
        <el-button type="success" style="margin-left:10px" @click="visible = true">
          导入车补
        </el-button>
        <el-button type="primary" style="margin-right:20px" @click="_exportAllCar">导出车补</el-button>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位">
        </el-table-column>
        <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column>
        <el-table-column prop="salaryMonth" align="center" label="薪资">
        </el-table-column>
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{positiveFil[scope.row.positive]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hiredDate" align="center" label="入职时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
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
    <el-dialog title="上传人员信息" :close-on-click-modal="false" :visible.sync="showState" width="35%" center>
      <el-row style="margin-top:20px">
        <el-col style="text-align:center" :offset="4" :span="8">
          <el-button type="primary" @click="downUserTem"><span style="color:white">下载excel模板</span></el-button>
        </el-col>
        <el-col style="text-align:center" :span="8">
          <el-upload :with-credentials='true' :action="this.HTTP+'/userInfo/importUserInfo'" :file-list="fileList" :on-success="isDemand" :show-file-list="false">
            <el-button style="background-color:#45B78D;border-color:none;color:white">上传excel表格
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showState = false">取 消</el-button>
        <el-button type="primary" @click="showState = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传车补信息" :close-on-click-modal="false" :visible.sync="visible" width="35%" center>
      <el-row style="margin-top:20px">
        <el-col style="text-align:center" :offset="4" :span="8">
          <el-button type="primary" @click="downCar"><span style="color:white">下载excel模板</span></el-button>
        </el-col>
        <el-col style="text-align:center" :span="8">
          <el-upload :with-credentials='true' :action="this.HTTP+'/carSubsidy/importFromExcel'" :on-success="isSuccess" :show-file-list="false">
            <el-button style="background-color:#45B78D;border-color:none;color:white">上传车补excel
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  let vm
  const SUCCESS_OK = '200'
  import { mapGetters, mapMutations } from 'vuex'
  import { groupMemberList, allPosition, allDepartment, delStaff, getAccessToken,
  importUsers, exportUserInfoTemplate, exportUserInfo, carTemplate, exportAllCar } from '@/api/request'
  export default {
    data () {
      return {
        followList: [],
        projectStatus: '',
        position: '',
        positionList: [],
        departmentList: [],
        departmentId: '',
        page: 1,
        size: 10,
        dingShow: true,
        searchTime: '',
        staffList: [],
        status: {},
        totalElements: 0,
        personName: '',
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        showState: false,
        fileList: [], //上传文件列表
        downUrl: '',
        visible: false
      }
    },
    mounted() {
      this._allPosition()
      this._allDepartment()
      this._groupMemberList()
    },
    methods: {
      ...mapMutations(['projectId', 'staffId']),
      handleSuccess (response, file, fileList) {
        console.log(response)
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      isSuccess (response, file, fileList) {
        if (response.state == SUCCESS_OK) {
          this.MessageSuccess(response.message)
          this.visible = false
          // this._groupMemberList()
        } else {
          this.MessageError(response.message)
        }
      },
      // 导出车补的模板
      _exportAllCar () {
        exportAllCar().then(res => {
          if (res.status == SUCCESS_OK) {
            let a = document.createElement('a')
            let url = window.URL.createObjectURL(new Blob([res.data]))
            a.href = url
            a.download = 'CarSubsidy.xls'
            a.click()
            a.remove()
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 下载车补模板
      downCar () {
        carTemplate().then(res => {
          if (res.status == SUCCESS_OK) {
            let a = document.createElement('a')
            let url = window.URL.createObjectURL(new Blob([res.data]))
            a.href = url
            a.download = 'CarSubsidyTemplate.xls'
            a.click()
            a.remove()
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 下载模板
      downUserTem () {
        exportUserInfoTemplate().then(res => {
          if (res.status == SUCCESS_OK) {
            let a = document.createElement('a')
            let url = window.URL.createObjectURL(new Blob([res.data]))
            a.href = url
            a.download = 'UserInfoTemplate.xls'
            a.click()
            a.remove()
          } else {
            this.MessageError(res.message)
          }
        })
      },
      exportExcel () {
        exportUserInfo().then(res => {
          if (res.status == SUCCESS_OK) {
            let a = document.createElement('a')
            let url = window.URL.createObjectURL(new Blob([res.data]))
            a.href = url
            a.download = 'UserInfo.xls'
            a.click()
            a.remove()
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 同步钉钉数据
      dingTalk () {
        getAccessToken().then(res => {
          res = res.data
          if (res.state = SUCCESS_OK) {
            const token = res.data
            this.$alert('同步钉钉数据需要一分钟左右的时间，请勿重复点击同步按钮！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
            this.dingShow = false
            setTimeout(() => {
              this.dingShow = true
            }, 60000)
            importUsers({accessToken: token}).then(res => {
            })
          } else {
            this.MessageError('同步失败')
          }
        })
      },
      // 获取所有员工的列表
      _groupMemberList () {
        const data = {
          name: this.personName,
          page: this.page,
          size: this.size,
          position: this.position,
          departmentId: this.departmentId,
          hiredDate: this.searchTime
        }
        groupMemberList(data).then(res => {
          res = res.data
          // console.log(res)
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }

        })
      },
      // 获取所有岗位的列表
      _allPosition () {
        allPosition().then(res => {
          res = res.data
          // console.log(res)
          if (res.state = SUCCESS_OK) {
            this.positionList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取所有部门的列表
      _allDepartment () {
        let data = {
          page: 1,
          size: 100
        }
        allDepartment(data).then(res => {
          res = res.data
          // console.log(res)
          if (res.state = SUCCESS_OK) {
            this.departmentList = res.data.rows
          } else {
            this.MessageError(res.message)
          }
        })
      },
      detailGo (item) {
        this.staffId(item.id)
        this.$router.push({path: '/home/perPersonDetail'})
      },
      del (item) {
        this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          delStaff({id:item.id}).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess('操作成功')
              this._groupMemberList()
            } else {
              this.MessageError('删除失败')
            }
          })
        }).catch(() => {
        })
      },
      timeQuery () {
        // console.log(this.searchTime)
        this.page = 1
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this._groupMemberList()
      },
      nameSearch () {
        this.page = 1
        this._groupMemberList()
      },
      departSearch () {
        this.page = 1
        this._groupMemberList()
      },
      positionSearch () {
        this.page = 1
        this._groupMemberList()
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        this._groupMemberList()
      },
      // 上传计划表格的成功回调函数
      isDemand(response, file, fileList) {
        if (response.state == SUCCESS_OK) {
          this.MessageSuccess(response.message)
          this.showState = false
          this._groupMemberList()
        } else {
          this.MessageError(response.message)
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
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
