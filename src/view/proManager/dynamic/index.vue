<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;&gt;</router-link>
      <router-link to="#">动态</router-link>
      <el-button class="btn-publish" type="success" @click="toRelease">发布动态</el-button>
    </div>
    <div class="indexContent">
      <div class="navigation pull-left">
        <div class="time-display">
          <div class="block diplay-none">
            <el-date-picker v-model="timeValue" type="daterange" @change="timeQuery()" value-format="yyyy-MM-dd" range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="navigation-body">
          <div class="dynamic-search">
            <i class="el-icon-search"></i>
            <input type="text" v-model="search.title" placeholder="搜索动态"/>
          </div>
          <div class="line"></div>
          <div class="catalog">
            <ul>
              <li>
                <router-link to="/home/dynamic" exact>公司动态</router-link>
              </li>
              <li>
                <router-link to="/home/dynamic/project">项目动态</router-link>
              </li>
              <li>
                <router-link to="/home/dynamic/staff">人员动态</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-display pull-left">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  let vm
  export default {
    data() {
      return {
        currentSelect: 1,
        // listOrDetail: sessionStorage['listOrDetail'],
        noRead: 0,
        timeValue: '',
        search: {
          trendsType: '',
          size: 10,
          date: '',
          title: '',
          page: 1
        }
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
      toRelease () {
        this.$router.push({path: '/home/release'})
      },
      // 查询未读信息数量
      checkMsg() {
        if (!vm.gettrendsType || vm.gettrendsType === 'COMPANY_DYNAMICS') {
          vm.trendsType('COMPANY_DYNAMICS')
        }
        let params = new Object()
        params.page = vm.search.page
        params.size = vm.search.size
        // params.trendsType = sessionStorage['trendsType']
        params.trendsType = vm.gettrendsType
        vm.axios.post(vm.urlApi.dynamicAll, params).then(data => {
          if (data && data.code === 0) {
            vm.noRead = data.data.noRead
          }
        })
      },
      // 关键字搜索
      subSearch() {
        // console.log('搜索')
        vm.content(vm.search.title)
        vm.date(vm.search.date)
        if ((vm.getcontent !== '' || vm.getdate !== '') && (vm.search.title !== '' || vm.search.date !== '')) {
          // vm.checkMsg();
          vm.$router.push({
            name: 'searchCompany'
          });
        } else {
          //  vm.$router.go(0);
        }
        if (vm.getdate == '' && vm.getcontent == '') {
          if (!vm.gettrendsType || vm.gettrendsType === 'COMPANY_DYNAMICS') {
            vm.$router.push('/dynamicCompany')
          } else if (vm.gettrendsType === 'PROJECT_DYNAMICS') {
            vm.$router.push('/projectCompany')
          } else if (vm.gettrendsType === 'PERSONNEL_DYNAMICS') {
            vm.$router.push('/personnelCompany')
          }
        }
      },
      // 选择时间
      timeQuery () {
        console.log(this.timeValue)
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
      text-align: left;
      .btn-publish {
        float: right;
        margin-top: 20px;
        margin-right: 20px;
      }
    }
    .indexContent {
      width: 100%;
      margin-top: 20px;
      height: calc(100% - 90px);
      overflow: auto;
      .navigation {
        height: 100%;
        width: 25%;
        text-align: center;
        .time-display {
          height: 60px;
          background: #fff;
          text-align: center;
          .block {
            padding: 10px 0 0 20px;
            .el-input__inner {
              border: 0;
              width: 100%;
              outline: none;
              background: #fff;
            }
          }
        }
        .navigation-body {
          margin-top: 10px;
          padding-top: 10px;
          height: calc(100% - 80px);
          background: rgba(255, 255, 255, 1);
          box-shadow: 6px 8px 10px rgba(162, 160, 160, 0.05);
          .dynamic-search {
            border: 1px solid #d7d7d7;
            background: rgba(244, 246, 247, 1);
            height: 46px;
            width: 80%;
            border-radius: 25px;
            margin-left: 10%;
            margin-bottom: 10px;
            i {
              cursor: pointer;
            }
            input {
              height: 44px;
              border: 0;
              font-size: 16px;
              background: rgba(244, 246, 247, 1);
              color: rgba(166, 166, 166, 1);
            }
            input:focus {
              outline: none;
            }
          }
          .line {
            width: 100%;
            height: 1px;
            background: #FAFBFC;
          }
          .catalog {
            font-size: 20px;
            letter-spacing: 1px;
            a {
              color: black;
              display: inline-block;
              height: 46px;
              width: 230px;
              text-align: center;
              line-height: 46px;
              // border: 1px silver solid;
              border-radius: 40px;
              margin-top: 20px;
            }
            .router-link-active {
              color: white;
              background: #45B78D;
              // border: 1px silver solid;
            }
          }
        }
      }
      .content-display {
        float: right;
        height: 100%;
        // margin-left: 1%;
        width: 73%;
      }
    }
  }
  .pull-left{
    float: left;
  }
</style>
