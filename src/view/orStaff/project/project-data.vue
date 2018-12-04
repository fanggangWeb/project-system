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
          <div v-for="(item,index) in demandList" :key="index">
            <label>
              <i><img src="../../../assets/project_details_data/txt.png"></i>
              <!-- <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.fileName"> -->
              <span>{{item.fileName}}</span>
            </label>
            <label class="btns">
              <!-- <a href="#" @click.prevent="changeStatus(item)">修改</a>| -->
              <a :href="item.fullFileAddress">下载</a>
              <!-- <a href="#" @click.prevent="fileDownload(item.fileName, item.fullFileAddress)">下载</a>| -->
              <!-- <a class="del-btn" type="text" @click="_delDemand(item)">删除</a> -->
            </label>
          </div>
          </span>
        <el-upload class="upload-frame" :action="this.uploadApi" :on-success="isDemand" :with-credentials='true' :show-file-list="false">
          <!-- <el-button size="small" type="success" circle icon="el-icon-plus"></el-button> -->
        </el-upload>
      </div>
      <!--流程图-->
      <div class="download-style">
        <label class="project-name">流程图</label>
        <span class="project-name-content">
          <div v-for="(item,index) in flowChart" :key="index">
            <label><i><img src="../../../assets/project_details_data/txt.png"></i>
              <!-- <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.fileName"> -->
              <span>{{item.fileName}}</span>
            </label>
            <label class="btns">
              <!-- <a href="#" @click.prevent="changeStatus(item)">修改</a>| -->
              <a :href="item.fullFileAddress">下载</a>
              <!-- <a href="" @click.prevent="fileDownload(item.fileName, item.fullFileAddress)">下载</a>| -->
              <!-- <a class="del-btn" type="text" @click="_delFlowChart(item)">删除</a> -->
            </label>
          </div>
        </span>
        <el-upload class="upload-frame" :with-credentials='true' :action="this.uploadApi" :on-success="isFlow" :show-file-list="false">
          <!-- <el-button size="small" type="success" circle icon="el-icon-plus"></el-button> -->
        </el-upload>
      </div>
      <!--原型链接-->
      <div class="download-style">
        <label class="project-name">原型链接</label>
        <span class="project-name-content-url">
          <div v-for="(item,index) in protoList" :key="index">
            <label>
              <i><img src="../../../assets/project_details_data/txt.png"></i>
              <span @click="goWeb(item.text)">{{item.text}}</span>
              <!-- <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.fullFileAddress"> -->
            </label>
            <label class="btns">
              <!-- <a href="" @click.prevent="changeStatus(item)">修改</a>| -->
              <!--<a href="" @click.prevent="fileDownload(item.fullFileAddress, item.fileName)">下载</a>|-->
              <!-- <a class="del-btn" type="text" @click="_delProto(item)">删除</a> -->
            </label>
          </div>
          </span>
        <!-- <el-button size="small" type="success" circle icon="el-icon-plus" @click="addprotoLink"></el-button> -->
      </div>
      <!-- 设计图链接 -->
      <div class="download-style">
        <label class="project-name">设计图链接</label>
        <span class="project-name-content-url">
          <div v-for="(item,index) in designLinkList" :key="index">
            <label>
              <i><img src="../../../assets/project_details_data/txt.png"></i>
              <span @click="goWeb(item.text)">{{item.text}}</span>
              <!-- <input type="text" :disabled="item.isDisable" @blur="leaveOut(item)" v-model="item.fullFileAddress"> -->
            </label>
            <label class="btns">
              <!-- <a href="" @click.prevent="changeStatus(item)">修改</a>| -->
              <!--<a href="" @click.prevent="fileDownload(item.fullFileAddress, item.fileName)">下载</a>|-->
              <!-- <a class="del-btn" type="text" @click="_delDesign(item)">删除</a> -->
            </label>
          </div>
        </span>
        <!-- <el-button size="small" type="success" circle icon="el-icon-plus" @click="addDesign"></el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
  let vm
  const SUCCESS_OK = '200'
  import { getProAllFile, addDemand, addFlowChart, addProtoLink, addDesignLink, delDemand, delFlowChart, delDesign, delProto } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        projectName: '', // 项目名称
        demandList: [], // 需求文件
        protoList: [], // 原型图片
        designLinkList: [], //设计图链接
        uiLinkList: [], // ui链接
        flowChart: [], // 流程图
        fileList: [], // 上传文件列表
        dataId: ''
      }
    },
    mounted() {
      vm = this
      this._getProAllFile()
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    methods: {
      ...mapMutations([]),
      // 需求文档上传成功函数
      isDemand(response, file, fileList) {
        if (response.state == SUCCESS_OK) {
          const data = {
            id: this.dataId,
            fileId: response.data[0].id
          }
          addDemand(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        } else {
          this.MessageError('上传失败')
        }
      },
      goWeb(url) {
        window.open(url)
      },
      _delDemand (item) {
        const data = {
          id: this.dataId,
          fileId: item.id
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDemand(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      // 删除流程图
      _delFlowChart (item) {
        const data = {
          id: this.dataId,
          fileId: item.id
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delFlowChart(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      // 删除原型链接
      _delProto (item) {
        const data = {
          id: this.dataId,
          prototypeLinkId: item.id
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delProto(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      // 删除设计链接
      _delDesign (item) {
        const data = {
          id: this.dataId,
          designLinkId: item.id
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDesign(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      // 流程图上传成功函数
      isFlow(response, file, fileList) {
        if (response.state == SUCCESS_OK) {
          const data = {
            id: this.dataId,
            fileId: response.data[0].id
          }
          addFlowChart(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        } else {
          this.MessageError('上传失败')
        }
      },
      // 点击修改改变input可改与否
      changeStatus(item) {
        item.isDisable = false
      },
      // input失去焦点，上传修改的数据
      leaveOut(item) {
        item.isDisable = true
        let arr = []
        arr.push(item)
      },
      // 点击删除 提示是否确认删除
      delFile(fileId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {}).catch(() => {
        })
      },
      // 增加设计图链接
      addDesign() {
        this.$prompt('请输入链接', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then((value) => {
          const data = {
            id: this.dataId,
            text: value.value
          }
          addDesignLink(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {})
      },
      // 增加原型链接
      addprotoLink() {
        this.$prompt('请输入链接', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then((value) => {
          const data = {
            id: this.dataId,
            text: value.value
          }
          addProtoLink(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._getProAllFile()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {})
      },
      // 获取当前资料的所有下载
      _getProAllFile () {
        const data = {
          projectId: this.getprojectId
        }
        getProAllFile(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.projectName = res.data.name
            this.dataId = res.data.id
            this.protoList = res.data.projectPrototypeLinks
            this.designLinkList = res.data.designLinks
            this.demandList = res.data.demandList
            this.flowChart = res.data.processList
          } else {
            this.MessageError(res.message)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
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
          color: #7e8c8d;
        }
        .project-name-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          color: #7e8c8d;
          div {
            width: 364px;
            height: 47px;
            line-height: 47px;
            display: inline-block;
            background-color: rgba(250, 250, 250, 1);
            margin-right: 0.5rem;
            margin-bottom: 5px;
            color: #7e8c8d;
            label {
              margin-left: 5px;
            }
            label:last-child {
              float: right;
              padding-right: 5%;
            }
            span {
              display: inline-block;
              width: 14rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            label:last-child {
              a {
                color: #7e8c8d;
                &:not(:last-child) {
                  margin-right: 0.3rem;
                }
              }
            }
            i {
              display: inline-block;
              vertical-align: top;
              margin-left: 10px;
            }
            input {
              outline: none;
              border: none;
              width: 180px;
              font-size: 16px;
              background: #fafafa;
            }
          }
        }
        .project-name-content-url {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          color: #7e8c8d;
          div {
            min-width: 364px;
            height: 47px;
            line-height: 47px;
            display: inline-block;
            background-color: rgba(250, 250, 250, 1);
            margin-right: 0.5rem;
            margin-bottom: 5px;
            color: #7e8c8d;
            label {
              margin-left: 5px;
            }
            label:last-child {
              float: right;
              padding: 0 20px;
            }
            span {
              display: inline-block;
              cursor: pointer;
            }
            span:hover {
              color: #45B78D !important;
              cursor: pointer;
              text-decoration: underline;
            }
            label:last-child {
              a {
                color: #7e8c8d;
                &:not(:last-child) {
                  margin-right: 0.3rem;
                }
              }
            }
            i {
              display: inline-block;
              vertical-align: top;
              margin-left: 10px;
            }
            input {
              outline: none;
              border: none;
              width: 180px;
              font-size: 16px;
              background: #fafafa;
            }
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
      color: #45B78D !important;
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>
