<template>
  <div class="container">
    <div class="header">首页&nbsp;>&nbsp;<a href="" @click.prevent="jump('/home/superProject', '')">项目</a>&nbsp;&gt;&nbsp;<a href="#">项目详情</a>
    </div>
    <div class="details-content">
      <div class="details-menu">
        <ul>
          <li>
            <router-link to="/home/superProjectDetail/" exact>概况</router-link>
          </li>
          <li>
            <router-link to="/home/superProjectDetail/landmark">里程碑</router-link>
          </li>
          <li>
            <router-link to="/home/superProjectDetail/daytask">日任务</router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: "projectDetails",
    data() {
      return {
        personList: [],
        personId: '',
        isCateShow: false,
        showState: false,
        otherUsers: [],
        userId: '',
        moduleState: false,
        downUrl: '',
        moduleInput: '',
        form: {
          name: ''
        },
        rules: {
          name: [{
            required: true,
            message: '请输入功能模块名称',
            trigger: 'blur'
          }, ],
        }
      }
    },
    computed: {
      ...mapGetters(['getcurrentSelect1', 'getprojectId'])
    },
    watch: {
      // 隐藏后清楚输入框
      moduleState: function(val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    mounted() {
      vm = this
      console.log(this.$route)
    },
    methods: {
      ...mapMutations([]),
      searchByPerson() {
        vm.selectPerson(vm.personId)
      },
      // 切换新增和修改需求
      changeDemand () {
        if (this.demandValue == 'edit') {
          this.demandText = '修改需求'
        } else {
          this.demandText = '新增需求'
        }
      },
      // 需求增加和修改的按钮
      demandBtn () {
        if (this.demandValue == 'edit') {
          // 修改需求
        } else {
          // 新增需求
        }
      },
      createModule() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data = {
              moduleName: vm.form.name,
              projectId: vm.getprojectId
            }
          } else {
            return false;
          }
        })
      },
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      jump(url, id) {
        vm.$router.push(url)
        vm.currentSelect = id
      },
      // 跳转到添加计划
      addPlan() {
        vm.$router.push({
          name: 'planAdd'
        })
      }
    },
    destroyed() {
    }
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
      .addPlan {
        margin-left: auto;
      }
      .addCate {
        margin-right: 36px;
      }
    }
    .details-content {
      padding: 29px 22px 0 23px;
      .details-menu {
        ul li {
          color: #676767;
          display: inline-block;
          width: 110px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          margin-right: 5px;
          font-size: 16px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          // box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          .router-link-active {
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

