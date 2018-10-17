<template>
  <!-- 详情-统计 -->
  <div class="second-container">
    <!-- 1数量 -->
    <div class="numbers">
      <!-- 1.1进度 -->
      <ul class="numbers-speed">
        <li class="now line">
          <p>{{status.now}}</p>
          <span>目前成本</span>
        </li>
        <li class="pending line">
          <p>{{status.expected}}</p>
          <span>预计时间</span>
        </li>
        <li class="delay">
          <p>{{status.delay}}</p>
          <span>延迟时间</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapGetters,mapMutations  } from 'vuex'
  let vm;
  export default {
    name: "projectStatistics",
    data() {
      return {
        project: {},
        status: {
          now: '200064.60元',
          expected: '2018-9-31',
          delay: '2018-10-31'
        },
        userList: [],
        demandList: [],
        currentTime: new Date(),
        currentdate: ''
      }
    },
    filters: {
      translate: function (key, map) {
        return map[key]
      },
      nullToZero: function (key) {
        if (!key) {
          return 0;
        }
      }
    },
    mounted() {
      vm = this;
      this.getNowFormatDate()
      let date = new Date();
      vm.currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
   computed: {
      ...mapGetters(['getprojectId'])
    },
    methods: {
      ...mapMutations(['demandId','addOrUpdate']),
      // 获取项目统计数据
      getProjectsStatistics() {
        let req = new Object();
        req.projectsId = vm.getprojectId;
        vm.axios.post(vm.urlApi.getProjectsStatistics, req).then(res => {
          if (res.code == 0) {
            console.log(res)
            vm.project = res.data.project;
            vm.status = res.data.status;
            vm.demandList = res.data.project.others.demandList;
            vm.userList = res.data.project.others.projectsUsers
          }
        })
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        // return currentdate;
        this.currentdate = currentdate
      },
      // 跳转到需求详情
      jump(url, demandId, addOrUpdate) {
        if (demandId !== '') {
          vm.demandId(demandId)
        }
       vm.addOrUpdate(addOrUpdate)
        vm.$router.push(url)
      },
      // 删除需求变更
      deleteDemand(item) {
        let req = new Object();
        req.projectsDemandId = item.id;
        console.log(req)
        vm.$confirm('确认删除此需求', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => vm.axios.post(vm.urlApi.deleteProjectsDemand, req)
        ).then(res => {
          if (res.code == 0) {
            vm.demandList.pop(item);
            vm.$message.success('删除成功')
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .second-container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow-x: hidden;
    background-color: #FAFBFC;
    /*数量*/
    .numbers {
      width: 100%;
      height: 280px;
      background-color: #fff;
      box-sizing: border-box;
      .numbers-speed {
        display: flex;
        flex-wrap: nowrap;
        height: 240px;
        li {
          text-align: center;
          flex: 1;
          img {
            vertical-align: middle;
          }
          p {
            font-size: 26px;
            margin-top: 80px;
            color: #676767;
          }
          span {
            display: inline-block;
            font-size: 16px;
            color: #ABABAB;
            box-sizing: border-box;
            padding-left: 14px;
            margin-top: 80px;
            background: url("../../../assets/project-statistics-slices/projectNumber.png") no-repeat 0 2px;
          }
        }
        .pending {
          span {
            background: url("../../../assets/project-statistics-slices/haveInHand.png") no-repeat 0 2px;
          }
        }
        .delay {
          span {
            background: url("../../../assets/project-statistics-slices/deadline.png") no-repeat 0 2px;
          }
        }
        .line:after {
          content: '';
          position: relative;
          left: 180px;
          display: inline-block;
          height: 80px;
          width: 2px;
          background-color: #F8F8F8;
        }
      }
    }
  }
</style>
