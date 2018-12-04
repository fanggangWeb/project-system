<template>
  <div class="container">
    <div class="header">首页&nbsp;>&nbsp;<a href="#">人员</a>
    </div>
    <div class="details-content">
      <div class="details-menu">
        <ul>
          <li>
            <router-link to="/home/person/" exact>人员</router-link>
          </li>
          <li>
            <router-link to="/home/person/staffSalary">薪资</router-link>
          </li>
          <!-- <li>
            <router-link to="/home/person/timeAdd">工作时间补全</router-link>
          </li> -->
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
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([])
    },
    watch: {
    },
    mounted() {
      vm = this
    },
    methods: {
      ...mapMutations([]),
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
    }
    .details-content {
      padding: 20px 22px 0 23px;
      .details-menu {
        ul li {
          color: #676767;
          display: inline-block;
          min-width: 120px;
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