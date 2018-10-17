<template>
  <div class="second-container">
    <!--需求内容下载-->
    <div class="demand-download">
      <!--项目名称-->
      <div class="download-style">
        <label class="project-name">项目名称</label>
        <span class="project-name-content">{{projectName}}</span>
      </div>
      <!--需求文档-->
      <div class="download-style">
        <label class="project-name">需求文档</label>
        <span class="project-name-content">
          <div v-for="(item,index) in demandDocumentList" :key="index">
            <label>
              <i><img src="../../../assets/project_details_data/txt.png"></i>
              <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.name">
            </label>
            <label class="btns">
                <a href="#" @click.prevent="changeStatus(item)">修改</a>|
                <a :href="item.path">下载</a>|
                <!-- <a href="#" @click.prevent="fileDownload(item.name, item.path)">下载</a>| -->
                <a class="del-btn" type="text" @click="delFile(item.id)">删除</a>
            </label>
          </div>
        </span>
        <el-upload class="upload-frame" :action="uploadUrl" :headers="header" :before-upload="beforeUpload" :file-list="fileList" :on-success="isDemand" :show-file-list="false">
          <el-button size="small" type="success" circle icon="el-icon-plus"></el-button>
        </el-upload>
      </div>
      <!--流程图-->
      <div class="download-style">
        <label class="project-name">流程图</label>
        <span class="project-name-content">
          <div v-for="(item,index) in flowChart" :key="index">
            <label><i><img src="../../../assets/project_details_data/txt.png"></i>
              <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.name">
            </label>
            <label class="btns">
                <a href="#" @click.prevent="changeStatus(item)">修改</a>|
                <a :href="item.path">下载</a>|
                <!-- <a href="" @click.prevent="fileDownload(item.name, item.path)">下载</a>| -->
                <a class="del-btn" type="text" @click="delFile(item.id)">删除</a>
            </label>
          </div>
        </span>
        <el-upload class="upload-frame" :action="uploadUrl" :headers="header" :before-upload="beforeUpload" :file-list="fileList" :on-success="isFlow" :show-file-list="false">
          <el-button size="small" type="success" circle icon="el-icon-plus"></el-button>
        </el-upload>
      </div>
      <!--原型链接-->
      <div class="download-style">
        <label class="project-name">原型链接</label>
        <span class="project-name-content">
          <div v-for="(item,index) in prototypeLinkList" :key="index">
            <label>
              <!--<i><img src="../../assets/project_details_data/txt.png"></i>-->
              <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.path">
            </label>
            <label class="btns">
                <a href="" @click.prevent="changeStatus(item)">修改</a>|
                <!--<a href="" @click.prevent="fileDownload(item.path, item.name)">下载</a>|-->
                <a class="del-btn" type="text" @click="delFile(item.id)">删除</a>
            </label>
          </div>
        </span>
        <el-button size="small" type="success" circle icon="el-icon-plus" @click="addprototypeLink"></el-button>
      </div>
      <!-- 设计图链接 -->
      <div class="download-style">
        <label class="project-name">设计图链接</label>
        <span class="project-name-content">
          <div v-for="(item,index) in designLinkList" :key="index">
            <label>
              <!--<i><img src="../../assets/project_details_data/txt.png"></i>-->
              <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.path">
            </label>
            <label class="btns">
                <a href="" @click.prevent="changeStatus(item)">修改</a>|
                <!--<a href="" @click.prevent="fileDownload(item.path, item.name)">下载</a>|-->
                <a class="del-btn" type="text" @click="delFile(item.id)">删除</a>
            </label>
          </div>
        </span>
        <el-button size="small" type="success" circle icon="el-icon-plus" @click="addDesignLink"></el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../../utils/common'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  let vm
  export default {
    filters: {
      translate: function(key, map) {
        return map[key]
      }
    },
    data() {
      return {
        status: {
          CONDUCTING: '进行中',
          FINISH: '已完成',
          NOT_FINISH: '未完成',
          STOPPING: '暂停',
          AUDITING: '审核中'
        },
        type: {
          INSERT_TYPE: '新增',
          UPDATE_TYPE: '变更'
        },
        uploadUrl: this.api + 'Common/fileUpload', // 上传文档地址
        // projectId: sessionStorage['projectId'], // 项目id
        projectName: '', // 项目名称
        contractDocumentsList: [], // 合同文件
        demandDocumentList: [], // 需求文件
        prototypeLinkList: [], // 原型图片
        designLinkList: [], //设计图链接
        uiLinkList: [], // ui链接
        flowChart: [], // 流程图
        projectsDemandList: {}, // 需求列表部分
        fileList: [], // 上传文件列表
        projectFile: {}, //  单个文件
        projectsFiles: [], // 新增的需求文件列表
        header: {}
      }
    },
    mounted() {
      vm = this
      // vm.getAllProjectsDemand()
      // vm.changeHeader()
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    methods: {
      ...mapMutations(['addOrUpdate', 'demandId']),
      // 修改请求头
      changeHeader() {
        let authorization = JSON.parse(sessionStorage['loginInfo']).token
        vm.header.authorization = authorization
      },
      // 获取某个项目全部信息
      getAllProjectsDemand() {
        let params = {
          projectsId: vm.getprojectId
        }
        vm.axios.post(vm.urlApi.getAllProjectsDemand, params).then(data => {
          if (data && data.code === 0) {
            // 获取文件列表部分
            vm.projectName = data.data.projectsName
            for (var p of data.data.projectsFileList) {
              p.isDisable = true
              switch (p.datumType) {
                case 'CONTRACT_DOCUMENT':
                  vm.contractDocumentsList.push(p)
                  break
                case 'DEMAND_DOCUMENT':
                  vm.demandDocumentList.push(p)
                  break
                case 'PROTOTYPE_LINK':
                  vm.prototypeLinkList.push(p)
                  break
                case 'UI_LINK':
                  vm.uiLinkList.push(p)
                  break
                case 'FLOW_CHART':
                  vm.flowChart.push(p)
                  break
              }
            }
            // 获取需求列表部分
            vm.projectsDemandList = data.data.projectsDemandList
          }
        })
      },
      // 上传前的钩子
      beforeUpload() {
        return this.$confirm(`确定上传所选择的文件吗？`)
      },
      // 重置文档数组
      init() {
        vm.contractDocumentsList.length = 0 // 合同文件
        vm.demandDocumentList.length = 0 // 需求文件
        vm.prototypeLinkList.length = 0 // 原型图片
        vm.uiLinkList.length = 0 // ui链接
        vm.flowChart.length = 0 // 流程图
      },
      // 跳转到新增页面
      jumpToAdd(url, addOrUpdate) {
        vm.addOrUpdate(addOrUpdate)
        vm.$router.push(url)
      },
      //跳转到详情页面
      jumpToDetail(url, demandId, addOrUpdate) {
        vm.addOrUpdate(addOrUpdate)
        vm.demandId(demandId)
        vm.$router.push(url)
      },
      // 上传需求文档
      isDemand(response, file, fileList) {
        let projectFile = new Object()
        projectFile.datumType = 'DEMAND_DOCUMENT'
        projectFile.name = response.data.name
        projectFile.path = response.data.path
        projectFile.size = response.data.size
        projectFile.projectId = vm.getprojectId
        vm.projectsFiles.push(projectFile)
        vm.addProjectsFile()
      },
      isFlow(response, file, fileList) {
        let projectFile = new Object()
        projectFile.datumType = 'FLOW_CHART'
        projectFile.name = response.data.name
        projectFile.path = response.data.path
        projectFile.size = response.data.size
        projectFile.projectId = vm.getprojectId
        vm.projectsFiles.push(projectFile)
        vm.addProjectsFile()
      },
      // 增加或修改文件到服务器
      addProjectsFile: function() {
        let params = vm.projectsFiles
        vm.axios.post(vm.urlApi.addProjectsFile, params).then(data => {
          if (data && data.code === 0) {}
        }).then(() => {
          vm.init()
          vm.getAllProjectsDemand()
        }).then(() => {
          params.length = 0
        })
      },
      // 点击修改改变input可改与否
      changeStatus(item) {
        item.isDisable = false
      },
      // input失去焦点，上传修改的数据
      leaveOut(item) {
        item.isDisable = true
        let arr = new Array()
        arr.push(item)
        vm.axios.post(vm.urlApi.addProjectsFile, arr).then(data => {
          if (data.code === 0) {}
        })
      },
      // 下载文件
      fileDownload(name, url) {
        let urlList = url.split('.');
        let names = name + '.' + urlList[urlList.length - 1];
        let img = ['jpg', 'JPG', 'png', 'PNG', 'gif', 'GIF'];
        let isImg = false;
        for (let i = 0; i < img.length; i++) {
          if (names == img[i]) {
            isImg = true;
            break;
          }
        }
        if (isImg) {
          let a = document.createElement('a')
          let event = new MouseEvent('click')
          a.download = name || '下载图片名称'
          a.href = url
          return
          a.dispatchEvent(event)
        } else {
          let data = new Object()
          data.downloadPath = url
          vm.axios.post(vm.urlApi.fileDownload, data).then((data) => {
            common.download(data, names);
          })
        }
      },
      // 删除需求
      deleteProjectsDemand(id) {
        vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            projectsDemandId: id
          }
          vm.axios.post(vm.urlApi.deleteProjectsDemand, params).then(data => {
            if (data && data.code === 0) {
              //              vm.$router.go(0)
              vm.getAllProjectsDemand();
            }
          })
        })
      },
      // 点击删除 提示是否确认删除
      delFile(fileId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            fileId: fileId
          }
          vm.axios.post(vm.urlApi.deleteProjectsFileById, params).then(data => {
            if (data && data.code === 0) {
              vm.init()
              vm.getAllProjectsDemand()
            }
          })
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 增加设计图链接
      addDesignLink() {
        vm.projectsFiles.length = 0
        this.$prompt('请输入链接', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          let pro = new Object()
          let arr = new Array()
          pro.datumType = 'PROTOTYPE_LINK'
          pro.path = value
          pro.projectId = vm.getprojectId
          arr.push(pro)
          vm.axios.post(vm.urlApi.addProjectsFile, arr).then(data => {
            if (data && data.code === 0) {
              vm.init()
              vm.getAllProjectsDemand()
            }
          })
        }).catch(() => {})
      },
      // 增加原型链接
      addprototypeLink() {
        vm.projectsFiles.length = 0
        this.$prompt('请输入链接', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          let arr = []
          const pro = {
            datumType: 'PROTOTYPE_LINK',
            path: value,
            projectId: vm.getprojectId
          }
          arr.push(pro)
          vm.axios.post(vm.urlApi.addProjectsFile, arr).then(data => {
            if (data && data.code === 0) {
              vm.init()
              vm.getAllProjectsDemand()
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  a {
    color: #333;
  }
  .second-container {
    width: 100%;
    .demand-download {
      padding: 30px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
      .download-style {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f8f8f8;
        padding: 20px;
        .project-name {
          display: inline-block;
          width: 150px;
          text-align: center;
          font-size: 16px;
          color: #4D4D4D;
        }
        .project-name-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          font-size: 14px;
          color: rgba(132, 132, 132, 1);
          div {
            width: 364px;
            height: 47px;
            line-height: 47px;
            display: inline-block;
            background-color: rgba(250, 250, 250, 1);
            margin-right: 0.5rem;
            margin-bottom: 5px;
            label {
              margin-left: 5px;
            }
            label:last-child {
              float: right;
              padding-right: 5%;
            }
            span {
              display: inline-block;
              width: 10rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            label:last-child {
              a {
                &:not(:last-child) {
                  margin-right: 0.3rem;
                }
              }
            }
            i {
              display: inline-block;
              vertical-align: top;
            }
            input {
              outline: none;
              border: none;
              width: 180px;
              font-size: 16px;
              background: #fafafa;
            } // .del-btn {
            //   color: #333333;
            // }
          }
        }
        .upload-frame {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
      .download-style:last-child {
        border-bottom: 0 solid rgba(220, 220, 220, 1);
      }
    }
    .btns a:hover {
      color: #45B78D;
      text-decoration: underline;
    }
  }
</style>
